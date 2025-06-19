import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Note } from "../models/note.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import fs from "fs";

//Create a New Note
const createNote = asyncHandler(async (req, res) => {
  const { title, description, checklist } = req.body;

  const userId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(404, "Invalid User Id");
  }

  let imageUrls = [];

  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const uploadImage = await uploadOnCloudinary(file.path);
      if (!uploadImage?.url) {
        throw new ApiError(400, "Unable to upload one or more images");
      }

      imageUrls.push(uploadImage.url);

      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    }
  }

  let parsedChecklist = checklist;

  // ✅ Check if it's a string and parse it
  if (typeof checklist === "string") {
    try {
      parsedChecklist = JSON.parse(checklist);
    } catch (e) {
      console.error("❌ Failed to parse checklist:", checklist);
      parsedChecklist = [];
    }
  }

  // ✅ Ensure it's an array
  if (!Array.isArray(parsedChecklist)) {
    parsedChecklist = [];
  }

  const note = await Note.create({
    title,
    description,
    owner: userId,
    pictures: imageUrls,
    checklist: parsedChecklist,
  });

  if (!note) {
    throw new ApiError(400, "Unable to create Note");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, note, "Notes Created Successfully"));
});

//Fetch All Notes
const getAllNotes = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(404, "Invalid User Id");
  }

  const notes = await Note.find({ owner: userId }).sort({ updatedAt: -1 });

  if (!notes) {
    throw new ApiError(400, "Unable to Fetch notes");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, notes, "All Notes Fetched Successfully"));
});

//Fetch a Single Task
const getNoteById = asyncHandler(async (req, res) => {
  const { noteId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    throw new ApiError(404, "Invalid Note Id");
  }

  const userId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(404, "Invalid User Id");
  }

  const note = await Note.findOne({ id: noteId, owner: userId });

  if (!note) {
    throw new ApiError(400, "Unable to Fetch Note");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, note, "Note Fetched Successfully"));
});

//Update a Note
const updateNote = asyncHandler(async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    throw new ApiError(404, "Invalid Note ID");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(404, "Invalid User ID");
  }

  // Incoming fields
  const { title, description, checklist } = req.body;
  let parsedChecklist = [];

  try {
    parsedChecklist = checklist ? JSON.parse(checklist) : [];
  } catch (e) {
    console.error("Checklist JSON parsing error:", e);
  }

  // Handle old images (string URLs)
  let finalImages = [];

  if (req.body.existingImages) {
    if (typeof req.body.existingImages === "string") {
      finalImages = [req.body.existingImages];
    } else if (Array.isArray(req.body.existingImages)) {
      finalImages = req.body.existingImages;
    }
  }

  if (req.files && req.files.length > 0) {
    for (let file of req.files) {
      const uploaded = await uploadOnCloudinary(file.path);
      if (uploaded?.url) {
        finalImages.push(uploaded.url);
      }
      fs.unlinkSync(file.path);
    }
  }
  console.log("Final Images:", finalImages);

  const updatedNote = await Note.findOneAndUpdate(
    { _id: noteId, owner: userId },
    {
      title,
      description,
      checklist: parsedChecklist,
      pictures: finalImages,
    },
    { new: true }
  );

  if (!updatedNote) {
    throw new ApiError(400, "Unable to update note");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedNote, "Note updated successfully"));
});

//Deelete a Note
const deleteNote = asyncHandler(async (req, res) => {
  const { noteId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    throw new ApiError(404, "Invalid Note Id");
  }

  const userId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(404, "Invalid User Id");
  }

  const deletedNote = await Note.findOneAndDelete({
    _id: noteId,
    owner: userId,
  });
  if (!deletedNote) {
    throw new ApiError(400, " Unable to Delete a Note");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, {}, "Note Deleted Successfully"));
});

//Toggling a Checklist Item
const toggleChecklist = asyncHandler(async (req, res) => {
  const { noteId, checklistIndex } = req.params;
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    throw new ApiError(404, "Invalid Note Id");
  }

  const userId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(404, "Invalid User Id");
  }

  const note = await Note.findOne({ _id: noteId, owner: userId });
  if (!note) {
    throw new ApiError(404, "Unable to fetch Note");
  }

  if (!note.checklist[checklistIndex]) {
    throw new ApiError(404, "Unable to access the checklist");
  }

  note.checklist[checklistIndex].isTicked =
    !note.checklist[checklistIndex].isTicked;

  const save = await note.save();
  if (!save) {
    throw new ApiError(
      400,
      "Problem in Updating the Note Checklist Item Details"
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(200, note, "CheckList Item Updated"));
});

export {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
  toggleChecklist,
};
