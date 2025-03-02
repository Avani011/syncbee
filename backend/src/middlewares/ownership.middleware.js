import mongoose from "mongoose";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Task } from "../models/task.model.js";
import {Note} from "../models/note.model.js";
import {VoiceNote} from "../models/voiceNote.model.js";
import {SubTask} from "../models/subTask.model.js";
import {Focus} from "../models/focus.model.js";

const ownership = (model, idField = "id", ownerField = "owner") => {
    return asyncHandler(async (req, res, next) => {
        const documentId = req.params[idField]
        const userId = req.user._id

        if(!mongoose.Types.ObjectId.isValid(documentId)){
            throw new ApiError(400, "Invalid ID Format")
        }

        const document = await model.findById(documentId)
        if(!document){
            throw new ApiError(404, "Invalid Task Access")
        }

        if(document[ownerField].toString() !== userId.toString()){
            throw new ApiError(403, "Forbidden: You do not own this resource")
        }

        req.document = document
        next()
    })
}

export {ownership}