import { Subjects } from "./subjects";
export interface ProductCreatedEvent {
    subject: Subjects.ProductCreated;
    data: {
        id: string;
        name: string;
        description: string;
        price: number;
        stock: number;
        version: number;
    };
}
