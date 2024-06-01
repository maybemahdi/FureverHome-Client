import { ScrollRestoration } from "react-router-dom";
import Carousel from "../Components/Home/Carousel";
import useAuth from "../Hooks/useAuth";

const Home = () => {
    const {user} = useAuth()
    console.log(user?.email)
    return (
        <div>
            <ScrollRestoration/>
            <Carousel/>
        </div>
    );
};

export default Home;