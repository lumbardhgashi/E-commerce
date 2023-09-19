import { useMutation, useQuery } from "@tanstack/react-query";
import { createSpecializimi } from "../../api/specializimet/createSpcializimin";
import { updateSpecializimi } from "../../api/specializimet/updateSpecializimi";
import { deleteSpecializimi } from "../../api/specializimet/deleteSpecializimi";
import { getSpecializimet } from "../../api/specializimet/getSpecializimet";
import { queryClient } from "../../main";
import { toast } from "react-toastify";
import { createSemundja } from "../../api/semundjet/createSemundja";
import { updateSemundja } from "../../api/semundjet/updateSemundjet";
import { deleteSemundja } from "../../api/semundjet/deleteSemundja";
import { Form } from "react-router-dom";
import { Button, Card, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useState } from "react";
import { getSemundjet } from "../../api/semundjet/getSemundjet";

interface IProps {

}

const Specializimet: React.FC<IProps> = () => {

    const [semundja, setSemundja] = useState({
        id: "",
        name: "",
        specializimiId: "",
    })
    const [specializimi, setSpecializimi] = useState({
        id: "",
        name: "",
    })

    const { data: specializimet } = useQuery<any>(["spcializimi/get"], () => getSpecializimet(), { refetchOnWindowFocus: false })

    const { mutate: onAddSpecializimiHandler } = useMutation(createSpecializimi, {
        onSuccess: async () => {
            await queryClient.refetchQueries(["spcializimi/get"])


        },
        onError(error, variables, context) {
            console.log(error, variables, context);
        },
    })

    const { mutate: onEditSpecializimiHandler } = useMutation(updateSpecializimi, {
        onSuccess: async () => {
            await queryClient.refetchQueries(["spcializimi/get"])

        },
        onError(error, variables, context) {
            console.log(error, variables, context);
        },
    })

    const { mutate: onDeleteSpecializimiHandler } = useMutation(deleteSpecializimi, {
        onSuccess: async () => {
            await queryClient.refetchQueries(["spcializimi/get"])
            await queryClient.refetchQueries(["semundja/get"])

        },
        onError(error, variables, context) {
            console.log(error, variables, context);
        },
    })

    const { data: semundjet } = useQuery<any>(["semundja/get"], () => getSemundjet(), { refetchOnWindowFocus: false })

    const { mutate: onAddSemundjaHandler } = useMutation(createSemundja, {
        onSuccess: async () => {
            await queryClient.refetchQueries(["semundja/get"])


        },
        onError(error, variables, context) {
            console.log(error, variables, context);
        },
    })

    const { mutate: onEditSemundjaHandler } = useMutation(updateSemundja, {
        onSuccess: async () => {
            await queryClient.refetchQueries(["semundja/get"])

        },
        onError(error, variables, context) {
            console.log(error, variables, context);
        },
    })

    const { mutate: onDeleteSemundjaHandler } = useMutation(deleteSemundja, {
        onSuccess: async () => {
            await queryClient.refetchQueries(["semundja/get"])

        },
        onError(error, variables, context) {
            console.log(error, variables, context);
        },
    })

    const onInputChangeHandler = (e: any) => {
        setSpecializimi({
            ...specializimi,
            [e.target.name]: e.target.value
        })
    }

    const onInputChangeHandlerSemundja = (e: any) => {
        console.log({ e }, "eventi");
        setSemundja({
            ...semundja,
            [e.target.name]: e.target.value
        })
    }


    const handleEditSpecializimi = (specializimi: any) => {
        setSpecializimi({
            id: specializimi.id,
            name: specializimi.name
        })
    }

    const handleDeleteSpecializimi = (id: string) => {
        onDeleteSpecializimiHandler(id)
    }

    const onSubmitSpecializimi = () => {
        specializimi.id ? onEditSpecializimiHandler(specializimi) : onAddSpecializimiHandler({
            name: specializimi.name
        })
    }

    const handleEditSemundja = (semundja: any) => {
        setSemundja({
            id: semundja.id,
            name: semundja.name,
            specializimiId: semundja.specializimiId.id
        })
    }

    const handleDeleteSemundja = (id: string) => {
        onDeleteSemundjaHandler(id)
    }

    const onSubmitSemundja = () => {
        semundja.id ? onEditSemundjaHandler(semundja) : onAddSemundjaHandler({
            name: semundja.name,
            specializimiId: semundja.specializimiId
        })
    }

    const reset = () => {
        setSemundja({
            id: "",
            name: "",
            specializimiId: "",
        })
        setSpecializimi({
            id: "",
            name: "",
        })
    }

    console.log(semundjet);
    return (
        <>
            <Button variant="primary" type="submit" onClick={reset}>
                Reset
            </Button>

            <div>
                <h2>Create Specializimi</h2>
                <Form >
                    <FormGroup controlId="formSpecializimiName">
                        <FormLabel>Name</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter name"
                            name="name"
                            value={specializimi.name}
                            onChange={onInputChangeHandler}
                        />
                    </FormGroup>
                    <Button variant="primary" type="submit" onClick={onSubmitSpecializimi}>
                        {specializimi.id ? "Update" : "Create"} Specializimi
                    </Button>
                </Form>

                <h2>Create Semundja</h2>
                <Form>
                    <FormGroup controlId="formSemundjaName">
                        <FormLabel>Name</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter name"
                            name="name"
                            value={semundja.name}
                            onChange={onInputChangeHandlerSemundja}
                        />
                    </FormGroup>
                    <FormGroup controlId="formSpecializimiId">
                        <FormLabel>Specializimi</FormLabel>
                        <FormControl
                            as="select"
                            name="specializimiId"
                            value={semundja.specializimiId}
                            onChange={onInputChangeHandlerSemundja}
                        >
                            <option value="">Select Specializimi</option>
                            {specializimet?.map((specializimi: any) => (
                                <option key={specializimi.id} value={specializimi.id}>
                                    {specializimi.name}
                                </option>
                            ))}
                        </FormControl>
                    </FormGroup>
                    <Button variant="primary" type="submit" onClick={onSubmitSemundja}>
                        {semundja.id ? "Update" : "Create"} Semundja
                    </Button>
                </Form>
                {specializimet?.map((specializimi: any) => (
                    <Card style={{ width: "18rem" }}>
                        <Card.Body>
                            <Card.Title>{specializimi.name}</Card.Title>
                            <Button variant="primary" onClick={() => handleEditSpecializimi(specializimi)}>
                                Edit
                            </Button>{" "}
                            <Button variant="danger" onClick={() => handleDeleteSpecializimi(specializimi.id)}>
                                Delete
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
                {semundjet?.map((semundja: any) => (
                    <Card style={{ width: "18rem" }}>
                        <Card.Body>
                            <Card.Title>{semundja.name}</Card.Title>
                            <Card.Title>{semundja.specializimiId?.name || ""}</Card.Title>
                            <Button variant="primary" onClick={() => handleEditSemundja(semundja)}>
                                Edit
                            </Button>{" "}
                            <Button variant="danger" onClick={() => handleDeleteSemundja(semundja.id)}>
                                Delete
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default Specializimet
