import mongoose from "mongoose";
import {Router} from 'express';
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { ownership } from "../middlewares/ownership.middleware.js";
import { SubTask } from "../models/subTask.model.js";
import { Task } from "../models/task.model.js";
import { createSubTask, deleteSubTask, getSubTask, markSubtaskComplete, updateSubTask } from "../controllers/subTask.controller.js";

const router = Router()

router.route("/create-subtask/:taskId").post(verifyJWT, ownership(Task, "taskId"), createSubTask)
router.route("/get-subtasks/:taskId").get(verifyJWT, ownership(Task, "taskId"), getSubTask)

router.route("/update-subtask/:taskId/:subTaskId").put(
    verifyJWT, 
    ownership(Task, "taskId"),
    ownership(SubTask, "subTaskId", "mainTask"),
    updateSubTask
)

router.route("/mark-subtask-completed/:taskId/:subTaskId").patch(
    verifyJWT,
    ownership(Task, "taskId"),
    ownership(SubTask, "subTaskId", "mainTask"),
    markSubtaskComplete
)

router.route("/delete-subtask/:taskId/:subTaskId").delete(
    verifyJWT,
    ownership(Task, "taskId"),
    ownership(SubTask, "subTaskId"),
    deleteSubTask
)

export default router;