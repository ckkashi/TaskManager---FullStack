import asyncHandler from '../helpers/async-handler.js';
import ApiError from '../utils/api-error.util.js';
import ApiResponse from '../utils/api-response.util.js';

import db from '../configs/db.js';

const registerController = asyncHandler(async (req, res) => {
    res.status(201).json(new ApiResponse(200, 'User registered successfully', {}));
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
