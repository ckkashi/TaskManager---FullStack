import jwt from 'jsonwebtoken';
import ApiError from '../utils/api-error.util.js';

const AuthMiddleware = async (req,res,next) => {
    const accessToken = req.cookies.access_token || req.headers['authorization']?.split(' ')?.[1];
    if (!accessToken) {
        throw ApiError.unautorized('Unauthorized');
    }
    const decodedToken = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
    if(!decodedToken){
        throw ApiError.unautorized('Unauthorized');
    }
    req.user = decodedToken;
    next();
};

export default AuthMiddleware;