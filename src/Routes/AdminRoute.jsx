import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../Components/LoadingSpinner";
import useRole from "../Hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { role, isLoading } = useRole();
  if (isLoading || loading) return <LoadingSpinner />;
  if (user && role === "Admin") return children;
  return <Navigate to="/login" state={location.pathname} replace></Navigate>;
};

export default AdminRoute;
