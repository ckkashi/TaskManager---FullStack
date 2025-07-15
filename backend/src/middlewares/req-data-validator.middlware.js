import Joi from 'joi';
import ApiError from '../utils/api-error.util.js';

const RequestDataValidator = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], { abortEarly: false });
        console.log(req[property], '\nValidation Error:', error);

        if (error) {
            return next(ApiError.bad(error.details[0].message));
        }
        next();
    };
};

export default RequestDataValidator;
