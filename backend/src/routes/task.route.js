import { Router } from "express";

import RequestDataValidator from '../middlewares/req-data-validator.middlware.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';

import { addTaskSchema, editTaskSchema } from "../utils/validator-schemas.util.js";

import { 
    addTaskController, 
    getTaskController, 
    editTaskController, 
    deleteTaskController,
    assignTaskController,
    getAssignTaskController,
    removeAssignTaskController
} from "../controllers/task.controller.js";

const taskRouter = Router();



//assign task routes
// add to assign - query parameters - http://localhost:5000/add/assign?taskId=2&assignedTo=5
taskRouter.put('/add/assign', AuthMiddleware, assignTaskController);
// get assign task
taskRouter.get('/get/assign', AuthMiddleware, getAssignTaskController);
// get specific assign task
taskRouter.get('/get/assign/:id', AuthMiddleware, getAssignTaskController);
// remove from assign - query parameters - http://localhost:5000/delete/assign?taskId=2
taskRouter.delete('/delete/assign', AuthMiddleware, removeAssignTaskController);



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


export default taskRouter;