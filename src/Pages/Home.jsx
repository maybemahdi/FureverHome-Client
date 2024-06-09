import { ScrollRestoration } from "react-router-dom";
import Carousel from "../Components/Home/Carousel";
import PetCategory from "../Components/Home/PetCategory";
import CallToAction from "../Components/Home/CallToAction";
import About from "../Components/Home/About";
import Features from "../Components/Home/Features";
import Faq from "../Components/Home/Faq";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | FureverHome</title>
      </Helmet>
      <ScrollRestoration />
      <Carousel />
      <PetCategory />
      <CallToAction />
      <About />
      <Features/>
      <Faq/>
    </div>
  );
};

export default Home;
