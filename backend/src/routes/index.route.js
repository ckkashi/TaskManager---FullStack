import { Router } from "express";

import authRouter from "./auth.route.js";

const router = Router();

//injecting routes
router.use('/auth',authRouter);

export default router;