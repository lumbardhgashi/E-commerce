import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';
export declare class RequestValidationError extends CustomError {
    errors: ValidationError[];
    statusCode: number;
    constructor(errors: ValidationError[]);
    serializeErrors(): {
        message: any;
        field: "alternative" | "alternative_grouped" | "unknown_fields" | "field";
    }[];
}
