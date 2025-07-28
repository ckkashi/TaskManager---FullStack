import { Router } from "express";

import RequestDataValidator from '../middlewares/req-data-validator.middlware.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';

import {
    addCategoryController,
    editCategoryController,
    deleteCategoryController,
    getCategoryController
} from '../controllers/category.controller.js';

const categoryRouter = Router();

categoryRouter.post('/add', AuthMiddleware, addCategoryController);
categoryRouter.put('/edit/:id', AuthMiddleware, editCategoryController);

categoryRouter.get('/get', AuthMiddleware, getCategoryController);
categoryRouter.get('/get/:id', AuthMiddleware, getCategoryController);

categoryRouter.delete('/delete/:id', AuthMiddleware, deleteCategoryController);

export default categoryRouter;