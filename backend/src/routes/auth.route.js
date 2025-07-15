import { Router } from 'express';

import {
    registerController,
    loginController,
    logoutController,
    refreshTokenController,
} from '../controllers/auth.controller.js';

import RequestDataValidator from '../middlewares/req-data-validator.middlware.js';
import FileUploader from "../middlewares/file-uploader.middleware.js";
import { registerAuthSchema, loginAuthSchema } from '../utils/validator-schemas.util.js';

const authRouter = Router();

authRouter.post('/register', FileUploader.fields([
    {name: 'avatar', maxCount: 1}
]), RequestDataValidator(registerAuthSchema), registerController);
authRouter.post('/login', loginController);
authRouter.post('/logout', logoutController);
authRouter.put('/refreshToken', refreshTokenController);

export default authRouter;
