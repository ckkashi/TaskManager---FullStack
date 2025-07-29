import { Router } from "express";

import RequestDataValidator from '../middlewares/req-data-validator.middlware.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';

import { addCategorySchema, editCategorySchema } from "../utils/validator-schemas.util.js";

import {
    addCategoryController,
    editCategoryController,
    deleteCategoryController,
    getCategoryController
} from '../controllers/category.controller.js';

const categoryRouter = Router();

//add and update
categoryRouter.post('/add', AuthMiddleware, RequestDataValidator(addCategorySchema), addCategoryController);
categoryRouter.put('/edit/:id', AuthMiddleware, RequestDataValidator(editCategorySchema), editCategoryController);
//get
categoryRouter.get('/get', AuthMiddleware, getCategoryController);
categoryRouter.get('/get/:id', AuthMiddleware, getCategoryController);
//delete
categoryRouter.delete('/delete/:id', AuthMiddleware, deleteCategoryController);

export default categoryRouter;