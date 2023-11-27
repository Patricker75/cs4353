import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const RequireAuth = () => {
  const userId = useSelector((state) => state.auth.userId);

  const isLoggedIn = userId !== -1;

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default RequireAuth;
