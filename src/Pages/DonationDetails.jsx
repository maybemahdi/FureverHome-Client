import { useQuery } from "@tanstack/react-query";
import { ScrollRestoration, useParams } from "react-router-dom";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import LoadingSpinner from "../Components/LoadingSpinner";
import SectionStart from "../Components/Shared/SectionStart";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import PaymentModal from "../Components/DonationCampaigns/PaymentModal";

const DonationDetails = () => {
  const { id } = useParams();
  let [isOpen, setIsOpen] = useState(false);
  const axiosCommon = useAxiosCommon();
  const { data: selectedCampaign, isLoading } = useQuery({
    queryKey: ["singlePet"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/donationCampaign/${id}`);
      return data;
    },
  });

  function close() {
    setIsOpen(false);
  }
  if (isLoading) return <LoadingSpinner />;
  //   console.log(selectedCampaign)
  return (
    <div className="my-10">
      <ScrollRestoration />
      <SectionStart
        heading={`All About ${selectedCampaign?.petName} Campaign`}
      />
      <Card className="mt-5 grid grid-cols-1 lg:grid-cols-2 lg:w-[70%] mx-auto">
        <CardHeader color="blue-gray" className="relative m-0 rounded-b-none lg:rounded-l-lg lg:rounded-r-none">
          <img
            className="w-full"
            src={selectedCampaign?.petImage}
            alt="pet-image"
          />
        </CardHeader>
        <CardBody className="justify-center flex flex-col">
          <div className="mb-2 flex flex-col gap-2">
            <Typography color="blue-gray" className="font-medium text-2xl font-main">
              Name:{" "}
              <span className="font-bold">{selectedCampaign?.petName}</span>
            </Typography>
            <Typography color="blue-gray" className="font-medium font-main">
              Max Donation Amount:{" "}
              <span className="font-bold">
                {selectedCampaign?.maxDonationAmount}
              </span>
              $
            </Typography>
            <Typography color="blue-gray" className="font-medium font-main">
              Total Donated:{" "}
              <span className="font-bold">
                {selectedCampaign?.donatedAmount}
              </span>
              $
            </Typography>
            <Typography color="blue-gray" className="font-medium font-main">
              Last Date of Donation:{" "}
              <span className="font-bold">
                {selectedCampaign?.lastDateOfDonation}
              </span>
            </Typography>
            <Typography color="blue-gray" className="font-medium font-main">
              Creator Email:{" "}
              <span className="font-bold">{selectedCampaign?.creator}</span>
            </Typography>
            <Typography color="blue-gray" className="font-medium font-main">
                Short-Description:{" "}
              <span className="font-bold">{selectedCampaign?.shortDescription}</span>
            </Typography>
            <Typography color="blue-gray" className="font-medium font-main">
                Long-Description:{" "}
              <span className="font-bold">{selectedCampaign?.longDescription}</span>
            </Typography>
          </div>
          <Button
            onClick={() => {
              setIsOpen(true);
            }}
            className="bg-[#FF407D] mt-4"
          >
            Donate Now
          </Button>
        </CardBody>
      </Card>
      <PaymentModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        close={close}
        campaign={selectedCampaign}
      />
    </div>
  );
};

export default DonationDetails;
