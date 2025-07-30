import asyncHandler from '../helpers/async-handler.js';
import ApiError from '../utils/api-error.util.js';
import ApiResponse from '../utils/api-response.util.js';

import db from '../configs/db.js';

const getCurrentUserID = (req) => {
    const userId = req.user.id;
    if(!userId){
        throw ApiError.notFound("Current User ID not found");
    }
    return userId;
}

//
// --------------- Add Category Controller - START ---------------
const addCategoryController = asyncHandler(async (req,res) => {
    if(!req.body){
        throw ApiError.notFound("Name and description missing");
    }
    //fetching user id for user specific operations
    const userId = getCurrentUserID(req);
    let {name, description} = req.body;
    name = name.toLowerCase();
    const existingCategory =  await db.categories.findFirst({
        where: { name: name, userId: userId }
    });
    if(existingCategory){
        throw ApiError.bad(`Category already added with name: ${name}`);
    }
    const newCategory = await db.categories.create({
        data: {
            name: name,
            description,
            userId
        }
    });
    if(newCategory){
        const message = `Category added with name: ${name}`;
        res.status(201).json(new ApiResponse(200,message));
    }
    throw ApiError.bad("Something went wrong");
});
// --------------- Add Category Controller - END ---------------
//



//
// --------------- Edit Category Controller - START ---------------
const editCategoryController = asyncHandler(async (req,res) => {
    if(!req.body){
        throw ApiError.notFound("Name and description missing");
    }
    //fetching user id for user specific operations
    const userId = getCurrentUserID(req);

    const id = +req.params.id;
    if(!id){
        throw ApiError.notFound("ID not found");
    }

    let {name, description} = req.body;
    let data = {};
    if(name){
        data.name = name;
    }
    if(description){
        data.description = description;
    }
    
    const updatedCategory = await db.categories.update({
        where: {
            id, userId
        },
        data: data
    });

    if(!updatedCategory){
        throw ApiError.bad("Something went wrong");
    }

    const message = `Category updated`;
    res.status(200).json(new ApiResponse(200,message));
});
// --------------- Edit Category Controller - END ---------------
//




//
// --------------- Delete Category Controller - START ---------------
const deleteCategoryController = asyncHandler(async (req,res) => {
    //fetching user id for user specific operations
    const userId = getCurrentUserID(req);

    const id = +req.params.id;
    if(!id){
        throw ApiError.notFound("ID not found");
    }

    const deletedCategory = await db.categories.delete({
        where: {
            id: id,
            userId : userId
        }
    });
    if(!deletedCategory){
        throw ApiError.bad("Something went wrong");
    }
    const message = `Category deleted successfulyy.`;
    res.status(200).json(new ApiResponse(200,message));
});
// --------------- Delete Category Controller - END ---------------
//



//
// --------------- Get Category Controller - START ---------------
const getCategoryController = asyncHandler(async (req,res) => {
    //fetching user id for user specific operations
    const userId = getCurrentUserID(req);
    const id = +req.params.id;
    let message = ``;
    let data = [];

    if(!id){
        //return all categories of specific user
        message = `Successfully fetch all categories`;
        const categoriesList =  await db.categories.findMany({
            where: { userId: userId }
        });
        data = categoriesList;

    }else{
        //return category against id
        message = `Successfully fetch`;
        const specificCategory =  await db.categories.findUnique({
            where: { id: id, userId: userId },
            include: {
                tasks: true
            }
        });
        if(!specificCategory){
            throw ApiError.notFound(`Category not found with ID: ${id}`);
        }
        data = specificCategory;
    }
    
    res.status(200).json(new ApiResponse(200, message, data));
});
// --------------- Get Category Controller - END ---------------
//




export {
    addCategoryController,
    editCategoryController,
    deleteCategoryController,
    getCategoryController
};