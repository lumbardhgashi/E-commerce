import { Outlet, useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Header from "../../components/Navbar/Navbar";
import { getCart } from "../../api/cart/getCart";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ICart } from "@aaecomm/common";
import { logoutUser } from "../../api/user/logout";
import { toast } from "react-toastify";
import { queryClient } from "../../main";
import useUser from "../../hooks/useUser";

const MainLayout = () => {

    const navigate = useNavigate()

    const { data } = useQuery<ICart>(["cart/get"], () => getCart())

    const user = useUser()

    const { mutate } = useMutation(logoutUser, {
        onSuccess: async (data) => {
            toast.success('Logged out', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            user.refetch()
            navigate('/')
        },

    })


    const onLogoutHandler = () => {
        mutate()
    }

    return (
        <div
            className="d-flex flex-column align-items-center "
            style={{ minHeight: '100vh' }}
        >
            <Header user={user.user} cart={data} handleLogout={onLogoutHandler} />
            <Container className="pt-5" style={{
                width: "100%", height: "100%"
            }}>
                <Outlet />
            </Container>
        </div>
    );
};

export default MainLayout;