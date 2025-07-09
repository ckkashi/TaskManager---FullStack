import Joi from 'joi';
import ApiError from '../utils/api-error.util.js';

const RequestDataValidator = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);
        if (error) {
            throw ApiError.bad(error.details[0].message);
        }
        next();
    };
};

export default RequestDataValidator;
