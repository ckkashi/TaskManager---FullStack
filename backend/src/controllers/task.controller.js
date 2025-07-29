import asyncHandler from "../helpers/async-handler.js";
import ApiError from "../utils/api-error.util.js";
import ApiResponse from "../utils/api-response.util.js";

import db from "../configs/db.js";



//
// --------------- Add Task Controller - START ---------------
const addTaskController = asyncHandler(async (req,res)=>{});
// --------------- Add Task Controller - END ---------------
//



//
// --------------- EDIT Task Controller - START ---------------
const editTaskController = asyncHandler(async (req,res)=>{});
// --------------- EDIT Task Controller - END ---------------
//



//
// --------------- GET Task Controller - START ---------------
const getTaskController = asyncHandler(async (req,res)=>{});
// --------------- GET Task Controller - END ---------------
//



//
// --------------- DELETE Task Controller - START ---------------
const deleteTaskController = asyncHandler(async (req,res)=>{});
// --------------- DELETE Task Controller - END ---------------
//



export {
    addTaskController,
    editTaskController,
    getTaskController,
    deleteTaskController
};