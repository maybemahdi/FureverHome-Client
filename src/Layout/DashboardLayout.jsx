import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Dashboard/Sidebar";
import Nav from "../Components/Nav";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "../Components/LoadingSpinner";

const DashboardLayout = () => {
  const { role, isLoading } = useRole();
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className="hidden lg:block">
        <Nav />
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
      </div>
    </>
  );
};

export default DashboardLayout;
