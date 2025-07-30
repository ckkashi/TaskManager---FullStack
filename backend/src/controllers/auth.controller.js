import asyncHandler from '../helpers/async-handler.js';
import ApiError from '../utils/api-error.util.js';
import ApiResponse from '../utils/api-response.util.js';
import { hashPassword, verifyPassword } from "../utils/password.util.js";
import { generateBothTokens } from '../utils/jwt.util.js';
import db from '../configs/db.js';

//cookie options
const cookieOptions = {
    httpOnly: true,
    secure: true,
};



//
// --------------- Register Controller - START ---------------
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
        throw ApiError.bad('User with this email already exists');
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
            avatar: avatar.filename,
            categories: {
                create: {
                    name: 'general',
                    description: 'for general tasks'
                }
            }
        }
    });
    if(!createdUser){
        throw ApiError.bad('Something went wrong');
    }

    delete createdUser.password;
    res.status(201).json(new ApiResponse(200, 'User registered successfully', createdUser));
});
// --------------- Register Controller - END ---------------
//





//
// --------------- Login Controller - START ---------------
const loginController = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const findUser = await db.user.findFirst({
        where: {email}
    });
    if(!findUser){
        throw ApiError.bad('Invalid credentials');
    }
    const matchPassword = await verifyPassword(password, findUser.password);
    if(!matchPassword){
        throw ApiError.bad('Invalid credentials');
    }
    delete findUser.password;
    delete findUser.refreshToken;

    const { accessToken, refreshToken } = generateBothTokens(findUser);

    const refreshTokenUpdated = await db.user.update({
        where: {
            id: findUser.id
        },
        data: {
            refreshToken: refreshToken
        }
    });

    if (!refreshTokenUpdated) {
        throw ApiError.bad('Something went wrong');
    }
    
    res.cookie('access_token', accessToken, cookieOptions);
    res.cookie('refresh_token', refreshToken, cookieOptions);

    const response = {
        accessToken,
        refreshToken,
        user: findUser
    }

    res.status(200).json(new ApiResponse(200, 'User loggedin successfully', response));
});
// --------------- Login Controller - END ---------------
//





//
// --------------- Logout Controller - START ---------------
const logoutController = asyncHandler(async (req, res) => {
    const {id} = req.user;
    const refreshTokenDeleted = await db.user.update({
        where: {
            id: id
        },
        data: {
            refreshToken: null
        }
    });

    if(!refreshTokenDeleted){
        throw ApiError.internalServer("Something went wrong")
    }

    res.clearCookie('access_token',cookieOptions);
    res.clearCookie('refresh_token',cookieOptions);
    res.status(200).json(new ApiResponse(200, 'User loggedout successfully', {}));
});
// --------------- Logout Controller - END ---------------
//





//
// --------------- Refresh Token Controller - START ---------------
const refreshTokenController = asyncHandler(async (req, res) => {
    const currentRefreshToken = req.cookies.refresh_token;
    if(!currentRefreshToken){
        throw ApiError.unautorized('Unauthorized');
    }
    const findUser = await db.user.findFirst({
        where: { refreshToken: currentRefreshToken }
    });
    if(!findUser){
        throw ApiError.unautorized('Unauthorized');
    }

    delete findUser.password;
    delete findUser.refreshToken;

    const { accessToken, refreshToken } = generateBothTokens(findUser);

    const refreshTokenUpdated = await db.user.update({
        where: {
            id: findUser.id
        },
        data: {
            refreshToken: refreshToken
        }
    });

    if (!refreshTokenUpdated) {
        throw ApiError.bad('Something went wrong');
    }
    
    res.cookie('access_token', accessToken, cookieOptions);
    res.cookie('refresh_token', refreshToken, cookieOptions);

    const response = {
        accessToken,
        refreshToken
    }
    res.status(200).json(new ApiResponse(200, 'Token refresh successfully', response));
});
// --------------- Refresh Token Controller - END ---------------
//




export {
    registerController,
    loginController,
    logoutController,
    refreshTokenController
};
