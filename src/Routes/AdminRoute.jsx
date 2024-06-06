import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import LoadingSkeleton from "../Components/LoadingSkeleton";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { role, isLoading } = useRole();
  if (isLoading || loading)
    return (
      <div className="grid grid-cols-1 my-20 gap-5">
        {Array.from({ length: 3 }).map((_, idx) => (
          <LoadingSkeleton key={idx} type="card" />
        ))}
      </div>
    );
  if (user && role === "Admin") return children;
  return <Navigate to="/login" state={location.pathname} replace></Navigate>;
};

export default AdminRoute;
