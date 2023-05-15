import { Subjects } from "./subjects";
export interface ProductDeletedEvent {
    subject: Subjects.ProductDeleted;
    data: {
        id: string;
        version: number;
    };
}
