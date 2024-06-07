import { Typography } from "@material-tailwind/react";

const Footer = () => {
  return (
    <footer
      className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 bg-[#FFCAD4] px-6 py-12 text-center md:justify-between"
    >
      <Typography color="blue-gray" className="font-main font-bold">
        &copy; 2024 FureverHome
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal font-main transition-colors hover:text-[#FF407D]"
          >
            About Us
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal font-main transition-colors hover:text-[#FF407D]"
          >
            License
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal font-main transition-colors hover:text-[#FF407D]"
          >
            Contribute
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal font-main transition-colors hover:text-[#FF407D]"
          >
            Contact Us
          </Typography>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
