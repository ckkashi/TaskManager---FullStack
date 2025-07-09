import { Router } from 'express';

import {
    registerController,
    loginController,
    logoutController,
    refreshTokenController,
} from '../controllers/auth.controller.js';

import RequestDataValidator from '../middlewares/req-data-validator.middlware.js';
import { registerAuthSchema, loginAuthSchema } from '../utils/validator-schemas.util.js';

const authRouter = Router();

authRouter.post('/register', RequestDataValidator(registerAuthSchema), registerController);
authRouter.post('/login', loginController);
authRouter.post('/logout', logoutController);
authRouter.put('/refreshToken', refreshTokenController);

export default authRouter;
