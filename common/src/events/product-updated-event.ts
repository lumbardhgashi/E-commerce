import { Subjects } from "./subjects";
export interface ProductUpdatedEvent {
  subject: Subjects.ProductUpdated;
  data: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number
    version: number;
  };
}
