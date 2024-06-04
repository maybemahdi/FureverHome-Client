import { useQuery } from "@tanstack/react-query";
import { Link, ScrollRestoration, useParams } from "react-router-dom";
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
import { useEffect, useState } from "react";
import PaymentModal from "../Components/DonationCampaigns/PaymentModal";
import useCampaigns from "../Hooks/useCampaigns";

const DonationDetails = () => {
  const { id } = useParams();
  let [isOpen, setIsOpen] = useState(false);
  const [indexOne, setIndexOne] = useState(null);
  const [indexTwo, setIndexTwo] = useState(null);
  const { donationCampaigns, isLoading: campLoading, refetch } = useCampaigns();
  const axiosCommon = useAxiosCommon();
  const { data: selectedCampaign, isLoading } = useQuery({
    queryKey: ["singlePet", id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/donationCampaign/${id}`);
      return data;
    },
  });

  function close() {
    setIsOpen(false);
  }
  // console.log(donationCampaigns)

  useEffect(() => {
    if (donationCampaigns?.length >= 3) {
      const length = donationCampaigns.length;
      const index1 = Math.floor(Math.random() * (length - 2));
      const index2 = index1 + 2;

      setIndexOne(index1);
      setIndexTwo(index2);
    }
  }, [donationCampaigns, id]);

  if (isLoading || campLoading) return <LoadingSpinner />;
  return (
    <div className="my-10">
      <ScrollRestoration />
      <SectionStart
        heading={`All About ${selectedCampaign?.petName} Campaign`}
      />
      <Card className="mt-5 grid grid-cols-1 lg:grid-cols-2 lg:w-[70%] mx-auto">
        <CardHeader
          color="blue-gray"
          className="relative m-0 rounded-b-none lg:rounded-l-lg lg:rounded-r-none"
        >
          <img
            className="w-full"
            src={selectedCampaign?.petImage}
            alt="pet-image"
          />
        </CardHeader>
        <CardBody className="justify-center flex flex-col">
          <div className="mb-2 flex flex-col gap-2">
            <Typography
              color="blue-gray"
              className="font-medium text-2xl font-main"
            >
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
              <span className="font-bold">
                {selectedCampaign?.shortDescription}
              </span>
            </Typography>
            <Typography color="blue-gray" className="font-medium font-main">
              Long-Description:{" "}
              <span className="font-bold">
                {selectedCampaign?.longDescription}
              </span>
            </Typography>
          </div>
          <Button
          disabled={selectedCampaign?.status === "paused"}
            onClick={() => {
              setIsOpen(true);
            }}
            className="bg-[#FF407D] mt-4 disabled:cursor-not-allowed"
          >
            {selectedCampaign?.status === "paused" ? "Paused" : "Donate Now"}
          </Button>
        </CardBody>
      </Card>
      <PaymentModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        close={close}
        campaign={selectedCampaign}
        refetch={refetch}
      />
      <div className="mt-16">
        <SectionStart heading={`Recommended Campaigns!`} />
        <div className="grid grid-cols-1 md:grid-cols-3 my-10 gap-5">
          {donationCampaigns?.length >= 3
            ? donationCampaigns
                ?.slice(indexOne, indexTwo + 1)
                .map((campaign) => (
                  <Card key={campaign?._id}>
                    <CardHeader shadow={false} floated={false} className="h-96">
                      <img
                        src={campaign?.petImage}
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody>
                      <div className="mb-2 flex flex-col">
                        <Typography
                          color="blue-gray"
                          className="font-medium font-main"
                        >
                          Name:{" "}
                          <span className="font-bold">{campaign?.petName}</span>
                        </Typography>
                        <Typography
                          color="blue-gray"
                          className="font-medium font-main"
                        >
                          Maximum Donation Amount:{" "}
                          <span className="font-bold">
                            {campaign?.maxDonationAmount}
                          </span>
                          $
                        </Typography>
                        <Typography
                          color="blue-gray"
                          className="font-medium font-main"
                        >
                          Total Donated:{" "}
                          <span className="font-bold">
                            {campaign?.donatedAmount}
                          </span>
                          $
                        </Typography>
                      </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                      <Link to={`/donationCampaign/${campaign?._id}`}>
                        <Button
                          ripple={false}
                          fullWidth={true}
                          className="bg-blue-gray-900/10 hover:bg-[#FF407D] hover:text-white text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                        >
                          View Details
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))
            : donationCampaigns?.map((campaign) => (
                <Card key={campaign?._id}>
                  <CardHeader shadow={false} floated={false} className="h-96">
                    <img
                      src={campaign?.petImage}
                      className="h-full w-full object-cover"
                    />
                  </CardHeader>
                  <CardBody>
                    <div className="mb-2 flex flex-col">
                      <Typography
                        color="blue-gray"
                        className="font-medium font-main"
                      >
                        Name:{" "}
                        <span className="font-bold">{campaign?.petName}</span>
                      </Typography>
                      <Typography
                        color="blue-gray"
                        className="font-medium font-main"
                      >
                        Maximum Donation Amount:{" "}
                        <span className="font-bold">
                          {campaign?.maxDonationAmount}
                        </span>
                        $
                      </Typography>
                      <Typography
                        color="blue-gray"
                        className="font-medium font-main"
                      >
                        Total Donated:{" "}
                        <span className="font-bold">
                          {campaign?.donatedAmount}
                        </span>
                        $
                      </Typography>
                    </div>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Link to={`/donationCampaign/${campaign?._id}`}>
                      <Button
                        ripple={false}
                        fullWidth={true}
                        className="bg-blue-gray-900/10 hover:bg-[#FF407D] hover:text-white text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                      >
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;
