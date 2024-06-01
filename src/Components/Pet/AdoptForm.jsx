/* eslint-disable react/prop-types */
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import useAuth from "../../Hooks/useAuth";
const AdoptForm = ({ pet }) => {
  const { user } = useAuth();
  return (
    <form>
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
          placeholder="Your Address"
          name="address"
          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>
    </form>
  );
};

export default AdoptForm;
