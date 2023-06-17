import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';
import useUser from '../../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateOrder } from '../../../api/order/updateOrder';
import { useMutation } from '@tanstack/react-query';

interface IProps {
    secret: string
    orderId: string
}

const PaymentPage: React.FC<IProps> = ({ secret, orderId }) => {
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if(!secret || !orderId) {
            navigate('/')
        }
    }, [])

    const user = useUser()

    const { mutate: updateOrderStatus, isLoading } = useMutation(updateOrder, {
        onSuccess(data) {
            console.log(data);
        }
    })

    const confirmPayment = async () => {
        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (cardElement) {
            const { paymentIntent, error } = await stripe.confirmCardPayment(secret!, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        email: user.user.email,
                    },
                },
            });

            switch (paymentIntent?.status) {
                case "succeeded":
                    updateOrderStatus(orderId)
                    navigate("/");
                    toast.success('Payment Completed', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    break;
            }
        }
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        confirmPayment()
    };



    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card.Body>
                        <Card.Title className='payment-header mb-5' style={{ textAlign: "center", fontSize: "2rem" }}>Payment Information</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='mb-3'>
                                <Form.Label>Card Details</Form.Label>
                                <CardElement className="form-control" options={{ style: { base: { fontSize: '16px' } }, hidePostalCode: true }} />
                            </Form.Group>
                            <Row className="justify-content-end">
                                <Col xs="auto">
                                    <Button type="submit" className='payment-button'>Buy now</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Col>
            </Row>
        </Container>
    );
};

interface Props {
    secret: string
    orderId: string
}

const PaymentPageWithStripe: React.FC<Props> = ({ secret, orderId }) => {
    const stripePromise = loadStripe('pk_test_51LHyQwEVzR0DMs8hCEjyIIgiJzy3Tx0GyqX44fD4tSnDMLOusnFbPaegYd3JtDQLGkikQUzlOfIiD9hKRucNfVoi00TbljecaT');

    const options = {
        clientSecret: secret,
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <PaymentPage secret={secret} orderId={orderId} />
        </Elements>
    );
};

export default PaymentPageWithStripe;