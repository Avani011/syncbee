import { TaskHistory } from "../models/taskHistory.model.js";
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import moment from 'moment'
import mongoose from "mongoose";

//Get Today's Task History
const getDailyTaskHistory = asyncHandler(async(req, res) => {
    const {userId} = req.user?._id
    const {date} = req.query

    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(404, "Invalid User Id")
    }

    if(!date){
        throw new ApiError(400, "Date Parameter i required")
    }

    const specificDate = moment(date, "YYYY-MM-DD").startOf("day").toDate()
    const history = await TaskHistory.findOne({user: userId, date: specificDate})

    if(!history){
        throw new ApiError(400, "Unable to Fetch Daily Task History")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            history || {totalTasks: 0, completedTasks:0, completionPercentage:0},
            "Daily Task History Fetched"
        )
    )
})

const getTaskHistoryByRange = asyncHandler(async(req, res) => {
    const {userId} = req.user._id
    const {startDate, endDate} = req.query

    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(404, "Invalid User Id")
    }

    if(!startDate || !endDate){
        throw new ApiError(404, "Both startDate and endDate parameters required")
    }

    const start = moment(date, "YYYY-MM-DD").startOf("day").toDate()
    const end = moment(date, "YYYY-MM-DD").startOf("day").toDate()

    const history = await TaskHistory.find({
        user: userId,
        date: {$gte: start, $lte: end}
    }).sort({date: -1})

    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            history,
            "Task History Fetcched Successfully"
        )
    )
})

const getProfileAnalytics = asyncHandler(async(req, res) => {
    const {userId} = req.user._id
    const {startDate, endDate} = req.query

    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(404, "Invalid User Id")
    }

    if(!startDate || !endDate){
        throw new ApiError(400, "startDate and endDate parameters are required")
    }

    const start = moment(date, "YYYY-MM-DD").startOf("day").toDate()
    const end = moment(date, "YYYY-MM-DD").startOf("day").toDate()

    const history = await TaskHistory.find({
        user: userId,
        date: {$gte: start, $lte: end}
    }).sort({date: 1})

    if(!history){
        throw new ApiError(400, "Unable to Fetch Task History")
    }

    let totalTasks = 0
    let completedTasks = 0
    history.forEach((entry) => {
        totalTasks += entry.totalTasks
        completedTasks += entry.completedTasks
    })

    const completionPercentage = totalTasks > 0 ? (completedTasks/totalTasks) * 100 : 0

    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            {
                totalTasks,
                completedTasks,
                completionPercentage,
                history
            },
            "Profile Analytics Fetched Successfully"
        )
    )
})


export {
    getDailyTaskHistory,
    getTaskHistoryByRange,
    getProfileAnalytics
}