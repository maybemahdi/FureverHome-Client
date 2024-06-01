import SectionStart from "../Shared/SectionStart";
import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const Faq = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="my-10">
      <SectionStart heading={`Frequently Asked Questions`} subHeading={``} />
      <div className="flex flex-col lg:flex-row gap-8 mt-10">
        <div className="basis-1/2">
          <img
            className="rounded hover:scale-105 transition-all duration-300"
            src="https://i.ibb.co/njF7SSM/photo-1457144759132-40d119c2f120.jpg"
            alt=""
          />
        </div>
        <div className="basis-1/2 space-y-4 my-10">
          <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
            <AccordionHeader
              className="font-main"
              onClick={() => handleOpen(1)}
            >
              What is the process for adopting a pet?
            </AccordionHeader>
            <AccordionBody className="font-main text-base text-[#151515]">
              The adoption process typically involves filling out an
              application, meeting with the pet, and undergoing a home visit or
              interview. Once approved, you can finalize the adoption by paying
              the adoption fee and signing an adoption agreement.
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
            <AccordionHeader
              className="font-main"
              onClick={() => handleOpen(2)}
            >
              What is included in the adoption fee?
            </AccordionHeader>
            <AccordionBody className="font-main text-base text-[#151515]">
              The adoption fee usually covers the cost of vaccinations, spaying or neutering, a health check-up, and sometimes a starter kit with food and supplies. This fee helps us cover the costs of caring for the animals and preparing them for their new homes.
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
            <AccordionHeader
              className="font-main"
              onClick={() => handleOpen(3)}
            >
              How can I prepare my home for a new pet?
            </AccordionHeader>
            <AccordionBody className="font-main text-base text-[#151515]">
              Preparing your home involves pet-proofing the area, setting up a comfortable space with food, water, and bedding, and gathering essential supplies such as a leash, collar, toys, and grooming tools. It's also helpful to research and establish a routine to help your new pet adjust smoothly.
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
            <AccordionHeader
              className="font-main"
              onClick={() => handleOpen(4)}
            >
              What kind of support do you offer after adoption?
            </AccordionHeader>
            <AccordionBody className="font-main text-base text-[#151515]">
              We provide ongoing support through resources such as training tips, behavior advice, and access to a network of veterinarians and pet care experts. Our team is always available to answer questions and help ensure a successful transition for your new pet.
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
            <AccordionHeader
              className="font-main"
              onClick={() => handleOpen(5)}
            >
              What should I do if the adoption doesn’t work out?
            </AccordionHeader>
            <AccordionBody className="font-main text-base text-[#151515]">
              If the adoption doesn’t work out, we ask that you contact us as soon as possible. We understand that sometimes things don’t go as planned, and we’re committed to finding the best solution for both you and the pet. We will work with you to either provide additional support or find a more suitable home for the pet.
            </AccordionBody>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Faq;
