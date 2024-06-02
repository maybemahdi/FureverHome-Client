/* eslint-disable react/prop-types */
import { Input, Button, Typography } from "@material-tailwind/react";
import useAuth from "../../Hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
const AdoptForm = ({ pet, setIsOpen }) => {
  const axiosCommon = useAxiosCommon();
  const { user } = useAuth();
  const { mutateAsync } = useMutation({
    mutationFn: async (info) => {
      const { data } = await axiosCommon.post("/adoptionRequests", info);
      if (data?.message) {
        toast.success(data.message);
        setIsOpen(false);
      }
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Your Request Has Been Sent!",
        icon: "success",
      });
      setIsOpen(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const handleAdopt = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const info = {
      ...pet,
      petID: pet?._id,
      name,
      email,
      phone,
      address,
    };
    delete info._id;
    // console.log(info);
    await mutateAsync(info);
  };
  return (
    <form onSubmit={handleAdopt}>
      <div className="mb-1 flex flex-col mt-4 gap-4">
        <Typography variant="h6" color="blue-gray" className="-mb-4">
          User Name
        </Typography>
        <Input
          size="lg"
          value={user?.displayName}
          disabled
          type="text"
          name="name"
          placeholder="Your Name"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <Typography variant="h6" color="blue-gray" className="-mb-4">
          Your Email
        </Typography>
        <Input
          size="lg"
          value={user?.email}
          name="email"
          type="email"
          disabled
          placeholder="name@mail.com"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <Typography variant="h6" color="blue-gray" className="-mb-4">
          Your Phone
        </Typography>
        <Input
          size="lg"
          type="number"
          placeholder="Your Phone Number"
          name="phone"
          required
          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <Typography variant="h6" color="blue-gray" className="-mb-4">
          Your Address
        </Typography>
        <Input
          size="lg"
          type="text"
          required
          placeholder="Your Address"
          name="address"
          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <Button
          //   onClick={() => {
          //     setIsOpen(false);
          //   }}
          type="submit"
          className="bg-[#FF407D]"
        >
          {`Adopt => ${pet?.petName}`}
        </Button>
      </div>
    </form>
  );
};

export default AdoptForm;
