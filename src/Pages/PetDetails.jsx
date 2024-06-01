import { ScrollRestoration, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import LoadingSpinner from "../Components/LoadingSpinner";
import SectionStart from "../Components/Shared/SectionStart";
import { useState } from "react";
import DetailsModal from "../Components/Pet/DetailsModal";
const PetDetails = () => {
  let [isOpen, setIsOpen] = useState(false);
  const axiosCommon = useAxiosCommon();
  const { id } = useParams();
  const { data: selectedPet, isLoading } = useQuery({
    queryKey: ["singlePet"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/pet/${id}`);
      return data;
    },
  });

  function close() {
    setIsOpen(false);
  }

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="my-12">
      <ScrollRestoration />
      <SectionStart heading={`All About ${selectedPet?.petName}`} />
      <Card className="mt-10 w-[60%] mx-auto">
        <CardHeader color="blue-gray" className="relative">
          <img className="w-full" src={selectedPet?.petImage} alt="pet-image" />
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex flex-col">
            <Typography color="blue-gray" className="font-medium font-main">
              Name: <span className="font-bold">{selectedPet?.petName}</span>
            </Typography>
            <Typography color="blue-gray" className="font-medium font-main">
              Age: <span className="font-bold">{selectedPet?.petAge}</span>
              /years old
            </Typography>
            <Typography color="blue-gray" className="font-medium font-main">
              Location:{" "}
              <span className="font-bold">{selectedPet?.petLocation}</span>
            </Typography>
            <Typography color="blue-gray" className="font-medium font-main">
              Category:{" "}
              <span className="font-bold">{selectedPet?.petCategory}</span>
            </Typography>
            <Typography color="blue-gray" className="font-medium font-main">
              Provider Email:{" "}
              <span className="font-bold">{selectedPet?.provider}</span>
            </Typography>
            <Typography color="blue-gray" className="font-medium font-main">
              <span className="">{selectedPet?.shortDescription}</span>
            </Typography>
            <Typography color="blue-gray" className="font-medium font-main">
              <span className="">{selectedPet?.longDescription}</span>
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            onClick={() => {
              setIsOpen(true);
            }}
            className="bg-[#FF407D]"
          >
            Adopt {selectedPet?.petName}
          </Button>
        </CardFooter>
      </Card>
      <DetailsModal setIsOpen={setIsOpen} isOpen={isOpen} close={close} pet={selectedPet} />
    </div>
  );
};

export default PetDetails;


