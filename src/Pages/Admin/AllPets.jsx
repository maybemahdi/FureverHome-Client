import { Link, ScrollRestoration } from "react-router-dom";
import SectionStart from "../../Components/Shared/SectionStart";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Card, Typography } from "@material-tailwind/react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import LoadingSkeleton from "../../Components/LoadingSkeleton";

const TABLE_HEAD = ["Pet Name", "Pet Image", "Update", "Delete", "Action", "Action"];

const AllPets = () => {
  const axiosCommon = useAxiosCommon();
  const {
    data: allPets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allPets"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/allPets");
      return data;
    },
  });

  //delete
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosCommon.delete(`/pet/${id}`);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Your Pet has been deleted.",
        icon: "success",
      });
      refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const handleDelete = async (id) => {
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
  };
  //patch adopted to true
  const handleAdopted = (id) => {
    Swal.fire({
      title: "Is That Already Adopted?",
      text: "If Yes then Click Yes, Otherwise Don't!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, its Adopted!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosCommon.patch(`/pet/${id}`, {
            adopted: true,
          });
          if (data.modifiedCount > 0) {
            Swal.fire({
              title: "Success!",
              text: "Marked as Adopted.",
              icon: "success",
            });
            refetch();
          } else {
            toast.success("Marked As Adopted");
          }
        } catch (err) {
          toast.error(err.message);
        }
      }
    });
  };
  const handleNotAdopted = (id) => {
    Swal.fire({
      title: "Isn't That Already Adopted?",
      text: "If Not then Click Yes, Otherwise Don't!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, its not Adopted!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosCommon.patch(`/pet/${id}`, {
            adopted: false,
          });
          if (data.modifiedCount > 0) {
            Swal.fire({
              title: "Success!",
              text: "Marked as not Adopted.",
              icon: "success",
            });
            refetch();
          } else {
            toast.success("Marked As Not Adopted");
          }
        } catch (err) {
          toast.error(err.message);
        }
      }
    });
  };
  if (isLoading) return <LoadingSkeleton type={'card'} />;
  return (
    <div className="my-10">
      <ScrollRestoration />
      <SectionStart heading={`Manage all Available Pets Here`} />
      <div data-aos="zoom-in-right" className="my-10">
        <Card className="h-full lg:w-[80%] mx-auto overflow-scroll lg:overflow-hidden">
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
                      className="font-medium text-base text-black font-main leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allPets?.map(({ petName, petImage, _id, adopted }) => {
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
                      <img
                        src={petImage}
                        className="h-11 w-11 rounded object-cover"
                        alt=""
                      />
                    </td>
                    <td className={classes}>
                      <Link
                        to={`/dashboard/updatePet/${_id}`}
                        title="Update"
                        className=""
                      >
                        <FiEdit3 color="black" size={20} />
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
                    <td className={classes}>
                      <button
                        onClick={() => handleAdopted(_id)}
                        disabled={adopted}
                        className="disabled:bg-gray-400 disabled:cursor-not-allowed bg-[#FF407D] text-white p-2 rounded hover:bg-[#d15079]"
                      >
                        {adopted ? "Adopted" : "Mark as Adopted"}
                      </button>
                    </td>
                    <td className={classes}>
                      <button
                        onClick={() => handleNotAdopted(_id)}
                        disabled={!adopted}
                        className="disabled:bg-gray-400 disabled:cursor-not-allowed bg-[#FF407D] text-white p-2 rounded hover:bg-[#d15079]"
                      >
                        Mark as Not Adopted
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default AllPets;
