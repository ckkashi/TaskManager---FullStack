import ApiError from '../utils/api-error.util.js';

const errorHandler = (err, req, res, next) => {
    console.error('Error stack: ', err.stack);
    if (err instanceof ApiError) {
        return res.status(err.status).json(err.toJSON());
    }
    const genericError = ApiError.internalServer(
        err.message || 'Internal server error'
    );
    return res.status(genericError.status).json(genericError.toJSON());
};

export default errorHandler;
