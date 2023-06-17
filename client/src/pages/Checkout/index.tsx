import { useEffect, useState } from 'react'
import Shipping from './Shipping'
import { toast } from 'react-toastify'
import { ICart, ICartItem, IShippingDetails } from '@aaecomm/common'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getCart } from '../../api/cart/getCart'
import { createOrder } from '../../api/order/createOrder'
import { createPayment } from '../../api/payments/createPayment'
import PaymentPageWithStripe from './Payment'

export default function Checkout() {

    const navigate = useNavigate()
    const [secret,setSecret] = useState<string>("")
    const [orderId,setOrderId] = useState<string>("")

    const { data: cart } = useQuery<ICart>(["cart/get"], () => getCart(), { refetchOnWindowFocus: false })
    

    if(!cart || !(cart?.cartItems.length > 0)) {
        navigate('/')
    }

    const { mutate, isLoading } = useMutation(createOrder, {
        onSuccess(data) {
            toast.success('Order Created', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            mutatePayment({
                orderId: data.id
            })

        },
        onError(err: any) {
            err.response.data.errors.map((err: any) => {
                toast.error(err.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
        },
    })

    const { mutate: mutatePayment, isLoading: loadingPayment } = useMutation(createPayment, {
        onSuccess(data) {
            console.log(data, "success");
            setSecret(data.client_secret)
            setOrderId(data.orderId)
        },
        onError(err: any) {
            err.response.data.errors.map((err: any) => {
                toast.error(err.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
        },
    })


    const onSubmitHandler = async (data: IShippingDetails) => {
        const cartItems = cart?.cartItems.map((item: ICartItem) => {
            return {
                productId: item.product.id,
                quantity: item.quantity,
            };
        });

        mutate({
            cartItems,
            shippingDetails: data
        });
    };

    if(secret) {
        return <PaymentPageWithStripe secret={secret} orderId={orderId} />
    }


    return (
        <Shipping onSubmitHandler={onSubmitHandler} />
    )
}
