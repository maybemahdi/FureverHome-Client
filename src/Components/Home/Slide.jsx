import { Link } from "react-router-dom";

const Slide = ({ image, text, para }) => {
  return (
    <div
      className="w-full rounded-lg bg-center bg-cover h-[38rem]"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="flex items-center rounded-lg justify-center w-full h-full bg-gray-900/70">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white lg:text-4xl">
            {text}
          </h1>
          <p className="font-normal text-center my-5 w-[90%] md:w-[70%] mx-auto text-[#ddd]">
            {para}
          </p>
          <br />
          <Link
            to={"/add-pet"}
            className="px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform border border-[#FF407D] bg-[#ffffff00] hover:bg-[#FF407D] rounded-md lg:w-auto focus:outline-none focus:bg-gray-500"
          >
            Add a Pet
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide;
