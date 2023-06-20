import React from 'react';
import { Container, Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { FiUserCheck } from 'react-icons/fi';
import { IconContext } from 'react-icons/lib';
import useUser from '../../hooks/useUser';
import { ICart, IUser } from '@aaecomm/common';





interface IHeaderProps {
    cart: ICart | undefined,
    handleLogout: () => void,
    user: IUser | undefined
}


const Header: React.FunctionComponent<IHeaderProps> = ({
    cart,
    handleLogout,
    user
}) => {

    const cartItemsCount = cart?.cartItems?.reduce((acc, item) => acc + item.quantity, 0)

    const privateSubMenu = [
        {
            id: 1,
            href: "/orders",
            label: "Orders",
        },
        {
            id: 2,
            href: "/wishlist",
            label: "Wishlist",
        },
        {
            id: 3,
            href: "/history",
            label: "History",
        },
        {
            id: 6,
            onClick: handleLogout,
            label: "Logout",
        },
    ]

    if(user?.role && user.role.includes("admin")) {
        privateSubMenu.splice(privateSubMenu.length - 1, 0, {
            id: 4,
            href: "/admin",
            label: "Dashboard",
        },);
    }



    const privateNavItems = [
        {
            id: 1,
            href: "/cart",
            icon: <IconContext.Provider value={{ color: "white" }}>
                <div style={{ position: "relative" }}>
                    <FaShoppingCart size={30} />
                    <Badge style={{ position: "absolute", top: "-10px", right: "-10px", backgroundColor: "red" }} className="cart-badge">
                        {cartItemsCount}
                    </Badge>
                </div>
            </IconContext.Provider>,
            showLoggedIn: true

        },
        {
            id: 2,
            icon: <IconContext.Provider value={{ color: "white" }}>
                <FaUser size={30} />

            </IconContext.Provider>,
            children: privateSubMenu,
            showLoggedIn: true
        }
    ]
    console.log(user);
    const publicNavItems = [
        {
            id: 3,
            href: "/login",
            icon: (
                <span style={{ color: "white", fontSize: "1.5rem" }}>Login</span>
            ),
        }
    ]


    let navItems: any = []

    if (user) {
        navItems = [...privateNavItems]
    } else {
        navItems = [...publicNavItems]
    }


    // if (user?.role.includes("admin")) {
    //     navItems = [...navItems, ]
    // }


    return (
        <Navbar
            style={{ backgroundColor: '#5a84ce', height: '4rem', paddingLeft: '1rem', paddingRight: '1rem', width: "100%" }}
            expand="lg"
            variant="dark"
        >
            <Container fluid style={{ padding: "0 4rem" }}>
                <Navbar.Brand href="/" style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    ECommerce
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                    {navItems.map((item: any) => (
                        <React.Fragment key={item.id}>
                            {item.href ? (
                                <Nav.Link href={item.href} className="icon-link" style={{ marginRight: '2rem' }}>
                                    {item.icon}
                                </Nav.Link>
                            ) : (
                                <NavDropdown
                                    title={item.icon}
                                    id="profile-dropdown"
                                    className="icon-dropdown"
                                    align="end"
                                    style={{
                                        color: "white",
                                        marginRight: '2rem'
                                    }}
                                >
                                    {item.children?.map((child: any) => (
                                        <NavDropdown.Item key={child.id} href={child.href} onClick={child.onClick}>
                                            {child.label}
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                            )}
                        </React.Fragment>
                    ))}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header
