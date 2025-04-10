import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const PrivateRoute = () => {
  const auth = useAuth();
  if (auth?.loading_isSignedIn) return <h1>Loading...</h1>;
  if (auth?.error_isSignedIn) return <h1>Error: {auth?.error_isSignedIn}</h1>;

  return auth?.isSignedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoute;
