/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import "./CheckoutForm.css";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const CheckoutForm = ({ campaign, close, amount, setAmount, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [cardError, setCardError] = useState(null);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (amount && amount > 1) {
      getPaymentIntent({ amount: amount });
    }
  }, [amount]);

  const getPaymentIntent = async (amount) => {
    const { data } = await axiosSecure.post(`/create-payment-intent`, amount);
    // console.log(`client secret from server => ${data}`);
    setClientSecret(data?.clientSecret);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }

    // confirm payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setAmount("");
      console.log(paymentIntent);
      // 1. Create payment info object
      const donateInfo = {
        ...campaign,
        donateId: campaign._id,
        donarName: user?.displayName,
        donarEmail: user?.email,
        donatedAmount: parseFloat(amount),
        transactionId: paymentIntent.id,
        date: new Date(),
      };
      delete donateInfo._id;
      console.log(donateInfo);
      try {
        // 2. save donate info in donate collection (db)
        const { data } = await axiosSecure.post("/donate", donateInfo);
        console.log(data);

        // 3. change total donated in campaign db
        await axiosSecure.patch(
          `/updateTotalDonation/${donateInfo?.donateId}`,
          {
            donatedAmount: campaign?.donatedAmount + parseFloat(amount),
          }
        );

        // update ui
        refetch();
        close();
        toast.success("Donated Successfully");
        navigate("/donationCampaigns");
      } catch (err) {
        console.log(err);
      }
    }
    setProcessing(false);
  };

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <div className="flex mt-2 justify-around">
          <button
            disabled={!stripe || !clientSecret || processing}
            type="submit"
            className="inline-flex cursor-pointer justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            {processing ? (
              <ImSpinner9 className="animate-spin m-auto" size={24} />
            ) : (
              `Donate $${amount}`
            )}
          </button>
          <button
            onClick={() => {
              close();
              setAmount("");
            }}
            type="button"
            className="inline-flex cursor-pointer justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
    </>
  );
};

export default CheckoutForm;
