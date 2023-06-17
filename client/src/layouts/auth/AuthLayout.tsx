import { Outlet } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

const AuthLayout = () => {
    return (
        <div
            className="d-flex align-items-start justify-content-center"
            style={{ minHeight: "100vh", backgroundColor: "#fff" }}
        >
            <Container
                className="p-4"
                style={{
                    borderRadius: "1rem",
                    marginTop: "10rem",
                    maxWidth: "40rem"
                }}
            >
                <Row className="justify-content-center">
                    <Outlet />
                </Row>
            </Container>
        </div>
    )
};

export default AuthLayout
