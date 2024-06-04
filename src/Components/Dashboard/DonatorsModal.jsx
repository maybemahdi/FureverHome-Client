/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Button } from "@material-tailwind/react";
import { Fragment } from "react";

const DonatorsModal = ({ isOpen, close, setIsOpen }) => {
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
                  <DialogTitle
                    as="h3"
                    className="text-[20px] text-center font-medium"
                  >
                    All Donators
                  </DialogTitle>
                  <div className="flex justify-around my-10">
                    <div>Email</div>
                    <div>Amount</div>
                  </div>
                  <div className="mt-4">
                    <Button
                        onClick={() => {
                          setIsOpen(false);
                        }}
                      type="submit"
                      className="bg-[#FF407D] w-full p-3 text-white hover:bg-[#b33f64] rounded cursor-pointer"
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
