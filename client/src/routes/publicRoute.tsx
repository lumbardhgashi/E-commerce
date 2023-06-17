import { Outlet, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { toast } from "react-toastify";

const PublicRoute = () => {
  const { user } = useUser(); // Access the user from the authentication context

  console.log(user);

  const navigate = useNavigate();

  if (user) {
    navigate('/');

  }

  return <Outlet />;
};

export default PublicRoute