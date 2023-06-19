import { useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import useUser from "../../hooks/useUser";

import { logoutUser } from "../../api/user/logout";


import orderHistory from "../../assets/icons/icon-order-history.svg";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";

const NavItems = [
    {
        name: "Order list",
        logo: orderHistory,
        path: `/order-list`,
        alt: `order`,
        label: `Order list`,
    },
    {
        name: "Products",
        logo: orderHistory,
        path: `/products`,
        alt: `products`,
        label: `Products`,
    },
    {
        name: "Categories",
        logo: orderHistory,
        path: `/categories`,
        alt: `categories`,
        label: `Categories`,
    },
];

const AdminLayout = () => {
    const mobileNavRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate()

    const user = useUser()

    const { mutate, isLoading } = useMutation(logoutUser, {
        onSuccess: async () => {
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

    const menuItems = [
        { id: 4, label: "Orders", link: "/orders" },
        { id: 3, label: "Products", link: "/products" },
        { id: 2, label: "Categories", link: "/categories" },
    ];

    const onLogoutHandler = () => {
        mutate()
    }

    return (
        <Container fluid>
            <Row style={{ height: "100vh" }}>
                <Col md={2} style={{ backgroundColor: "#5a84ce", display: "flex", flexDirection: "column" }}>
                    <Nav style={{ width: "100%", color: "white" }} className="flex-column d-flex align-items-center justify-content-center">
                        <Nav.Link
                            className="mb-5 mt-3"
                            style={{ color: "inherit", fontWeight: "bold", fontSize: "1.5rem" }}
                            as={NavLink}
                            to="/admin"
                        >
                            ECommerce
                        </Nav.Link>
                        {menuItems.map((item: any) => (
                            <Nav.Link
                                key={item.id}
                                style={{ color: "inherit", fontSize: "1.2rem" }}
                                as={NavLink}
                                to={`/admin${item.link}`}
                            >
                                {item.label}
                            </Nav.Link>
                        ))}
                    </Nav>
                    <div className=" mt-auto mb-5 d-flex justify-content-center">
                        <Button style={{ width: "100%" }} variant="danger">Logout</Button>
                    </div>
                </Col>
                <Col md={10} className="py-5">
                    <Container>
                        <Outlet />
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminLayout;