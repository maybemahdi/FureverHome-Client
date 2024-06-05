import LoadingSpinner from "../../Components/LoadingSpinner";
import useRole from "../../Hooks/useRole";
import Users from "../Admin/Users";
import AddPet from "../User/AddPet";

const DashboardHome = () => {
  const { role, isLoading } = useRole();
  if (isLoading) return <LoadingSpinner />;
  return <div>{role === "Admin" ? <Users /> : <AddPet />}</div>;
};

export default DashboardHome;
