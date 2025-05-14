import Router from "express";
import { Focus } from "../models/focus.model.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { ownership } from "../middlewares/ownership.middleware.js";
import { deleteFocus, getFocusHistory, startFocus } from "../controllers/focus.controller.js";

const router = Router()

router.route("/start-focus").put(verifyJWT, startFocus)
router.route("/fetch-focusHistory").get(verifyJWT, getFocusHistory)
router.route("/delete-focus/:focusId").delete(verifyJWT, ownership(Focus, "focusId"), deleteFocus)

export default router;   