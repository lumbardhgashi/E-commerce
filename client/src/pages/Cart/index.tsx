import { Button, Container, Table } from 'react-bootstrap';
import img from '../../assets/images/image.jpg'
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCart } from '../../api/cart/getCart';
import Loader from '../../components/Loader';
import { ICart } from '@aaecomm/common';
import { removeItemFromCart } from '../../api/cart/removeItemFromCart';
import { toast } from 'react-toastify';
import { addItemToCart } from '../../api/cart/addItemToCart';
import { queryClient } from '../../main';
import { Link, useNavigate } from 'react-router-dom';
export interface ICartProps {
}

export const Cart = (props: ICartProps) => {

    const navigate = useNavigate()

    const { data, isLoading, refetch, isRefetching } = useQuery<ICart>(["cart/get"], () => getCart(), { refetchOnWindowFocus: false })
    console.log(data, "cart");
    const { mutate: addItem, isLoading: isAdding } = useMutation(addItemToCart, {
        onSuccess: async () => {
            toast.success('Item added', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            await queryClient.refetchQueries(["cart/get"])
        },

    })
    const { mutate: removeItem, isLoading: isRemoving } = useMutation(removeItemFromCart, {
        onSuccess: async () => {
            toast.success('Item removed', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            await queryClient.refetchQueries(["cart/get"])
        },

    })

    const totalPrice = data?.cartItems?.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    if (isLoading) {
        return <Loader />
    }

    const onAddToCartHandler = (id: string) => {
        addItem(id);
    }
    const onRemoveFromCartHandler = (id: string) => {
        removeItem(id);
    }

    return (
        <Container className="cart-container">
            <h1 className="cart-heading">Your Cart</h1>
            {data?.cartItems?.length === 0 ? (
                <p className="cart-empty">Your cart is empty</p>
            ) : (
                <Table responsive className="cart-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.cartItems?.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <img src={`https://ecommerce.dev/api/images/${item.product.id}`} alt="Product" className="cart-product-image" />
                                </td>
                                <td>
                                    <p className="cart-product-name">{item.product.name}</p>
                                </td>
                                <td>{item.product.price}€</td>
                                <td>
                                    <div className="cart-quantity-control">
                                        <FaMinus className="cart-quantity-icon cart-quantity-minus" onClick={() => onRemoveFromCartHandler(item.product.id)} />
                                        <span className="cart-quantity-value">{item.quantity}</span>
                                        <FaPlus className="cart-quantity-icon cart-quantity-plus" onClick={() => onAddToCartHandler(item.product.id)} />
                                    </div>
                                </td>
                                <td>${item.product.price * item.quantity}</td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {data?.cartItems && data.cartItems.length > 0 && (
                <div className="cart-summary">
                    <div className="cart-summary-left">
                        <p>Subtotal ({data?.cartItems?.length} items):</p>
                        <p>Estimated Shipping:</p>
                        <h3>Total:</h3>
                    </div>
                    <div className="cart-summary-right">
                        <p>{totalPrice}€</p>
                        <p>Free</p>
                        <h3>{totalPrice}€</h3>
                    </div>
                </div>
            )}
            <Button onClick={() => navigate("/checkout")} variant="primary" className="cart-checkout-btn">
                Proceed to Checkout
            </Button>

        </Container>
    );
}
