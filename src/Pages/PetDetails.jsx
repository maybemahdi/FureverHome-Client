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
import SectionStart from "../Components/Shared/SectionStart";
import { useState } from "react";
import DetailsModal from "../Components/Pet/DetailsModal";
import LoadingSkeleton from "../Components/LoadingSkeleton";
import { htmlToText } from "html-to-text";
import { Helmet } from "react-helmet-async";
const PetDetails = () => {
  let [isOpen, setIsOpen] = useState(false);
  const axiosCommon = useAxiosCommon();
  const { id } = useParams();
  const { data: selectedPet, isLoading } = useQuery({
    queryKey: ["singlePet", id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/pet/${id}`);
      return data;
    },
  });

  function close() {
    setIsOpen(false);
  }

  if (isLoading) return <LoadingSkeleton type={"card"} />;
  return (
    <div className="my-10">
      <Helmet>
        <title>Pet Details | FureverHome</title>
      </Helmet>
      <ScrollRestoration />
      <SectionStart heading={`All About ${selectedPet?.petName}`} />
      <Card data-aos="zoom-in-right" className="mt-5 mb-10 flex flex-col lg:flex-row lg:w-[70%] mx-auto">
        <CardHeader
          color="blue-gray"
          className="relative m-0 basis-1/2 rounded-b-none lg:rounded-l-lg lg:rounded-r-none"
        >
          <img
            className="w-full h-full"
            src={selectedPet?.petImage}
            alt="pet-image"
          />
        </CardHeader>
        <CardBody className="basis-1/2 flex flex-col justify-center">
          <div className="mb-2 flex flex-col gap-2">
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
              <span className="">{htmlToText(selectedPet?.longDescription)}</span>
            </Typography>
          </div>
          <Button
            onClick={() => {
              setIsOpen(true);
            }}
            className="bg-[#FF407D] font-main"
          >
            Adopt {selectedPet?.petName}
          </Button>
        </CardBody>
      </Card>
      <DetailsModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        close={close}
        pet={selectedPet}
      />
    </div>
  );
};

export default PetDetails;
