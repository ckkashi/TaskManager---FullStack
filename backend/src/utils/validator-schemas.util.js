import Joi from "joi";

//ENUMS

const TaskStatus = {
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN_PROGRESS',
    ON_HOLD: 'ON_HOLD',
    COMPLETED: 'COMPLETED'
};

const TaskPriority = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH'
};


//SCHEMAS

//------------
//auth schemas
export const registerAuthSchema = Joi.object({
    displayName : Joi.string().min(3).max(30).required(),
    email : Joi.string().email().required(),
    password: Joi.string().min(8).max(100).required(),  
});

export const loginAuthSchema = Joi.object({
    email : Joi.string().email().required(),
    password: Joi.string().min(8).max(100).required(),  
});

//----------------
//category schemas
export const addCategorySchema = Joi.object({
    name : Joi.string().min(3).required(),
    description: Joi.string().min(10).max(100).required(),
});

export const editCategorySchema = Joi.object({
    name : Joi.string().min(3),
    description: Joi.string().min(10).max(100)
});

//------------
//task schemas
export const addTaskSchema = Joi.object({
    title : Joi.string().min(3).max(50).required(),
    description : Joi.string().min(3).max(150).required(),
    status: Joi.string().valid(TaskStatus.PENDING,TaskStatus.IN_PROGRESS,TaskStatus.ON_HOLD,TaskStatus.COMPLETED).required(),
    priority: Joi.string().valid(TaskPriority.LOW,TaskPriority.MEDIUM,TaskPriority.HIGH).required(),
    dueDate: Joi.date().iso(),
    categoryId: Joi.number()
});

export const editTaskSchema = Joi.object({
    title : Joi.string().min(3).max(50),
    description : Joi.string().min(3).max(150),
    status: Joi.string().valid(TaskStatus.PENDING,TaskStatus.IN_PROGRESS,TaskStatus.ON_HOLD,TaskStatus.COMPLETED),
    priority: Joi.string().valid(TaskPriority.LOW,TaskPriority.MEDIUM,TaskPriority.HIGH),
    dueDate: Joi.date().iso()
});
