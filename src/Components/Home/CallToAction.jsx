import { Link } from "react-router-dom";
import SectionStart from "../Shared/SectionStart";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";

const CallToAction = () => {
  return (
    <div className="">
      <SectionStart
        heading={`Change a Life Today: Adopt a Pet`}
        subHeading={`Encourages immediate action and emphasizes the impact of adopting a pet`}
      />
      <div className="my-10">
        <Card
          shadow={false}
          className="relative grid h-[40rem] w-full items-end justify-center overflow-hidden text-center"
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://i.ibb.co/gvvRkhs/photo-1494947665470-20322015e3a8.jpg')] bg-cover bg-center"
          >
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
          </CardHeader>
          <CardBody className="relative py-14 px-6 md:px-12">
            <h3
              color="white"
              className="mb-4 text-2xl md:text-4xl text-white w-full md:w-3/4 mx-auto text-center font-medium leading-[1.5]"
            >
              Focuses on the positive impact a pet can have on the adopter’s
              life.
            </h3>
            <p className="w-full md:w-[60%] text-gray-300 font-normal mx-auto text-center mb-8">
              Adopting a pet transforms both your life and theirs. You'll
              experience the deep satisfaction that comes from providing a
              loving home to an animal in need. Every day with your new pet will
              be filled with moments of joy, laughter, and affection.
            </p>
            <Link
              to={"/adoptPet"}
              className="px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform border border-[#FF407D] bg-[#ffffff00] hover:bg-[#FF407D] rounded-md lg:w-auto focus:outline-none focus:bg-gray-500"
            >
              Adopt Now
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default CallToAction;
