import { ScrollRestoration } from "react-router-dom";
import Carousel from "../Components/Home/Carousel";
import useAuth from "../Hooks/useAuth";
import PetCategory from "../Components/Home/PetCategory";
import CallToAction from "../Components/Home/CallToAction";
import About from "../Components/Home/About";
import Features from "../Components/Home/Features";
import Faq from "../Components/Home/Faq";
import LoadingSpinner from "../Components/LoadingSpinner";

const Home = () => {
  const { user, loading } = useAuth();
  console.log(user?.email);
  if(loading) return <LoadingSpinner />
  return (
    <div>
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
