import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react'
import { Button, Card, Col, Container, FormControl, FormGroup, FormLabel, Modal, Row, Table } from "react-bootstrap";
import { getCategories } from '../../../api/categories/getCategories';
import { getProducts } from '../../../api/products/getProducts';
import { useQueryString } from '../../../hooks/useQueryString';
import { ICategory, IProduct } from '@aaecomm/common';
import { createProduct } from '../../../api/products/createProduct';
import { updateProduct } from '../../../api/products/updateProduct';
import { deleteProduct } from '../../../api/products/deleteProduct';
import { queryClient } from '../../../main';
import { toast } from 'react-toastify';
import Loader from '../../../components/Loader';
import Paginate from '../../../components/Paginate/Paginate';
import FileInput from '../../../components/FileUpload';

interface IProductsProps {
}


const Products: React.FunctionComponent<IProductsProps> = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [product, setProduct] = useState<any>({
        id: "",
        name: "",
        categoryId: "",
        description: "",
        image: "",
        price: 0,
        stock: 0,
    });

    const { data, isLoading, refetch, isRefetching } = useQuery<any>(["products/get"], () => getProducts(getQuery()), {
        refetchOnWindowFocus: false,

    })
    const { data: categories } = useQuery<any>(["categories/get"], () => getCategories("?page=1&pageSize=999"), { refetchOnWindowFocus: false })
    console.log(data);

    const { mutate: onAddProductHandler, isLoading: isAdding } = useMutation(createProduct, {
        onSuccess: async () => {
            await queryClient.refetchQueries(["products/get"])
            toast.success('Product Created', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setShowModal(false);

        },
        onError(error, variables, context) {
            console.log(error, variables, context);
        },
    })

    const { mutate: onEditProductHandler, isLoading: isEditing } = useMutation(updateProduct, {
        onSuccess: async () => {
            await queryClient.refetchQueries(["products/get"])
            toast.success('Product edited', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setShowModal(false);
        },
        onError(error, variables, context) {
            console.log(error, variables, context);
        },
    })

    const { mutate: onDeleteProductHandler, isLoading: isDeleting } = useMutation(deleteProduct, {
        onSuccess: async () => {
            await queryClient.refetchQueries(["products/get"])
            toast.success('Product Deleted', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        },
        onError(error, variables, context) {
            console.log(error, variables, context);
        },
    })

    const { filters, onFilterChange, getQuery } = useQueryString({
        load: refetch,
    });

    const handleSubmitModal = () => {
        setShowModal(true)
        !product.id ?
            onAddProductHandler({
                name: product.name!,
            })
            :
            onEditProductHandler({
                id: product.id,
                name: product.name!,
            })
    };

    const handleEditProduct = (product: any) => {
        setShowModal(true);
        setProduct({
            id: product.id,
            name: product.name,
            categoryId: product.categoryId,
            description: product.description,
            image: `https://ecommerce.dev/api/images/${product.image}`,
            price: product.price,
            stock: product.stock
        })
    }

    const onChangeHandler = (e: any) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    const handleDeleteProduct = (productId: string) => {
        onDeleteProductHandler(productId)
    };

    const handleImageChangeHandler = (e: any) => {
        const file = e.target.value; // Get the selected file
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProduct(({
                    ...product,
                    image: reader.result, // Update the image value with the file content
                }));
            };
            reader.readAsDataURL(file); // Read the file as data URL
        } else {
            setProduct({
                ...product,
                image: null, // Reset the image value if no file is selected
            });
        }

    }

    const createButtonHandler = () => {
        setProduct({
            id: "",
            name: "",
            categoryId: "",
            description: "",
            image: "",
            price: 0,
            stock: 0,
        })
        setShowModal(true)
    }
    if (isAdding || isEditing || isDeleting) {
        return <Loader />
    }
    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Products</h1>
                <Button variant="primary" onClick={createButtonHandler}>
                    Create Product
                </Button>
            </div>



            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.products?.map((product: IProduct) => (
                        <tr key={product.id}>
                            <td><div style={{ position: 'relative', maxHeight: '5rem', maxWidth: "5rem", overflow: 'hidden' }}>

                                <Card.Img
                                    variant="top"
                                    src={`https://ecommerce.dev/api/images/${product.id}`}
                                    alt={product?.name}
                                    style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }}
                                />
                            </div></td>
                            <td>{product.name}</td>
                            <td>{product.category.name}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>
                                <Button onClick={() => handleEditProduct(product)} variant="primary">Edit</Button>
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Row className="justify-content-center mt-3">
                <Col xs={12} md={6}>
                    {data && (
                        <Paginate
                            onPageChange={(event) =>
                                onFilterChange({ name: "page", value: (event.selected + 1).toString() })
                            }
                            {...(data?.metadata || {})}
                            total={data.metadata.totalProducts}
                            pageCount={data.metadata.totalPages}
                        />
                    )}
                </Col>
            </Row>

            {/* Create Product Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup className='mb-3'>
                        <FormLabel>Image</FormLabel>
                        <FileInput
                            label=''
                            type="file"
                            accept="image/*"
                            value={product.image || undefined}
                            name='image'
                            onChange={handleImageChangeHandler}
                        />
                    </FormGroup>
                    <FormGroup className='mb-3'>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter product name"
                            value={product.name}
                            name='name'
                            onChange={onChangeHandler}
                        />
                    </FormGroup>
                    <FormGroup className='mb-3'>
                        <FormLabel>Product Description</FormLabel>
                        <FormControl
                            type="textarea"
                            placeholder="Enter product name"
                            value={product.description}
                            name='description'
                            onChange={onChangeHandler}
                        />
                    </FormGroup>
                    <FormLabel>Category</FormLabel>

                    <FormControl
                        as="select"
                        value={product.categoryId}
                        name='categoryId'
                        onChange={onChangeHandler}
                    >
                        <option value="">All Categories</option>
                        {categories?.categories.map((category: ICategory) =>
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )}

                    </FormControl>
                    <FormGroup className='mb-3'>
                        <FormLabel>Price</FormLabel>
                        <FormControl
                            type="number"
                            placeholder="Enter price"
                            value={product.price}
                            name='price'
                            onChange={onChangeHandler}
                        />
                    </FormGroup>
                    <FormGroup className='mb-3'>
                        <FormLabel>Stock</FormLabel>
                        <FormControl
                            type="number"
                            placeholder="Enter stock"
                            value={product.stock}
                            name='stock'
                            onChange={onChangeHandler}
                        />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmitModal}>
                        {product.id ? "Update" : "Create"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};


export default Products