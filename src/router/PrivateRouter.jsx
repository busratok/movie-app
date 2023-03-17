import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toastErrorNotify } from "../helpers/ToastNotify";

const PrivateRouter = () => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Outlet />;
  } else {
    toastErrorNotify("Please log in to see details");
    return <Navigate to="/login" />;
  }
};

export default PrivateRouter;
