import { Navigate } from "react-router-dom";
import { isLoggedIn, isAdmin } from "../utils/auth";

const AdminRoute = ({ children }) => {
  if (!isLoggedIn() || !isAdmin()) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
