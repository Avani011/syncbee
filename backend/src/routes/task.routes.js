import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTask, deleteTask, getCalendarTasks, getTaskByStatus, markTaskAsComplete, rescheduleTask, updateTask } from "../controllers/task.controller.js";
import {ownership} from "../middlewares/ownership.middleware.js";
import { Task } from "../models/task.model.js";

const router = Router()

router.route("/create-task").post(verifyJWT, createTask);
router.route("/task-by-status").get(verifyJWT, getTaskByStatus);
router.route("/calendar-view").get(verifyJWT, getCalendarTasks);

//secured routes
router.route("/update-task").put(verifyJWT, ownership(Task, "taskId"), updateTask);
router.route("/delete-task").delete(verifyJWT, ownership(Task, "taskId"), deleteTask);
router.route("/mark-task-completed").patch(verifyJWT, ownership(Task, "taskId"), markTaskAsComplete);
router.route("/reschedule-task").patch(verifyJWT, ownership(Task, "taskId"), rescheduleTask);

export default router;