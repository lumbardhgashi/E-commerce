import { useState } from 'react'
import { Button, Container, FormControl, FormGroup, FormLabel, Modal, Table } from "react-bootstrap";

interface IProductsProps {
}


const Products: React.FunctionComponent<IProductsProps> = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState([
        { id: 1, name: "Product 1", category: "Category 1", price: 10, stock: 20 },
        { id: 2, name: "Product 2", category: "Category 2", price: 15, stock: 15 },
        { id: 3, name: "Product 3", category: "Category 1", price: 20, stock: 10 },
    ]);

    const handleAddProduct = () => {
        const newProduct = { id: Date.now(), name: "" };
    };

    const handleDeleteProduct = (productId: number) => {
        setProducts(products.filter((product: any) => product.id !== productId));
    };

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Products</h1>
                <Button variant="primary" onClick={() => setShowModal(true)}>
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
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{/* Render image here */}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>
                                <Button variant="primary">Edit</Button>
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

            {/* Create Product Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup className='mb-3'>
                        <FormLabel>Image</FormLabel>
                        <FormControl
                            type="file"
                            accept="image/*"
                        />
                    </FormGroup>
                    <FormGroup className='mb-3'>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter product name"
                        />
                    </FormGroup>
                    <FormGroup className='mb-3'>
                        <FormLabel>Product Description</FormLabel>
                        <FormControl
                            type="textarea"
                            placeholder="Enter product name"
                        />
                    </FormGroup>
                    <FormGroup className='mb-3'>
                        <FormLabel>Category</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter category"
                        />
                    </FormGroup>
                    <FormGroup className='mb-3'>
                        <FormLabel>Price</FormLabel>
                        <FormControl
                            type="number"
                            placeholder="Enter price"
                        />
                    </FormGroup>
                    <FormGroup className='mb-3'>
                        <FormLabel>Stock</FormLabel>
                        <FormControl
                            type="number"
                            placeholder="Enter stock"
                        />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddProduct}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};


export default Products