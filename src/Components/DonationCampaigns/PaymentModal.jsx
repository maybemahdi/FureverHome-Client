/* eslint-disable react/prop-types */
import { Fragment } from "react";

import {
    Button,
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
  } from "@headlessui/react";

const PaymentModal = ({isOpen, setIsOpen, close, campaign}) => {
    return (
        <>
      <Transition appear show={isOpen} as={Fragment}>
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
                  <DialogTitle as="h3" className="text-2xl font-medium">
                    Donate Now for {campaign?.petName}!
                  </DialogTitle>
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

export default PaymentModal;