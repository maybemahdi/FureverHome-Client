import { useQuery } from "@tanstack/react-query";
import SectionStart from "../Components/Shared/SectionStart";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import LoadingSpinner from "../Components/LoadingSpinner";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const PetListings = () => {
  const axiosCommon = useAxiosCommon();
  const { data: pets = [], isLoading } = useQuery({
    queryKey: ["allPets"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/pets");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="my-20">
      <SectionStart
        heading={`Explore Our Wonderful Pets`}
        subHeading={`Browse through our selection below to meet each unique personality and learn more about their stories. From adorable puppies and kittens to majestic birds and gentle rabbits, there's a furry, feathery, or scaly friend just waiting to bring joy into your life.`}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 my-10 gap-5">
        {pets?.map((pet) => (
            <Card key={pet?._id}>
              <CardHeader shadow={false} floated={false} className="h-96">
                <img
                  src={pet?.petImage}
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody>
                <div className="mb-2 flex flex-col">
                  <Typography
                    color="blue-gray"
                    className="font-medium font-main"
                  >
                    Name: <span className="font-bold">{pet?.petName}</span>
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="font-medium font-main"
                  >
                    Age: <span className="font-bold">{pet?.petAge}</span>/years
                    old
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="font-medium font-main"
                  >
                    Location:{" "}
                    <span className="font-bold">{pet?.petLocation}</span>
                  </Typography>
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <Link to={`/pet/${pet?._id}`}>
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
  );
};

export default PetListings;
