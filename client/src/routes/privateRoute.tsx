import { useNavigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const { user } = useUser(); // Access the user from the authentication context

  const navigate = useNavigate()

  if (!user) {
    navigate('/login')

  }

  return <Outlet />

};

export default PrivateRoute
