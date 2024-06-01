const SectionStart = ({ heading, subHeading }) => {
  return (
    <div className="flex flex-col items-center gap-5 justify-center px-2">
      <h3 className="font-bold text-center text-2xl md:text-4xl">{heading}</h3>
      <p className="w-full md:w-[60%] mx-auto text-center">{subHeading}</p>
    </div>
  );
};

export default SectionStart;
