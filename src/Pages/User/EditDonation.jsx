import { useState } from "react";
import SectionStart from "../../Components/Shared/SectionStart";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { ScrollRestoration, useParams } from "react-router-dom";
import LoadingSkeleton from "../../Components/LoadingSkeleton";
const EditDonation = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const [preview, setPreview] = useState(null);
  const [imgLoading, setImgLoading] = useState(false);
  const axiosCommon = useAxiosCommon();
  const {
    data: selectedCamp,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["selectedCamp", id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/campaign/${id}`);
      return data;
    },
  });
  const { mutateAsync } = useMutation({
    mutationFn: async (petData) => {
      const { data } = await axiosCommon.put(`/campaigns/${id}`, petData);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "You just Updated a Campaign!",
        icon: "success",
      });
      reset();
      refetch();
      setPreview(null);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const onSubmit = async (data) => {
    const petData = {
      petName: data.petName || selectedCamp?.petName,
      maxDonationAmount:
        parseFloat(data.maxDonationAmount) || selectedCamp?.maxDonationAmount,
      donatedAmount: selectedCamp?.donatedAmount,
      petImage: preview || selectedCamp?.petImage,
      lastDateOfDonation:
        data.lastDateOfDonation || selectedCamp?.lastDateOfDonation,
      shortDescription: data.shortDescription || selectedCamp?.shortDescription,
      longDescription: data.longDescription || selectedCamp?.longDescription,
      status: selectedCamp?.status,
      creator: selectedCamp?.creator || user?.email,
      timestamp: selectedCamp?.timestamp || Date.now(),
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
  if (isLoading) return <LoadingSkeleton type={'card'} />;
  return (
    <div className="my-10 flex flex-col justify-center">
      <ScrollRestoration />
      <SectionStart heading={`Update Donation Campaign`} />
      <div data-aos="zoom-in-right" className=" p-4 w-full md:w-3/4 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center md:flex-row gap-6 mb-5">
            <div className="basis-1/2 w-full">
              <Input
                label="Pet Name"
                placeholder="Enter Your Pet Name"
                defaultValue={selectedCamp?.petName}
                {...register("petName", { required: true })}
                type="text"
              />
              {errors.petName && (
                <p className="text-base text-[#FF407D] block">
                  Pet Name is required
                </p>
              )}
            </div>
            <div className="basis-1/2 w-full">
              <Input
                label="Max Donation Amount"
                placeholder="Max Donation Amount"
                defaultValue={selectedCamp?.maxDonationAmount}
                name="maxDonationAmount"
                {...register("maxDonationAmount", { required: true })}
                type="number"
              />
              {errors.petAge && (
                <p className="text-base text-[#FF407D] block">
                  Max Donation Amount is required!
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
              <Input
                label="Last Date of Donation"
                placeholder="Last Date of Donation"
                name="lastDateOfDonation"
                defaultValue={selectedCamp?.lastDateOfDonation}
                {...register("lastDateOfDonation", { required: true })}
                type="date"
              />
              {errors.petAge && (
                <p className="text-base text-[#FF407D] block">
                  Last Date of Donation is required!
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center md:flex-row gap-6 mb-5">
            <div className="w-full">
              <Input
                label="Short Description"
                placeholder="Write Short Description"
                name="shortDescription"
                defaultValue={selectedCamp?.shortDescription}
                {...register("shortDescription", { required: true })}
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
            <div className="flex flex-col w-full">
              <Textarea
                {...register("longDescription", { required: true })}
                color="gray"
                className="w-full"
                defaultValue={selectedCamp?.longDescription}
                label="Long Description"
              />
              {errors.longDescription && (
                <p className="text-base w-full text-[#FF407D] block">
                  Long Description is required
                </p>
              )}
            </div>
          </div>
          <Button type="submit" className="bg-[#FF407D] w-full">
            Update Campaign
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditDonation;
