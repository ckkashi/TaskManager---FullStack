class ApiError extends Error {
    constructor(status, message, errors = null) {
        super(message);
        this.status = status;
        this.message = message;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }

    static bad(message, errors = null) {
        return new ApiError(400, message, errors);
    }

    static unautorized(message, errors = null) {
        return new ApiError(401, message, errors);
    }

    static forbidden(message, errors = null) {
        return new ApiError(403, message, errors);
    }

    static notFound(message, errors = null) {
        return new ApiError(404, message, errors);
    }

    static internalServer(message, errors = null) {
        return new ApiError(500, message, errors);
    }

    toJSON() {
        return {
            success: false,
            status: this.status,
            message: this.message,
            errors: this.errors,
        };
    }
}

export default ApiError;
