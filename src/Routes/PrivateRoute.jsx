import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import LoadingSkeleton from "../Components/LoadingSkeleton";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading)
    return (
      <div className="grid grid-cols-1 my-20 gap-5">
        {Array.from({ length: 3 }).map((_, idx) => (
          <LoadingSkeleton key={idx} type="card" />
        ))}
      </div>
    );
  if (user) return children;
  return <Navigate to="/login" state={location.pathname} replace="true" />;
};

export default PrivateRoute;
