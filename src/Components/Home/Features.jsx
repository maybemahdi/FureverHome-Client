import SectionStart from "../Shared/SectionStart";

const Features = () => {
  return (
    <section className="text-base-content">
      <div className="container py-10 mx-auto">
        <SectionStart
          heading={`Easy Online Application: Adopt from the Comfort of Your Home`}
          subHeading={`Our streamlined online application process makes it easy to start your adoption journey. With just a few clicks, you can complete your application from the comfort of your home`}
        />

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
          <div
            data-aos="flip-down"
            className="p-8 space-y-3 border-2 border-[#FF407D] shadow bg-white rounded-xl"
          >
            <span className="inline-block text-[#FF407D]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.879 16.121A3 3 0 100 11L11 14H9c0 .768.293 1.536.879 2.121z"
                />
              </svg>
            </span>

            <h1 className="text-xl font-semibold">User-Friendly Interface</h1>

            <p className="">
              Navigate our platform with ease, ensuring a hassle-free experience
              as you search for your new furry friend
            </p>
          </div>
          <div
            data-aos="flip-down"
            className="p-8 space-y-3 border-2 border-[#FF407D] bg-white shadow rounded-xl"
          >
            <span className="inline-block text-[#FF407D]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.879 16.121A3 3 0 100 11L11 14H9c0 .768.293 1.536.879 2.121z"
                />
              </svg>
            </span>

            <h1 className="text-xl font-semibold">Detailed Information</h1>

            <p className="">
              Each pet profile provides in-depth details about their
              personality, background, and specific needs, helping you find the
              perfect match for your home.
            </p>
          </div>
          <div
            data-aos="flip-down"
            className="p-8 space-y-3 border-2 border-[#FF407D] bg-white shadow rounded-xl"
          >
            <span className="inline-block text-[#FF407D]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.879 16.121A3 3 0 100 11L11 14H9c0 .768.293 1.536.879 2.121z"
                />
              </svg>
            </span>

            <h1 className="text-xl font-semibold">Health Guarantees</h1>

            <p className="">
              Adopt with confidence knowing that each pet has undergone thorough
              health checks and is ready for a loving home.
            </p>
          </div>

          {/* Repeat similar structure for other components */}
        </div>
      </div>
    </section>
  );
};

export default Features;
