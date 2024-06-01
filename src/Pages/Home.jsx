import { ScrollRestoration } from "react-router-dom";
import Carousel from "../Components/Home/Carousel";
import useAuth from "../Hooks/useAuth";
import PetCategory from "../Components/Home/PetCategory";
import CallToAction from "../Components/Home/CallToAction";
import About from "../Components/Home/About";

const Home = () => {
    const {user} = useAuth()
    console.log(user?.email)
    return (
        <div>
            <ScrollRestoration/>
            <Carousel/>
            <PetCategory/>
            <CallToAction/>
            <About/>
        </div>
    );
};

export default Home;