import mongoose from "mongoose";
import { Task } from "../models/task.model.js";
import { TaskHistory } from "../models/taskHistory.model.js";
import moment from "moment";
import { ApiError } from "../utils/ApiError.js";

export const updateTaskHistory = async (req, res, next) => {
    try {
        const {userId} = req.user._id
        if(!mongoose.Types.ObjectId.isValid(userId)){
            throw new ApiError(404, "Invalid User Id")
        }

        const {taskId} = req.params
        if(!mongoose.Types.ObjectId.isValid(userId)){
            throw new ApiError(404, "Invalid Task Id")
        }

        const updateTaskData = req.body
        if(!updateTaskData){
            throw new ApiError(400, "Not recieved Task Data")
        }

        let oldDueDate, newDueDate;
        
        if(taskId){
            const existingTask = await Task.findById(taskId)
            if(!existingTask){
                throw new ApiError(404, "Task Not Found" )
            }

            oldDueDate = moment(existingTask.dueDate).startOf("day").toDate()
            newDueDate = updateTaskData.dueDate
                ? moment(updateTaskData.dueDate).startOf("day").toDate()
                : oldDueDate
        }

        if(oldDueDate && oldDueDate.getTime() !== newDueDate.getTime()){
            await updateTaskHistoryByDate(userId, oldDueDate)
        }

        await updateTaskHistoryByDate(userId, newDueDate || moment().startOf("day").toDate())

        next()

    } catch (error) {
        console.error("Error Updating Task History:", error)
        next(error)
    }
}

const updateTaskHistoryByDate = async(userId, date) => {

    const totalTasks = await Task.countDocuments({owner: userId, dueDate: date })
    const completedTasks = await Task.countDocuments({owner: userId, dueDate: date, isCompleted: true})
    const completionPercentage = totalTasks > 0 ? (completedTasks/totalTasks) * 100 : 0

    const history = await TaskHistory.findByIdAndUpdate(
        {user: userId, date},
        {totalTasks, completedTasks, completionPercentage, updatedAt: new Date()},
        {upsert: true}
    )

    if(!history) {
        throw new ApiError(400, "Unable to Update Task History By Date")
    }
}