import SectionStart from "../Components/Shared/SectionStart";
import LoadingSpinner from "../Components/LoadingSpinner";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import useCampaigns from "../Hooks/useCampaigns";
import { ImSpinner9 } from "react-icons/im";
import { useFooterVisibility } from "../FooterVisibilityContext/FooterVisibilityContext";
import { useEffect } from "react";

const DonationCampaigns = () => {
  const { donationCampaigns, isLoading, allDataLoaded } =
    useCampaigns();
  const { setFooterVisible } = useFooterVisibility();

  useEffect(() => {
    if(!allDataLoaded){
      setFooterVisible(false);
    return () => setFooterVisible(true);
    }
  }, [setFooterVisible, allDataLoaded]);
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="my-10">
      {/* <ScrollRestoration /> */}
      <SectionStart
        heading={`All Campaigns Available Here!`}
        subHeading={`Join Campaigns to help and save Animals!`}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 my-10 gap-5">
        {donationCampaigns?.map((campaign) => (
          <Card key={campaign?._id}>
            <CardHeader shadow={false} floated={false} className="h-96">
              <img
                src={campaign?.petImage}
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <div className="mb-2 flex flex-col">
                <Typography color="blue-gray" className="font-medium font-main">
                  Name: <span className="font-bold">{campaign?.petName}</span>
                </Typography>
                <Typography color="blue-gray" className="font-medium font-main">
                  Maximum Donation Amount:{" "}
                  <span className="font-bold">
                    {campaign?.maxDonationAmount}
                  </span>
                  $
                </Typography>
                <Typography color="blue-gray" className="font-medium font-main">
                  Total Donated:{" "}
                  <span className="font-bold">{campaign?.donatedAmount}</span>$
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
      <div className="flex justify-center my-10">
        {!allDataLoaded && (
          <ImSpinner9 size={30} color="#FF407D" className="animate-spin" />
        )}
      </div>
    </div>
  );
};

export default DonationCampaigns;
