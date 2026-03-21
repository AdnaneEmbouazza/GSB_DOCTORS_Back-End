class AppError extends Error {
    constructor(
        message: string, 
        public statusCode: number) 
    {
        super(message);
        this.name = "AppError";
    }
};

class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, 404);
        this.name = "NotFoundError";
    }
};

class InternalServerError extends AppError {
    constructor(message: string) {
        super(message, 500);
        this.name = "InternalServerError";
    }
};

class BadRequestError extends AppError {
    constructor(message: string) {
        super(message, 400);
        this.name = "BadRequestError";
    }
};

class UnauthorizedError extends AppError {
    constructor(message: string) {
        super(message, 401);
        this.name = "UnauthorizedError";
    }
};

class ForbiddenError extends AppError {
    constructor(message: string) {
        super(message, 403);
        this.name = "ForbiddenError";
    }
};
