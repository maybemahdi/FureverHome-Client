import { ScrollRestoration } from "react-router-dom";
import SectionStart from "../../Components/Shared/SectionStart";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Name", "Email", "Profile Photo", "Action"];

const Users = () => {
  const axiosCommon = useAxiosCommon();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/users");
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="my-10 flex flex-col justify-center">
      <ScrollRestoration />
      {users?.length > 0 ? (
        <SectionStart heading={`Manage All Users`} />
      ) : (
        <SectionStart heading={`No User Found!`} />
      )}
      <div className="my-10">
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
                {users?.map(({ userName, userEmail, userImage, role, _id }) => {
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
