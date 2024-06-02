/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

const PaymentModal = ({ isOpen, setIsOpen, close, campaign, refetch }) => {
  const [amount, setAmount] = useState("");
//   console.log(amount);
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
        >
          <div className="fixed inset-0 z-10 w-screen bg-[#3333323e] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-white text-black p-6 backdrop-blur-2xl">
                  <DialogTitle as="h3" className="text-2xl font-medium">
                    Donate Now for {campaign?.petName}!
                  </DialogTitle>
                  <div className="mt-4">
                    <input
                      type="number"
                      required
                      value={amount}
                      placeholder={`Amount (max-${campaign?.maxDonationAmount})`}
                      onChange={(e) => {
                        if (e.target.value <= campaign?.maxDonationAmount) {
                          setAmount(e.target.value);
                        } else {
                          toast.error("Set Amount less or Equal to Max Amount");
                          setAmount("")
                        }
                      }}
                      max={campaign?.maxDonationAmount}
                      className="w-full p-[10px] focus:shadow-md focus:outline-none focus:ring-0 mb-2 border rounded shadow"
                    />
                    {/* stripe  */}
                    <Elements stripe={stripePromise}>
                      {/* checkout form */}
                      <CheckoutForm
                      refetch={refetch}
                        campaign={campaign}
                        amount={amount}
                        setAmount={setAmount}
                        close={close}
                      />
                    </Elements>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PaymentModal;
