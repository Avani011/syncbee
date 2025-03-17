import { VoiceNote } from "../models/voiceNote.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import fs from 'fs';
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import mongoose from "mongoose";

const createVoiceNote = asyncHandler(async(req,res) => {
    const {title} = req.body
    const {userId} = req.user._id
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(404, "Invalid User Id")
    }

    if(!title || !req.file){
        throw new ApiError(400, "Title and Audio File requied")
    }

    const uploadAudio = await uploadOnCloudinary(req.file.path, "audio")

    if(!uploadAudio){
        throw new ApiError(400, "Error uploading Audio File")
    }

    fs.unlinkSync(req.file.path)

    const voiceNote = await VoiceNote.create({
        title,
        file: uploadAudio.url,
        owner: userId
    })

    if(!voiceNote){
        throw new ApiError(400, "Error while Creating VoiceNote")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            201,
            voiceNote,
            "Voice Note Created Successfully"
        )
    )
})

const fetchVoiceNotes = asyncHandler(async(req, res) => {
    const userId = req.user._id
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(404, "Invalid User Id")
    }

    const voiceNotes = VoiceNote.find(
        {qwner: userId}
    ).sort({updatedAt: -1})

    if(!voiceNotes){
        throw new ApiError(400, "Unable to fetch Voice Notes")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            voiceNotes,
            "All Voice Notes Fetched Successfully"
        )
    )
})

const fetchVoiceNote = asyncHandler(async (req, res) =>{
    const userId = req.user._id
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(404, "Invalid User Id")
    }

    const voiceNoteId = req.params
    if(!mongoose.Types.ObjectId.isValid(voiceNoteId)){
        throw new ApiError(404, "Invalid voice Note ID")
    }

    const voiceNote = VoiceNote.findOne(
        {
            _id : voiceNoteId,
            owner: userId
        }
    )

    if(!voiceNote){
        throw new ApiError(400, "Error Fetching Voice Note")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            voiceNote,
            "Voice Note Fetched Successfully"
        )
    )
})

const updateVoiceNote = asyncHandler(async(req, res) => {
    const userId = req.user._id
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(404, "Invalid User Access")
    }

    const voiceNoteId = req.params
    if(!mongoose.Types.ObjectId.isValid(voiceNoteId)){
        throw new ApiError(404, "Invalid Voice Note Id")
    }

    const title = req.body
    
    let updateData = {title}

    if(req.file){
        const uploadAudio = await uploadOnCloudinary(req.file.path, "audio")

        if(!uploadAudio){
            throw new ApiError(400, " Error Uploading new Audio File")
        }

        fs.unlinkSync(req.file.path)

        updateData.file = uploadAudio.url
    }

    const updatedVoiceNote = VoiceNote.findOneAndUpdate(
        {owner: userId, _id: voiceNoteId},
        updateData,
        {new: true}
    )

    if(!updatedVoiceNote){
        throw new ApiError("Unable to Update Voice Note")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            updatedVoiceNote,
            "Voice Note Updated Successfully"
        )
    )
})

const deleteVoiceNote = asyncHandler(async(req, res) => {
    const userId = req.user._id
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(404, "Invalid user Id")
    }

    const voiceNoteId = req.params
    if(!mongoose.Types.ObjectId.isValid(voiceNoteId)){
        throw new ApiError(404, "invalid Voice Note Id")
    }

    const deleteVoiceNote = VoiceNote.findOneAndDelete(
        {owner: userId, _id: voiceNoteId}
    )

    if(!deleteVoiceNote){
        throw new ApiError(400, " Error while Deleting Voice Note")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            {},
            "Voice Note Deleted Successfully"
        )
    )
})

export {
    createVoiceNote,
    fetchVoiceNotes,
    fetchVoiceNote,
    updateVoiceNote,
    deleteVoiceNote
}