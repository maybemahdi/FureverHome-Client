import { useState } from "react";
import SectionStart from "../../Components/Shared/SectionStart";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";
import { useMutation } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { ScrollRestoration } from "react-router-dom";
import { Helmet } from "react-helmet-async";



const CreateDonationCampaign = () => {
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
  const { mutateAsync } = useMutation({
    mutationFn: async (petData) => {
      const { data } = await axiosCommon.post("/campaigns", petData);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "You just Created a Campaign!",
        icon: "success",
      });
      reset();
      setPreview(null);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const onSubmit = async (data) => {
    const petData = {
      ...data,
      maxDonationAmount: parseFloat(data.maxDonationAmount),
      donatedAmount: 0,
      petImage: preview,
      status: "running",
      creator: user?.email,
      timestamp: Date.now(),
    };
    if(!preview) {
      return toast.error("Please Provide your Pet Image")
    }
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
        <title>Create Campaign | FureverHome</title>
      </Helmet>
      <ScrollRestoration />
      <SectionStart heading={`Create Donation Campaign`} />
      <div data-aos="zoom-in-right" className=" p-4 w-full md:w-3/4 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center md:flex-row gap-6 mb-5">
            <div className="basis-1/2 w-full">
              <Input
                label="Pet Name"
                placeholder="Enter Your Pet Name"
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
                name="maxDonationAmount"
                {...register("maxDonationAmount", { required: true })}
                type="number"
              />
              {errors.maxDonationAmount && (
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
                      // required
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
            </div>
            <div className="basis-1/2 w-full">
              <Input
                label="Last Date of Donation"
                placeholder="Last Date of Donation"
                name="lastDateOfDonation"
                {...register("lastDateOfDonation", { required: true })}
                type="date"
              />
              {errors.lastDateOfDonation && (
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
            Create Campaign
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationCampaign;
