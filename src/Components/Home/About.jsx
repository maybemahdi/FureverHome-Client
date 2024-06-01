import { Card, CardHeader, CardBody, Button } from "@material-tailwind/react";
import SectionStart from "../Shared/SectionStart";
const About = () => {
  return (
    <div className="my-20">
      <SectionStart
        heading={`About Us: Saving Lives One Adoption at a Time`}
        subHeading={`At our adoption center, every adoption is a triumph. Our mission is clear: to rescue animals in need, provide them with love and care, and match them with forever homes where they'll thrive`}
      />
      <Card className="w-full my-10 flex-col md:flex-row">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 md:w-2/5 shrink-0 md:rounded-r-none"
        >
          <img
            src="https://i.ibb.co/mhWks1N/photo-1525983360072-2ebda055ba40.jpg"
            alt="card-image"
            className="h-[450px] w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <h6 color="gray" className="mb-4 uppercase">
            About Us
          </h6>
          <h4
            color="blue-gray"
            className="mb-2 text-3xl text-black font-medium"
          >
            Adoption Process: How to Bring Your New Best Friend Home
          </h4>
          <h4 color="gray" className="mb-8 font-normal">
            Wondering how to start your adoption journey? Learn about our
            straightforward adoption process, from application to bringing your
            new pet home, and make a lifelong commitment to love and care.
          </h4>
          <a href="#" className="inline-block">
            <Button
              variant="text"
              className="flex bg-gray-300 hover:bg-[#FF407D] hover:text-white items-center gap-2"
            >
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </a>
        </CardBody>
      </Card>
    </div>
  );
};

export default About;
