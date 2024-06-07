import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import SectionStart from "../Shared/SectionStart";
const PetCategory = () => {
  const categories = [
    {
      categoryName: "cat",
      image: "https://i.ibb.co/s1kXzVw/photo-1596854407944-bf87f6fdd49e.jpg",
    },
    {
      categoryName: "dog",
      image: "https://i.ibb.co/DkQwdzR/photo-1596492784531-6e6eb5ea9993.jpg",
    },
    {
      categoryName: "rabbit",
      image: "https://i.ibb.co/S05wGyj/photo-1559214369-a6b1d7919865.jpg",
    },
    // {
    //   categoryName: "fish",
    //   image: "https://i.ibb.co/YjC2Bnw/photo-1599488615731-7e5c2823ff28.jpg",
    // },
  ];

  return (
    <div className="my-20">
      <SectionStart
        heading={`Explore Our Pet Categories`}
        subHeading={`Find the perfect pet for your home by browsing through our diverse
        categories. From cats and dogs to rabbits , we have a variety of
        loving animals ready for adoption `}
      />
      <div className="my-10 grid gap-6 grid-cols-1 md:grid-cols-3">
        {categories.map((category) => (
          <Link
            to={`/pet/category/${category?.categoryName}`}
            key={category?.categoryName}
          >
            <Card
             data-aos="zoom-in-right"
              shadow={false}
              className="relative grid h-[40rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
            >
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="absolute inset-0 m-0 h-full w-full rounded-none"
                style={{
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
              </CardHeader>
              <CardBody className="relative py-14 px-6 md:px-12">
                <Typography
                  variant="h2"
                  color="white"
                  className="mb-6 font-medium leading-[1.5]"
                >
                  {category.categoryName.charAt(0).toUpperCase() +
                    category?.categoryName.slice(1)}
                </Typography>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PetCategory;
