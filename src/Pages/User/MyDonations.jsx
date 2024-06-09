import { ScrollRestoration } from "react-router-dom";
import SectionStart from "../../Components/Shared/SectionStart";
import { Card, Typography } from "@material-tailwind/react";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const TABLE_HEAD = ["Pet Image", "Pet Name", "Donated Amount", "Refund"];

const MyDonations = () => {
  const axiosCommon = useAxiosCommon();
  const { user } = useAuth();
  const { data: myDonations = [], refetch } = useQuery({
    queryKey: ["myDonations"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/myDonations/${user?.email}`);
      return data;
    },
  });
  const handleRefund = (id, donateId, donatedAmount) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to get Refund?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Request it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const dataForPatch = {
          donatedAmount: donatedAmount,
        };
        try {
          const { data } = await axiosCommon.delete(`/deleteDonate/${id}`);
          await axiosCommon.patch(`/updateTotalDonatedAmount/${donateId}`, dataForPatch)
          if (data.deletedCount > 0) {
            Swal.fire({
              title: "Success!",
              text: "Request has been sent",
              icon: "success",
            });
            refetch();
          }
        } catch (err) {
          toast.error("err.message");
        }
      }
    });
  };
  return (
    <div className="my-10 flex flex-col justify-center">
      <Helmet>
        <title>My Donations | FureverHome</title>
      </Helmet>
      <ScrollRestoration />
      {myDonations?.length > 0 ? (
        <SectionStart heading={`My Donations`} />
      ) : (
        <SectionStart heading={`No Donation Yet!`} />
      )}
      <div data-aos="zoom-in-right" className="my-10">
        {myDonations?.length > 0 && (
          <Card className="h-full md:w-[80%] mx-auto overflow-scroll xl:overflow-hidden">
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
                        className="font-bold text-base font-main leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {myDonations?.map(
                  ({ petImage, petName, donatedAmount, _id, donateId }) => {
                    const classes = "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={name}>
                        <td className={classes}>
                          <img
                            className="w-11 h-11 rounded"
                            src={petImage}
                            alt=""
                          />
                        </td>
                        <td className={classes}>{petName}</td>
                        <td className={classes}>{donatedAmount}</td>
                        <td className={classes}>
                          <button
                            onClick={() =>
                              handleRefund(_id, donateId, donatedAmount)
                            }
                            className="bg-[#FF407D] text-white p-2 rounded"
                          >
                            Ask for Refund
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

export default MyDonations;
