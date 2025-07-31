import { Router } from "express";

import RequestDataValidator from '../middlewares/req-data-validator.middlware.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';

import { addTaskSchema, editTaskSchema } from "../utils/validator-schemas.util.js";

import { 
    addTaskController, 
    getTaskController, 
    editTaskController, 
    deleteTaskController 
} from "../controllers/task.controller.js";

const taskRouter = Router();

// task and sub task add
taskRouter.post('/add', AuthMiddleware, RequestDataValidator(addTaskSchema), addTaskController);
taskRouter.post('/add/:id', AuthMiddleware, RequestDataValidator(addTaskSchema), addTaskController);
// task and sub task edit
taskRouter.put('/edit/:id', AuthMiddleware, RequestDataValidator(editTaskSchema), editTaskController);
// task and sub task get
taskRouter.get('/get', AuthMiddleware, getTaskController);
taskRouter.get('/get/:id', AuthMiddleware, getTaskController);
// task and sub task delete
taskRouter.delete('/delete/:id', AuthMiddleware, deleteTaskController);

//assign task routes
// add to assign - query parameters - http://localhost:5000/add/assign?taskId=2&assignedTo=5
taskRouter.put('/add/assign', AuthMiddleware, ()=>{});
// get assign task
taskRouter.put('/get/assign', AuthMiddleware, ()=>{});
// get specific assign task
taskRouter.put('/get/assign/:id', AuthMiddleware, ()=>{});

export default taskRouter;