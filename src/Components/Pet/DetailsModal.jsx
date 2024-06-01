/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import AdoptForm from "./AdoptForm";

const DetailsModal = ({ isOpen, setIsOpen, close, pet }) => {
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
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-white text-black p-6 backdrop-blur-2xl">
                  <DialogTitle as="h3" className="text-2xl font-medium">
                    Name: {pet?.petName}
                  </DialogTitle>
                  <p className="text-base my-1">PetID: {pet?._id}</p>
                  <img
                    className="w-24 h-24 object-cover rounded"
                    src={pet?.petImage}
                    alt=""
                  />
                  <AdoptForm setIsOpen={setIsOpen} pet={pet} />
                  <div className="mt-4"></div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DetailsModal;
