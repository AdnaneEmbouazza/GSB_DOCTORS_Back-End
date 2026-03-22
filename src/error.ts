export class AppError extends Error {
    constructor(
        message: string, 
        public statusCode: number) 
    {
        super(message);
        this.name = "AppError";
    }
};

export class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, 404);
        this.name = "NotFoundError";
    }
};

export class InternalServerError extends AppError {
    constructor(message: string) {
        super(message, 500);
        this.name = "InternalServerError";
    }
};

export class BadRequestError extends AppError {
    constructor(message: string) {
        super(message, 400);
        this.name = "BadRequestError";
    }
};

export class UnauthorizedError extends AppError {
    constructor(message: string) {
        super(message, 401);
        this.name = "UnauthorizedError";
    }
};

export class ForbiddenError extends AppError {
    constructor(message: string) {
        super(message, 403);
        this.name = "ForbiddenError";
    }
};
