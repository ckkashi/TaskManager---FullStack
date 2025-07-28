import { Router } from 'express';

import authRouter from './auth.route.js';
import categoryRouter from './category.route.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/category', categoryRouter);

export default router;
