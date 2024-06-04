import { Link, ScrollRestoration } from "react-router-dom";
import SectionStart from "../../Components/Shared/SectionStart";

import { Card, Progress, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import useAuth from "../../Hooks/useAuth";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { FaCirclePause } from "react-icons/fa6";
import { RxResume } from "react-icons/rx";
import { FiEdit3 } from "react-icons/fi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useState } from "react";
import DonatorsModal from "../../Components/Dashboard/DonatorsModal";

const TABLE_HEAD = [
  "Pet Name",
  "Max Donation Amount",
  "Donation Progress",
  "Pause/Resume",
  "Edit/Update",
  "Donators",
];
const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];

const MyDonationCampaigns = () => {
  const axiosCommon = useAxiosCommon();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const {
    data: myCamp = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myCamp", user?.email],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/myCamp/${user?.email}`);
      return data;
    },
  });
  function close() {
    setIsOpen(false);
  }
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
              text: "Your campaign has been paused.",
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
              text: "Your campaign has been Resumed.",
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
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="my-10 flex flex-col justify-center">
      <ScrollRestoration />
      <SectionStart heading={`My Donation Campaigns`} />
      <div className="my-10">
        <Card className="h-full w-full overflow-scroll lg:overflow-hidden">
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
              {myCamp?.map(
                (
                  { petName, maxDonationAmount, donatedAmount, _id, status },
                  index
                ) => {
                  const isLast = index === TABLE_ROWS?.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

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
                          onClick={() => setIsOpen(true)}
                          className="bg-[#FF407D] text-white p-2 rounded"
                        >
                          View Donators
                        </button>
                      </td>
                      {/* modal   */}
                      <DonatorsModal isOpen={isOpen} setIsOpen={setIsOpen} close={close} />
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default MyDonationCampaigns;
