import { Outlet } from "react-router-dom";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";

const Main = () => {
  return (
    <div>
      <div>
        <Nav />
      </div>
      <div className="w-[93%] mx-auto min-h-screen">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Main;
