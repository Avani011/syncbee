import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import {Task} from "../models/task.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import mongoose from "mongoose";


//Created Task
const createTask = asyncHandler(async (req, res) => {
    const { title, description, dueDate, color, category, priority } = req.body;

    // ✅ Correctly extract user ID
    const userId = req.user._id;

    if (!title || !dueDate || !category || !priority) {
        throw new ApiError(400, "Please fill in all required fields");
    }

    const task = await Task.create({
        title,
        description,
        dueDate,
        color,
        category,
        priority,
        owner: userId // ✅ Assign correct owner
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            task,
            "Task Created Successfully"
        )
    );
});

//Update Task
const updateTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const updateFields = req.body; // Get only provided fields

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        throw new ApiError(400, "Invalid Task ID");
    }

    // ✅ Only update provided fields using `$set`
    const task = await Task.findByIdAndUpdate(
        taskId,
        { $set: updateFields }, // ✅ Updates only provided fields
        { new: true }
    );

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            task,
            "Task Updated Successfully"
        )
    );
});


//Delete Task
const deleteTask = asyncHandler(async(req, res) => {
    const {taskId} = req.params

    if(!mongoose.Types.ObjectId.isValid(taskId)){
        throw new ApiError(400, "Invalid Task ID")
    }

    const deletedTask = Task.findByIdAndDelete(taskId)

    if(!deletedTask){
        throw new ApiError(404, "Task not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Task deleted Successfully"
        )
    )
})

//Mark Task as Completed
const markTaskAsComplete = asyncHandler(async (req, res) => {
    const {taskId} = req.params

    if(!mongoose.Types.ObjectId.isValid(taskId)){
        throw new ApiError(400, "Invalid Task ID")
    }

    const task = await Task.findByIdAndUpdate(
        taskId,
        {
            isCompleted: true,
            status: "completed"
        },
        {
            new: true
        }
    )

    if(!task){
        throw new ApiError(404, "Task not Found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            task,
            "Task marked as Completed"
        )
    )
})

//Fetch Task by Status
const getTaskByStatus = asyncHandler(async(req, res) => {
    const {userId} = req.user
    const {status, category, priority, page, limit} = req.query

    if(!["active", "completed", "incomplete", "upcoming"].includes(status)){
        throw new ApiError(400, "Invalid Status Type")
    }

    let filter = {owner: userId}

    if(status === "active"){
        const today = new Date()
        today.setHours(0,0,0,0)

        const tomorrow = new Date(today)
        tomorrow.setDate(today.getDate() + 1)

        filter.dueDate = {$gte: today, $lte: tomorrow}
        filter.isCompleted = false
    }else {
        filter.status = status
    }

    if (category && ["work", "personal", "other"].includes(category.toLowerCase())) {
        filter.category = category.toLowerCase();
    }

    if (priority && ["high", "medium", "low"].includes(priority.toLowerCase())) {
        filter.priority = priority.toLowerCase();
    }

    // Convert `page` and `limit` to numbers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const tasks = await Task.find(filter)
        .skip((pageNumber - 1) * limitNumber)  // Skip tasks for previous pages
        .limit(limitNumber)  // Limit the number of tasks returned
        .exec();

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            tasks,
            "Tasks fetched Successfully"
        )
    )
})

//Reschedule Task
const rescheduleTask = asyncHandler(async(req, res) => {
    const {userId} = req.user
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    const aggregateQuery = Task.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $sort: {
                dueDate: 1
            }
        }
    ])

    const tasks = await Task.aggregatePaginate(aggregateQuery, {page, limit})

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            tasks,
            "Paginated Tasks Fetched Successfully"
        )
    )
})

//Fetch Calendar Tasks
const getCalendarTasks = asyncHandler(async (req, res) => {
    const {userId} = req.user
    const {month, year, category, priority} = req.query

    if(!month || !year){
        throw new ApiError(400, "Month and year are Required")
    }

    const startDate = moment(`${year}-${month}-01`).startOf("month").toDate()
    const endDate = moment(startDate).endOf("month").toDate()

    let filter = {
        owner: userId,
        dueDate: {$gte: startDate, $lte: endDate}
    }

    if (category && ["work", "personal", "other"].includes(category.toLowerCase())) {
        filter.category = category.toLowerCase();
    }

    if (priority && ["high", "medium", "low"].includes(priority.toLowerCase())) {
        filter.priority = priority.toLowerCase();
    }

    if (status && ["completed", "incomplete", "upcoming"].includes(status.toLowerCase())) {
        filter.status = status.toLowerCase();
    }

    const tasks = await Task.find(filter).sort({dueDate: 1}).exec()

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            tasks,
            "Calendar tasks Fetched"
        )
    )
})


export {
    createTask,
    updateTask,
    deleteTask,
    markTaskAsComplete,
    getTaskByStatus,
    rescheduleTask,
    getCalendarTasks
}