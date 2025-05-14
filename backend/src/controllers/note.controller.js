import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { Note } from "../models/note.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import mongoose from "mongoose";
import fs from "fs";

//Create a New Note
const createNote = asyncHandler(async(req, res) => {
    const {title, description, checklist} = req.body

    const userId = req.user._id
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(404, "Invalid User Id")
    }

    let imageUrls = []

    if(req.files && req.files.length > 0){
        for(let file of req.files){
            const uploadImage = await uploadOnCloudinary(file.path)
            if(!uploadImage){
                throw new ApiError(400, "Unable to get file path")
            }

            const eachImageUpload = imageUrls.push(uploadImage.url)
            if(!eachImageUpload){
                throw new ApiError(404, "Unable to upload All Images")
            }

            if (fs.existsSync(file.path)) { 
                fs.unlinkSync(file.path);
            }
        }
    }

    const note = await Note.create({
        title,
        description,
        owner: userId,
        pictures: imageUrls,
        checklist: checklist ? JSON.parse(checklist) : []
    })

    if(!note){
        throw new ApiError(400, "Unable to create Note")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            note,
            "Notes Created Successfully"
        )
    )
}) 

//Fetch All Notes
const getAllNotes = asyncHandler(async (req, res) => {

    const {userId} = req.user._id
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(404, "Invalid User Id")
    }

    const notes = await Note.find(
        {owner: userId}
    ).sort({updatedAt: -1})

    if(!notes){
        throw new ApiError(400, "Unable to Fetch notes")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            notes,
            "All Notes Fetched Successfully"
        )
    )
})

//Fetch a Single Task
const getNoteById = asyncHandler(async(req, res) => {
    const {noteId} = req.params
    if(!mongoose.Types.ObjectId.isValid(noteId)){
        throw new ApiError(404, "Invalid Note Id")
    }

    const {userId} = req.user._id
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(404, "Invalid User Id")
    }

    const note = await Note.findOne(
        {id: noteId, owner: userId}
    )

    if(!note){
        throw new ApiError(400, "Unable to Fetch Note")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            note,
            "Note Fetched Successfully"
        )
    )
})

//Update a Note
const updateNote = asyncHandler(async(req, res) => {
    const {noteId} = req.params
    if(!mongoose.Types.ObjectId.isValid(noteId)){
        throw new ApiError(404, "Invalid Note Id")
    }

    const {userId} = req.user._id
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(404, "Invalid User Id")
    }

    const {title, description, checklist} = req.body

    const updateNote = await Note.findByIdAndUpdate(
        {_id: noteId, owner: userId},
        {
            title, 
            description,
            checklist: checklist ? JSON.parse(checklist) : undefined
        },
        {
            new: true
        }
    )

    if(!updateNote){
        throw new ApiError(400, " Unable to Update a Note ")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            updateNote,
            "Note Updated Successfully"
        )
    )
})

//Deelete a Note
const deleteNote = asyncHandler(async(req, res) => {
    const {noteId} = req.params
    if(!mongoose.Types.ObjectId.isValid(noteId)){
        throw new ApiError(404, "Invalid Note Id")
    }

    const {userId} = req.user._id
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(404, "Invalid User Id")
    }

    const deletedNote = await Note.findOneAndDelete(
        {_id: noteId, owner: userId}
    )
    if(!deletedNote){
        throw new ApiError(400, " Unable to Delete a Note")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            {},
            "Note Deleted Successfully"
        )
    )
})

//Toggling a Checklist Item
const toggleChecklist = asyncHandler(async(req, res) => {
    const {noteId, checklistIndex} = req.params
    if(!mongoose.Types.ObjectId.isValid(noteId)){
        throw new ApiError(404, "Invalid Note Id")
    }

    const {userId} = req.body._id
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(404, "Invalid User Id")
    }

    const note = await Note.findOne({_id: noteId, owner: userId})
    if(!note){
        throw new ApiError(404, "Unable to fetch Note")
    }

    if(!note.checklist[checklistIndex]){
        throw new ApiError(404, "Unable to access the checklist")
    }

    note.checklist[checklistIndex].isTicked = !note.checklist[checklistIndex].isTicked

    const save = await note.save()
    if(!save){
        throw new ApiError(400, "Problem in Updating the Note Checklist Item Details")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            note,
            "CheckList Item Updated"
        )
    )

})

export {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote,
    toggleChecklist
}