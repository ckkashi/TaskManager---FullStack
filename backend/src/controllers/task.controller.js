import asyncHandler from "../helpers/async-handler.js";
import ApiError from "../utils/api-error.util.js";
import ApiResponse from "../utils/api-response.util.js";

import db from "../configs/db.js";

const getCurrentUserID = (req) => {
    const userId = req.user.id;
    if(!userId){
        throw ApiError.notFound("Current User ID not found");
    }
    return userId;
}




//
// --------------- Add Task Controller - START ---------------
const addTaskController = asyncHandler(async (req,res)=>{
    const parentTaskId = +req.params.id;
    const userId = getCurrentUserID(req);
    if(!req.body){
        throw ApiError.bad("Something went wrong");
    }
    const task = {...req.body};
    task.createdById = userId;
    task.categoryId = task.categoryId ? task.categoryId : 1;
    if(parentTaskId){
        const parentTask = await db.task.findUnique({
            where: {id: parentTaskId}
        });
        if(!parentTask){
            throw ApiError.notFound('Parent task not found');
        }
        task.parentTaskId = parentTaskId;
        task.categoryId = parentTask.categoryId;
    }
    const newNote = await db.task.create({
        data: {
            ...task
        }
    });
    
    res.status(201).json(new ApiResponse(201,'Task created successfully',newNote));
});
// --------------- Add Task Controller - END ---------------
//




//
// --------------- EDIT Task Controller - START ---------------
const editTaskController = asyncHandler(async (req,res)=>{
    const userId = getCurrentUserID(req);
    const taskId = +req.params.id;
    if(!taskId){
        throw ApiError.notFound('Task not found');
    }
    if(!req.body){
        throw ApiError.bad('Something went wrong - data will be missing');
    }
    const updatedTask = await db.task.update({
        where: {id: taskId},
        data: {
            ...req.body
        }
    });
    res.status(200).json(new ApiResponse(200, 'Task updated successfully', updatedTask));
});
// --------------- EDIT Task Controller - END ---------------
//




//
// --------------- GET Task Controller - START ---------------
const getTaskController = asyncHandler(async (req,res)=>{
    const userId = getCurrentUserID(req);
    const taskId = +req.params.id;
    let message = ``;
    let data = [];

    if(!taskId){
        //return all tasks of specific user
        message = `Successfully fetch all tasks`;
        const tasksList =  await db.task.findMany({
            where: { createdById: userId, parentTaskId: null }
        });
        data = tasksList;
    }else{
        //return task against id
        message = `Successfully fetch task with id: ${taskId}`;
        const specificTask =  await db.task.findFirst({
            where: { id: taskId, createdById: userId },
            include: {
                subTasks : true
            }
        });
        if(!specificTask){
            throw ApiError.notFound(`Task not found with ID: ${id}`);
        }
        data = specificTask;
    }
    
    res.status(200).json(new ApiResponse(200, message, data));
});
// --------------- GET Task Controller - END ---------------
//




//
// --------------- DELETE Task Controller - START ---------------
const deleteTaskController = asyncHandler(async (req,res)=>{
    const userId = getCurrentUserID(req);

    const taskId = +req.params.id;
    if(!taskId){
        throw ApiError.notFound("ID not found");
    }

    const deletedTask = await db.task.delete({
        where: {
            id: taskId,
            createdById : userId
        }
    });
    if(!deletedTask){
        throw ApiError.bad("Something went wrong");
    }
    const message = `Task deleted successfully.`;
    res.status(200).json(new ApiResponse(200,message));
});
// --------------- DELETE Task Controller - END ---------------
//




//
// --------------- ASSIGN Task Controller - START ---------------
const assignTaskController = asyncHandler(async (req,res)=>{
    const userId = getCurrentUserID(req);

    const taskId = +req.query.taskId;
    const assignToId = +req.query.assignedTo;
    if(!taskId && !assignToId){
        throw ApiError.notFound("Task not found");
    }

    const assigneddTask = await db.task.update({
        where: {
            id: taskId,
            createdById : userId
        },
        data: {
            assignedToId: assignToId
        }
    });
    if(!assigneddTask){
        throw ApiError.bad("Something went wrong");
    }
    const message = `Task assigned successfully.`;
    res.status(200).json(new ApiResponse(200,message));
});
// --------------- ASSIGN Task Controller - END ---------------
//




//
// --------------- GET ASSIGN Task Controller - START ---------------
const getAssignTaskController = asyncHandler(async (req,res)=>{
    const userId = getCurrentUserID(req);
    const taskId = +req.params.id;
    let message = '';
    let data = [];
    if(!taskId){
        //get all assigned task
        const assignedTasksList = await db.task.findMany({
            where: { 
                assignedToId: userId,
                parentTaskId: null
            }
        });
        data = assignedTasksList;
        message = `Assigned task fetch successfully`;
    } else{
        //get specific assigned task
        const assignedTasksList = await db.task.findFirst({
            where: {
                id: taskId,
                assignedToId: userId
            }
        });
        data = assignedTasksList;
        message = `Assigned task fetch successfully against id: ${taskId}`;
    }
    res.status(200).json(new ApiResponse(200, message, data));
});
// --------------- GET ASSIGN Task Controller - END ---------------
//



export {
    addTaskController,
    editTaskController,
    getTaskController,
    deleteTaskController,
    assignTaskController,
    getAssignTaskController
};