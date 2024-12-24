import { Navigate, useLocation } from "react-router-dom";
import { useServiceContext } from "../context/Context";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useServiceContext();
  const location = useLocation();
  //console.log(user);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return (
    <Navigate to={"/auth/login"} state={{ from: location.pathname }} replace />
  );
};
export default PrivateRoute;
