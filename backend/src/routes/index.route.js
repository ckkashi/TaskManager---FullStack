import { Router } from 'express';

import authRouter from './auth.route.js';
import categoryRouter from './category.route.js';
import taskRouter from './task.route.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/category', categoryRouter);
router.use('/task', taskRouter);

export default router;
