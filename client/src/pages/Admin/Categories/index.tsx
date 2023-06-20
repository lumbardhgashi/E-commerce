import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react'
import { Button, Col, Container, FormControl, FormGroup, FormLabel, Modal, Row, Table } from "react-bootstrap";
import { getCategories } from '../../../api/categories/getCategories';
import { ICategory } from '@aaecomm/common';
import { createCategory } from '../../../api/categories/createCategory';
import { updateCategory } from '../../../api/categories/updateCategory';
import { queryClient } from '../../../main';
import Loader from '../../../components/Loader';
import { deleteCategory } from '../../../api/categories/deleteCategory';
import { toast } from 'react-toastify';
import { useQueryString } from '../../../hooks/useQueryString';
import Paginate from '../../../components/Paginate/Paginate';

interface ICategoriesProps {
}


const Categories: React.FunctionComponent<ICategoriesProps> = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [category, setCategory] = useState<Pick<ICategory, "id" | "name">>({
        id: "",
        name: "",
    })


    const { data, refetch } = useQuery<any>(["categories/get"], () => getCategories(getQuery()), { refetchOnWindowFocus: false })
    const { filters, onFilterChange, getQuery } = useQueryString({
        load: refetch,
    });

    const { mutate: onAddCategoryHandler, isLoading: isAdding } = useMutation(createCategory, {
        onSuccess: async () => {
            await queryClient.refetchQueries(["categories/get"])
            toast.success('Category Created', {
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

    const { mutate: onEditCategoryHandler, isLoading: isEditing } = useMutation(updateCategory, {
        onSuccess: async () => {
            await queryClient.refetchQueries(["categories/get"])
            toast.success('Category edited', {
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

    const { mutate: onDeleteCategoryHandler, isLoading: isDeleting } = useMutation(deleteCategory, {
        onSuccess: async () => {
            await queryClient.refetchQueries(["categories/get"])
            toast.success('Category Deleted', {
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


    const handleSubmitModal = () => {
        setShowModal(true)
        !category.id ?
            onAddCategoryHandler({
                name: category.name!,
            })
            :
            onEditCategoryHandler({
                id: category.id,
                name: category.name!,
            })
    };

    const handleEditCategory = (category: ICategory) => {
        setShowModal(true);
        setCategory({
            id: category.id,
            name: category.name
        })
    }

    const onChangeHandler = (e: any) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value
        })
    }

    const handleDeleteCategory = (categoryId: string) => {
        onDeleteCategoryHandler(categoryId)
    };

    const createButtonHandler = () => {
        setCategory({
            id: "",
            name: ""
        })
        setShowModal(true)
    }
    if (isAdding || isEditing || isDeleting) {
        return <Loader />
    }
    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Category</h1>
                <Button variant="primary" onClick={createButtonHandler}>
                    Create Category
                </Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.categories?.map((category: ICategory) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>
                                <Button onClick={() => handleEditCategory(category)} variant="primary">Edit</Button>
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteCategory(category.id)}>
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
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Categories</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup className='mb-3'>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter product name"
                            name='name'
                            value={category.name}
                            onChange={onChangeHandler}
                        />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmitModal}>
                        {category.id ? "Update" : "Create"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};


export default Categories