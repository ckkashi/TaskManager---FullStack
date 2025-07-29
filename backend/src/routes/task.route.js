import { Router } from "express";

import RequestDataValidator from '../middlewares/req-data-validator.middlware.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';

const taskRouter = Router();

// task and sub task add
taskRouter.post('/add', AuthMiddleware, ()=>{});
taskRouter.post('/add/:id', AuthMiddleware, ()=>{});
// task and sub task edit
taskRouter.put('/edit/:id', AuthMiddleware, ()=>{});
// task and sub task get
taskRouter.get('/get', AuthMiddleware, ()=>{});
taskRouter.get('/get/:id', AuthMiddleware, ()=>{});
// task and sub task delete
taskRouter.delete('/delete/:id', AuthMiddleware, ()=>{});

export default taskRouter;