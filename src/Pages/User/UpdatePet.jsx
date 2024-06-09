import { useRef, useState } from "react";
import SectionStart from "../../Components/Shared/SectionStart";
import { Button, Input, Textarea } from "@material-tailwind/react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { ScrollRestoration, useParams } from "react-router-dom";
import TiptapEditor from "../../Components/TiptapEditor";
import { Helmet } from "react-helmet-async";

const options = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Rabbit", label: "Rabbit" },
];

const UpdatePet = () => {
  const { id } = useParams();
  const editorRef = useRef();
  const [description, setDescription] = useState(null);
  const { data: selectedPet, refetch } = useQuery({
    queryKey: ["singlePet", id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/pet/${id}`);
      return data;
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imgLoading, setImgLoading] = useState(false);
  const axiosCommon = useAxiosCommon();
  const { mutateAsync } = useMutation({
    mutationFn: async (petData) => {
      const { data } = await axiosCommon.put(`/pets/${id}`, petData);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "You just updated this pet!",
        icon: "success",
      });
      refetch();
      reset();
      setPreview(null);
      setDescription(null);
      editorRef.current.clearContent();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const onSubmit = async (data) => {
    const petData = {
      petName: data.petName || selectedPet?.petName,
      petAge: data.petAge || selectedPet?.petAge,
      petLocation: data.petLocation || selectedPet?.petLocation,
      shortDescription: data.shortDescription || selectedPet?.shortDescription,
      longDescription: description || selectedPet?.longDescription,
      petCategory: selectedOption?.value,
      petImage: preview || selectedPet?.petImage,
      adopted: selectedPet.adopted || false,
      provider: user?.email,
      timestamp: selectedPet?.timestamp || Date.now(),
    };
    await mutateAsync(petData);
  };
  const handleImage = async (e) => {
    console.log("hello");
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    try {
      setImgLoading(true);
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );
      setImgLoading(false);
      setPreview(data.data.display_url);
    } catch (error) {
      console.log(error);
      setImgLoading(false);
    }
  };
  return (
    <div className="my-10 flex flex-col justify-center">
      <Helmet>
        <title>Update Pet | FureverHome</title>
      </Helmet>
      <ScrollRestoration />
      <SectionStart heading={`Update Your Pet`} />
      <div data-aos="zoom-in-right" className=" p-4 w-full md:w-3/4 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center md:flex-row gap-6 mb-5">
            <div className="basis-1/2">
              <Input
                label="Pet Name"
                defaultValue={selectedPet?.petName}
                placeholder="Enter Your Pet Name"
                {...register("petName")}
                type="text"
              />
              {errors.petName && (
                <p className="text-base text-[#FF407D] block">
                  Pet Name is required
                </p>
              )}
            </div>
            <div className="basis-1/2">
              <Input
                label="Pet Age"
                placeholder="Enter Your Pet Age"
                defaultValue={selectedPet?.petAge}
                name="petAge"
                {...register("petAge")}
                type="number"
              />
              {errors.petAge && (
                <p className="text-base text-[#FF407D] block">
                  Pet Age is required
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6 mb-5">
            <div className="file_upload w-full basis-1/2 px-5 py-2 relative border-4 border-dotted border-gray-300 rounded-lg">
              <div className="flex flex-col mx-auto text-center">
                <label>
                  {imgLoading ? (
                    <ImSpinner9 className="animate-spin m-auto" size={24} />
                  ) : (
                    <input
                      className="text-sm cursor-pointer hidden"
                      type="file"
                      name="image"
                      onChange={handleImage}
                      id="image"
                      accept="image/*"
                      hidden
                    />
                  )}
                  <div
                    disabled={imgLoading}
                    className={`${
                      imgLoading &&
                      "bg-rose-200 disabled:bg-gray-200 disabled:cursor-not-allowed"
                    } bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 bg-[#FF407D]`}
                  >
                    Upload Image
                  </div>
                  {preview && (
                    <img
                      className="w-36 mt-3 h-20 object-cover rounded"
                      src={preview}
                      alt=""
                    />
                  )}
                </label>
              </div>
              {errors.image && (
                <p className="text-base text-[#FF407D] block">
                  Image is required
                </p>
              )}
            </div>
            <div className="basis-1/2 w-full">
              <Select
                className="w-full"
                defaultValue={selectedOption || selectedPet?.petCategory}
                value={{
                  label: selectedPet?.petCategory,
                  value: selectedPet?.petCategory,
                }}
                onChange={setSelectedOption}
                required
                // {...register("category", { required: true })}
                isSearchable={false}
                placeholder={`Select Pet Category`}
                options={options}
              />
              {errors.category && (
                <p className="text-base text-[#FF407D] block">
                  Category is required
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center md:flex-row gap-6 mb-5">
            <div className="basis-1/2 w-full">
              <Input
                label="Location"
                placeholder="Enter Your Pet Location"
                name="petLocation"
                defaultValue={selectedPet?.petLocation}
                {...register("petLocation")}
                type="text"
              />
              {errors.petLocation && (
                <p className="text-base text-[#FF407D] block">
                  Location is required
                </p>
              )}
            </div>
            <div className="basis-1/2 w-full">
              <Input
                label="Short Description"
                placeholder="Write Short Description"
                name="shortDescription"
                defaultValue={selectedPet?.shortDescription}
                {...register("shortDescription")}
                type="text"
              />
              {errors.shortDescription && (
                <p className="text-base text-[#FF407D] block">
                  Short Description is required
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full items-center md:flex-row gap-6 mb-5">
            {/* <div className="flex flex-col w-full">
              <Textarea
                defaultValue={selectedPet?.longDescription}
                {...register("longDescription")}
                color="gray"
                className="w-full"
                label="Long Description"
              />
              {errors.longDescription && (
                <p className="text-base w-full text-[#FF407D] block">
                  Long Description is required
                </p>
              )}
            </div> */}
            <div className="flex flex-col w-full">
              <TiptapEditor
                defaultValue={selectedPet?.longDescription}
                ref={editorRef}
                setDescription={setDescription}
              />
            </div>
          </div>
          <Button type="submit" className="bg-[#FF407D] w-full">
            Update Pet
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePet;
