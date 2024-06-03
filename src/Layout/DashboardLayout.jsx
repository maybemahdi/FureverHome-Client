import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Dashboard/Sidebar";
import Nav from "../Components/Nav";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "../Components/LoadingSpinner";
import ScrollToTop from "react-scroll-to-top";
import Headroom from "react-headroom";

const DashboardLayout = () => {
  const { role, isLoading } = useRole();
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className="hidden lg:block">
        <Headroom>
          <Nav />
        </Headroom>
      </div>
      <div className="relative min-h-screen md:flex">
        {/* Sidebar Component */}
        <Sidebar />
        <div className="flex-1  md:ml-72">
          <div className="p-5">
            {/* Outlet for dynamic contents */}
            <Outlet />
          </div>
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
      </div>
    </>
  );
};

export default DashboardLayout;
