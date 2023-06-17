import { Outlet, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  const { user } = useUser(); // Access the user from the authentication context

  const navigate = useNavigate();

  if (user.role.includes("admin")) {
    navigate('/');

  }

  return <Outlet />;
};


export default ProtectedRoute
