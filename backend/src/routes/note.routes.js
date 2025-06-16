import { Note } from "../models/note.model.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { ownership } from "../middlewares/ownership.middleware.js";
import { createNote, deleteNote, getAllNotes, getNoteById, toggleChecklist, updateNote } from "../controllers/note.controller.js";
import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/create-note").post(verifyJWT, upload.array("pictures"), createNote)
router.route("/get-all-notes").get(verifyJWT, getAllNotes)

router.route("/get-One-Note/:noteId").get(verifyJWT, ownership(Note, "noteId"), getNoteById)
router.route("/update-note/:noteId").put(verifyJWT, ownership(Note, "noteId"), upload.array('pictures'), updateNote)
router.route("/delete-note/:noteId").delete(verifyJWT, ownership(Note, "noteId"), deleteNote)

router.route("update-checklist/:noteId/:checklistIndex").patch(verifyJWT, ownership(Note, "noteId"), toggleChecklist)

export default router; 