import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Focus } from "../models/focus.model.js";

const startFocus = asyncHandler(async (req, res) => {
    const {duration} = req.body
    if(!duration || isNaN(duration) || duration <= 0 ){
        throw new ApiError(400, "Valid Focus Duration is Required")
    }

    const {userId} = req.user._id
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(404, "Invalid User Access")
    }

    const focusSession = await Focus.create({
        owner: userId,
        duration
    })

    if(!focusSession){
        throw new ApiError(400, "Error Starting Focus Session")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            focusSession,
            "Focus Session Start Successfully"
        )
    )
})

const getFocusHistory = asyncHandler(async (req, res) => {
    const {userId} = req.user._id
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(404, "Invalid User Access. Please LogIn or Register")
    }

    const fetchHistory = await Focus.find(
        {owner: userId}
    ).set({createdAt:-1})

    if(!fetchHistory){
        throw new ApiError(400, "Unable to fetch Focus History")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            fetchHistory,
            "Successfully retrived User Focus History"
        )
    )
})

const deleteFocus = asyncHandler(async (req, res) => {
    const {userId} = req.user._id
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(404, "Invalid User Access")
    }

    const {focusId} = req.params
    if(!mongoose.Types.ObjectId.isValid(focusId)){
        throw new ApiError(404, "Focus Session dosen't Exist")
    }

    const deletedFocus = await Focus.findOneAndDelete(
        {owner: userId, _id: focusId}
    )

    if(!deletedFocus){
        throw new ApiError(400, "Error while Deleting the Focus Session")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            {},
            "Focus Session Deleted Successfully"
        )
    )
})

export {
    startFocus,
    getFocusHistory,
    deleteFocus
}