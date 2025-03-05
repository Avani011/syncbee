import {verifyJWT} from "../middlewares/auth.middleware.js";
import {Router} from "express";
import { getDailyTaskHistory, getTaskHistoryByRange, getProfileAnalytics } from "../controllers/taskHistory.controller.js";

const router = Router()

router.route("/daily-task-history").get(verifyJWT, getDailyTaskHistory)
router.route("/task-history-by-range").get(verifyJWT, getTaskHistoryByRange)

router.route("/profile-analytics").get(verifyJWT, getProfileAnalytics)

export default router;