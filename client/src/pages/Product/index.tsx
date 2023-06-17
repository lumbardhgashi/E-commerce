import { useMutation, useQuery } from '@tanstack/react-query';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../api/products/getProduct';
import Loader from '../../components/Loader';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { getCart } from '../../api/cart/getCart';
import { ICart, IProduct } from '@aaecomm/common';
import { toast } from 'react-toastify';
import { addItemToCart } from '../../api/cart/addItemToCart';
import { removeItemFromCart } from '../../api/cart/removeItemFromCart';
import { queryClient } from '../../main';

const ProductDetails = () => {

    const { productId } = useParams();
    const { data: product, isLoading, isRefetching } = useQuery<IProduct>(["product/get"], () => getProduct(productId!), {
    })
    const { data: cart } = useQuery<ICart>(["cart/get"], () => getCart(), { refetchOnWindowFocus: false })
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

    const productInCart = cart?.cartItems.find(cartItem => cartItem.product.id === productId)

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


    const onAddToCartHandler = (id: string) => {
        addItem(id);
    }
    const onRemoveFromCartHandler = (id: string) => {
        removeItem(id);
    }

    if (isLoading || isRefetching) {
        return <Loader />
    }
    return (
        <Container>
            <Row>
                <Col xs={6}>
                    <Card.Img
                        src={`https://ecommerce.dev/api/images/${productId}`}
                        className="product-image"
                        alt={product!.name}
                    />
                </Col>
                <Col xs={6}>
                    <h3 className="product-name">{product!.name}</h3>
                    <hr className="divider" />
                    <h4 className="product-price">${product!.price}</h4>
                    <Table>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{product!.name}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>{product!.description}</td>
                            </tr>
                            <tr>
                                <td>Category</td>
                                <td>{product!.category.name}</td>
                            </tr>
                            <tr>
                                <td>Quantity in stock</td>
                                <td>{product!.stock}</td>
                            </tr>
                            {cart && <tr>
                                <td>Quantity in Cart</td>
                                <td>
                                    <Row>
                                        <Col className="quantity-controls">
                                            <div className="quantity-action" onClick={() => onRemoveFromCartHandler(productId!)}>
                                                <FaMinus className="minus-icon" />
                                            </div>
                                            <span className="quantity-text">{productInCart?.quantity || 0}</span>
                                            <div className="quantity-action" onClick={() => onAddToCartHandler(productId!)}>
                                                <FaPlus className="plus-icon" />
                                            </div>
                                        </Col>
                                    </Row>
                                </td>
                            </tr>}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetails;