import { ICart, IShippingDetails } from '@aaecomm/common'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { getCart } from '../../../api/cart/getCart'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createOrder } from '../../../api/order/createOrder'
import { createPayment } from '../../../api/payments/createPayment'
import { createContext } from 'react';

interface Props {
    onSubmitHandler: (data: IShippingDetails) => void
}

const Shipping: React.FC<Props>  = ({onSubmitHandler}) => {

    const [data, setData] = useState<IShippingDetails>({
        country: "Kosova",
        address1: "",
        city: "",
        fullName: "",
        zip: ""
    })

    
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const onSubmit = (e: any) => {
        e.preventDefault()
        onSubmitHandler(data)
    }

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h3>Shipping Details</h3>
                    <hr />
                    <Form onSubmit={onSubmit}>
                        <Form.Group className='mb-1' controlId="fullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control onChange={onChangeHandler} type="text" name='fullName' value={data.fullName} />
                        </Form.Group>
                        <Form.Group className='mb-1' controlId="address1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control onChange={onChangeHandler} type="text" name="address1" value={data.address1} />
                        </Form.Group>
                        <Form.Group className='mb-1' controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control onChange={onChangeHandler} type="text" name="city" value={data.city} />
                        </Form.Group>
                        <Form.Group className='mb-5' controlId="zip">
                            <Form.Label>ZIP Code</Form.Label>
                            <Form.Control onChange={onChangeHandler} type="text" name="zip" value={data.zip} />
                        </Form.Group>
                        <Row className="justify-content-end">
                            <Col xs="auto">
                                <Button variant="primary" type="submit">Continue</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Shipping