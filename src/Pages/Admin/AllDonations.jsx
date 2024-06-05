import { Link, ScrollRestoration } from "react-router-dom";
import SectionStart from "../../Components/Shared/SectionStart";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import useAuth from "../../Hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { FiEdit3 } from "react-icons/fi";
import { RxResume } from "react-icons/rx";
import { FaCirclePause } from "react-icons/fa6";
import { Card, Progress, Typography } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { RiDeleteBin6Fill } from "react-icons/ri";
import toast from "react-hot-toast";

const TABLE_HEAD = [
    "Pet Name",
    "Max Donation Amount",
    "Donation Progress",
    "Pause/Resume",
    "Edit/Update",
    "Delete",
  ];

const AllDonations = () => {
  const axiosCommon = useAxiosCommon();
  const { user } = useAuth();
  const {
    data: campaigns = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donations", user?.email],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/campaigns`);
      return data;
    },
  });
  const handlePause = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Pause this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Pause it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosCommon.patch(`/pauseCampaign/${id}`, {
            status: "paused",
          });
          console.log(data);
          if (data.modifiedCount > 0) {
            Swal.fire({
              title: "Paused!",
              text: "Campaign has been paused.",
              icon: "success",
            });
            refetch();
          }
        } catch (err) {
          toast.error(err.message);
        }
      }
    });
  };
  const handleResume = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Resume this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Resume it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosCommon.patch(`/resumeCampaign/${id}`, {
            status: "running",
          });
          console.log(data);
          if (data.modifiedCount > 0) {
            Swal.fire({
              title: "Resumed!",
              text: "Campaign has been Resumed.",
              icon: "success",
            });
            refetch();
          }
        } catch (err) {
          toast.error(err.message);
        }
      }
    });
  };

   //delete
   const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosCommon.delete(`/campaign/${id}`);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "This Campaign has been deleted.",
        icon: "success",
      });
      refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  //delete
  const handleDelete = id => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await mutateAsync(id);
        }
      });
  }
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="my-10">
      <ScrollRestoration />
      {campaigns?.length > 0 ? (
        <SectionStart heading={`Manage all Donation Campaigns`} />
      ) : (
        <SectionStart heading={`No Campaigns Found!`} />
      )}
      <div className="my-10">
        {campaigns?.length > 0 && (
          <Card className="h-full md:w-[80%] mx-auto overflow-scroll lg:overflow-hidden">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-main text-base text-black font-bold leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {campaigns?.map(
                  ({
                    petName,
                    maxDonationAmount,
                    donatedAmount,
                    _id,
                    status,
                  }) => {
                    const classes = "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={petName}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal font-main"
                          >
                            {petName}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal font-main"
                          >
                            {maxDonationAmount}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal font-main"
                          >
                            <Progress
                              value={(donatedAmount / maxDonationAmount) * 100}
                              color="green"
                            />
                          </Typography>
                        </td>
                        <td className={classes}>
                          {status !== "paused" ? (
                            <FaCirclePause
                              title="Pause"
                              onClick={() => handlePause(_id)}
                              size={20}
                              className="cursor-pointer"
                            />
                          ) : (
                            <RxResume
                              onClick={() => handleResume(_id)}
                              title="Resume"
                              size={20}
                              className="cursor-pointer"
                            />
                          )}
                        </td>
                        <td className={classes}>
                          <Link to={`/dashboard/editDonation/${_id}`}>
                            <FiEdit3 size={20} className="cursor-pointer" />
                          </Link>
                        </td>
                        <td className={classes}>
                        <button
                        onClick={() => handleDelete(_id)}
                        className="bg-[#FF407D] text-white p-2 rounded hover:bg-[#d15079]"
                      >
                        <RiDeleteBin6Fill size={20} />
                      </button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AllDonations;
