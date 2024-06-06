/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Button } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import LoadingSkeleton from "../LoadingSkeleton";

const DonatorsModal = ({ isOpen, close, setIsOpen, id }) => {
  const axiosCommon = useAxiosCommon();
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["donations", id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/donationData/${id}`);
      return data;
    },
  });
  if (isLoading) return <LoadingSkeleton type={'card'} />;
  return (
    <>
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
        >
          <div className="fixed inset-0 z-10 w-screen bg-[#3333323e] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-white text-black p-6 backdrop-blur-2xl">
                  {donations?.length > 0 ? (
                    <DialogTitle
                      as="h3"
                      className="text-[20px] font-medium"
                    >
                      All Donators
                    </DialogTitle>
                  ) : (
                    <DialogTitle
                      as="h3"
                      className="text-[20px] text-red-500 text-center font-medium"
                    >
                      No Donator Found Yet
                    </DialogTitle>
                  )}
                  {donations?.length > 0 && (
                    <>
                      <div className="flex justify-between mt-5 font-bold">
                        <div>Name</div>
                        <div>Email</div>
                        <div>Amount</div>
                      </div>
                      <div className="flex justify-between mb-5 mt-2">
                        <div>
                          {donations?.map((donation, idx) => (
                            <p key={idx}>{donation.donarName}</p>
                          ))}
                        </div>
                        <div>
                          {donations?.map((donation, idx) => (
                            <p key={idx}>{donation.donarEmail}</p>
                          ))}
                        </div>
                        <div>
                          {donations?.map((donation, idx) => (
                            <p key={idx}>${donation.donatedAmount}</p>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  <div className="mt-4">
                    <Button
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      type="submit"
                      className="bg-[#FF407D] w-full p-3 text-white hover:bg-[#b33f64] rounded cursor-auto"
                    >
                      Okay! Close
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DonatorsModal;
