import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { VoiceNote } from "../models/voiceNote.model.js"
import { ownership } from "../middlewares/ownership.middleware.js"
import { createVoiceNote, fetchVoiceNotes, fetchVoiceNote, updateVoiceNote, deleteVoiceNote } from "../controllers/voiceNote.controller.js"

const router = Router()

router.route("/create-VoiceNote").post(verifyJWT, createVoiceNote)
router.route("/fetchAll-VoiceNote").get(verifyJWT, fetchVoiceNotes)
router.route("/fetchOne-VoiceNote").get(verifyJWT, fetchVoiceNote)

router.route("/update-VoiceNote/:voiceNoteId").put(verifyJWT, ownership(VoiceNote, "voiceNoteId"), updateVoiceNote)
router.route("/delete-VoiceNote/:voiceNoteId").delete(verifyJWT, ownership(VoiceNote, "voiceNoteId"), deleteVoiceNote)

export default router