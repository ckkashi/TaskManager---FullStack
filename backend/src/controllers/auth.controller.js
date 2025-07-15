import asyncHandler from '../helpers/async-handler.js';
import ApiError from '../utils/api-error.util.js';
import ApiResponse from '../utils/api-response.util.js';
import { hashPassword, verifyPassword } from "../utils/password.util.js";

import db from '../configs/db.js';

const registerController = asyncHandler(async (req, res) => {
    const avatar = req.files?.avatar?.[0];
    if(!avatar){
        throw ApiError.bad('Avatar is required');
    }
    const {displayName, email, password} = req.body;
    const checkExistingUser = await db.user.findFirst({
        where: { email }
    });
    if(checkExistingUser){
        throw ApiError.notFound('Invalid email or password');
    }
    const encryptedPass = await hashPassword(password);
    if(!encryptedPass){
        throw ApiError.bad('Something went wrong');
    }
    const createdUser = await db.user.create({
        data: {
            displayName,
            email,
            password: encryptedPass,
            avatar: avatar.filename
        },
    });
    delete createdUser.password;
    if(!createdUser){
        throw ApiError.bad('Something went wrong');
    }
    res.status(201).json(new ApiResponse(200, 'User registered successfully', createdUser));
});

const loginController = asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(200, 'User loggedin successfully', {}));
});

const logoutController = asyncHandler(async (req, res) => {
    res.status(201).json(new ApiResponse(200, 'User loggedout successfully', {}));
});

const refreshTokenController = asyncHandler(async (req, res) => {
    res.status(201).json(new ApiResponse(200, 'Token refresh successfully', {}));
});

export {
    registerController,
    loginController,
    logoutController,
    refreshTokenController,
};
