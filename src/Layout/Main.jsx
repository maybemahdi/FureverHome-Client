import { Outlet } from "react-router-dom";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Headroom from "react-headroom";
import ScrollToTop from "react-scroll-to-top";

const Main = () => {
  return (
    <div>
      <Headroom>
        <Nav />
      </Headroom>
      <div className="w-[93%] mx-auto min-h-screen">
        <Outlet />
      </div>
      <ScrollToTop
        smooth
        style={{
          textAlign: "center",
          fontFamily: "Poppins",
          fontWeight: "bold",
          padding: "8px",
          paddingLeft: "5.9px",
          borderRadius: "50%",
          background: "#FF407D",
          boxShadow: "0px 18px 93px 5px rgba(61,54,61,1)",
        }}
        color="#ffff"
      />
      <Footer />
    </div>
  );
};

export default Main;
