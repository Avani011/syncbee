import mongoose from 'mongoose';
import { SubTask } from '../models/subTask.model.js';
import {ApiError} from '../utils/apiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';

//Create SubTask
const createSubTask = asyncHandler(async (req, res) => {
    const {title, mainTask} = req.body;

    if(!mongoose.Types.ObjectId.isValid(mainTask)){
        throw new ApiError(400, "Invalid MainTask ID")
    }

    const task = await Task.findById(maintask);
    if(!task){
        throw new ApiError(404, "Parent Task not Found")
    }

    const subtask = await SubTask.create({
        title,
        mainTask
    })

    return res
    .status(200)
    .json(
        new ApiResponse(
            201,
            subtask,
            "SubTask Created Successfully"
        )
    )
})

//Update SubTask
const updateSubTask = asyncHandler(async (req, res) => {
    const {subTaskId} = req.params
    const {title, isCompleted} = req.body

    if(!mongoose.Types.ObjectId.isValid(subTaskId)){
        throw new ApiError(400, "Invalid Subtask Id")
    }

    const subtask = await SubTask.findByIdAndUpdate(
        subTaskId,
        {title, isCompleted},
        {new: true}
    )

    if(!subtask){
        throw new ApiError(404, "SubTask not Found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            201,
            subtask,
            "SubTask Updated Successfully"
        )
    )
})

//Get all SubTask for Task
const getSubTask = asyncHandler(async (req, res) => {
    const {taskId} = req.params

    if(!mongoose.Types.ObjectId.isValid(taskId)){
        throw new ApiError(404, "Invalid Task Id")
    }

    const subtasks = await SubTask.find({mainTask: taskId})

    return res
    .status(200)
    .json(
        new ApiResponse(
            201,
            subtasks,
            "All SubTasks are Fetched Successfully"
        )
    )
})

//Mark Subtask as Completed
const markSubtaskComplete = asyncHandler(async(req, res) => {
    const {subTaskId} = req.params

    if(!mongoose.Types.ObjectId.isValid(subTaskId)){
        throw new ApiError(404, "Invalid Subtask Id")
    }

    const subtask =  await SubTask.findByIdAndUpdate(
        subTaskId,
        {
            isCompleted: true
        },
        {new: true}
    )

    if(!subtask) {
        throw new ApiError(400, "Unable to Find SubTask")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            {},
            "SubTask Marked as Complete"
        )
    )
})

//Delete SubTask
const deleteSubTask = asyncHandler(async(req, res) => {
    const {subTaskId} = req.params

    if(!mongoose.Types.ObjectId.isValid(subTaskId)){
        throw new ApiError(404, "Invalid SubTaskId")
    }

    const subtask = await SubTask.findByIdAndDelete(
        subTaskId
    )

    if(!subtask){
        throw new ApiError(400, "SubTask Not Found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            201,
            {},
            "Task Deleted Successfully"
        )
    )
})

export {
    createSubTask,
    updateSubTask,
    getSubTask,
    markSubtaskComplete,
    deleteSubTask
}