import { ScrollRestoration } from "react-router-dom";
import SectionStart from "../../Components/Shared/SectionStart";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { Card, Typography } from "@material-tailwind/react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import LoadingSkeleton from "../../Components/LoadingSkeleton";

const TABLE_HEAD = ["Name", "Email", "Profile Photo", "Action"];

const Users = () => {
  const axiosCommon = useAxiosCommon();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/users");
      return data;
    },
  });
  const handleMakeAdmin = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to make him Admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosCommon.patch(`/user/${email}`);
          if (data.modifiedCount > 0) {
            Swal.fire({
              title: "Success!",
              text: "The User is an Admin Now",
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
  if (isLoading) return <LoadingSkeleton type={'card'} />;
  return (
    <div className="my-10 flex flex-col justify-center">
      <ScrollRestoration />
      {users?.length > 0 ? (
        <SectionStart heading={`Manage All Users`} />
      ) : (
        <SectionStart heading={`No User Found!`} />
      )}
      <div data-aos="zoom-in-right" className="my-10">
        {users?.length > 0 && (
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
                {users?.filter(user => user.role === "Admin")?.map(({ userName, userEmail, userImage, role }) => {
                  const classes = "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={userName}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal font-main"
                        >
                          {userName}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal font-main"
                        >
                          {userEmail ? userEmail : "Not Found"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <img
                          className="h-11 w-11 rounded object-cover"
                          src={userImage}
                          alt=""
                        />
                      </td>
                      <td className={classes}>
                        <button
                          onClick={() => handleMakeAdmin(userEmail)}
                          disabled={role === "Admin"}
                          className="disabled:bg-gray-400 bg-[#FF407D] text-white p-2 rounded"
                        >
                          {role === "Admin" ? "Admin" : "Make Admin"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {users?.filter(user => user.role === "User")?.map(({ userName, userEmail, userImage, role }) => {
                  const classes = "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={userName}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal font-main"
                        >
                          {userName}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal font-main"
                        >
                          {userEmail ? userEmail : "Not Found"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <img
                          className="h-11 w-11 rounded object-cover"
                          src={userImage}
                          alt=""
                        />
                      </td>
                      <td className={classes}>
                        <button
                          onClick={() => handleMakeAdmin(userEmail)}
                          disabled={role === "Admin"}
                          className="disabled:bg-gray-400 bg-[#FF407D] text-white p-2 rounded"
                        >
                          {role === "Admin" ? "Admin" : "Make Admin"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Users;
