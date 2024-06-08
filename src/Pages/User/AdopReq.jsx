import { ScrollRestoration } from "react-router-dom";
import SectionStart from "../../Components/Shared/SectionStart";
import { Button, Card, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import LoadingSkeleton from "../../Components/LoadingSkeleton";

const TABLE_HEAD = [
  "Pet Name",
  "Pet Image",
  "Requester Name",
  "Requester Email",
  "Requester Phone",
  "Requester Location",
  "Accept",
  "Reject",
];

const AdopReq = () => {
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();
  const {
    data: myAdoptionReq = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["adoptionRequests", user?.email],
    queryFn: async () => {
      const { data } = await axiosCommon.get(
        `/myAdoptionRequests/${user?.email}`
      );
      return data;
    },
  });
  const handleAccept = (id, petID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Accept it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // update adopted status in the both pet collection and adopted req collection
          const { data } = await axiosCommon.patch(`/updateAdoptedStatus`, {
            id: id,
            petID: petID,
          });
          console.log(data);
          if (data.pet.modifiedCount > 0 && data.adoptReq.modifiedCount > 0) {
            Swal.fire({
              title: "Success!",
              text: "Request Accepted!",
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
  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I Reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosCommon.patch(`/rejectAdoptReq/${id}`, {
            status: "rejected",
          });
          console.log(data);
          if (data.modifiedCount > 0) {
            Swal.fire({
              title: "Success!",
              text: "Request Has Been Rejected.",
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
      {myAdoptionReq?.length > 0 ? (
        <SectionStart heading={`All Adoption Requests`} />
      ) : (
        <SectionStart heading={`No Adoption Requests Found!`} />
      )}
      <div data-aos="zoom-in-right" className="my-10">
        {myAdoptionReq?.length > 0 && (
          <Card className="h-full mx-auto overflow-scroll lg:overflow-hidden">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-3"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold text-black font-main leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {myAdoptionReq.map(
                  ({
                    petName,
                    petImage,
                    name,
                    email,
                    phone,
                    address,
                    _id,
                    petID,
                    adopted,
                    status,
                  }) => {
                    const classes = "p-3 border-b border-blue-gray-50";

                    return (
                      <tr key={name}>
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
                            className="w-11 h-11 rounded object-cover"
                            alt=""
                          />
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal font-main"
                          >
                            {name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="font-medium font-main"
                          >
                            {email}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="font-medium font-main"
                          >
                            {phone}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="font-medium font-main"
                          >
                            {address}
                          </Typography>
                        </td>
                        <td className={classes}>
                          {adopted || status === "rejected" ? (
                            <Button
                              onClick={() => handleAccept(_id, petID)}
                              disabled
                              className="disabled:bg-gray-500 font-main"
                            >
                              {status === "rejected" ? "Accept" : "Accepted"}
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleAccept(_id, petID)}
                              color="green"
                              className="font-main"
                            >
                              Accept
                            </Button>
                          )}
                        </td>
                        <td className={classes}>
                          {adopted || status === "rejected" ? (
                            <Button
                              onClick={() => handleAccept(_id, petID)}
                              disabled
                              className="disabled:bg-gray-500 font-main"
                            >
                              {status === "rejected" ? "Rejected" : "Reject"}
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleReject(_id)}
                              color="red"
                              className="font-main"
                            >
                              Reject
                            </Button>
                          )}
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

export default AdopReq;
