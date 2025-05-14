import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Focus } from "../models/focus.model.js";

const startFocus = asyncHandler(async (req, res) => {
    const { duration } = req.body;
  
    if (!duration || isNaN(duration) || duration <= 0) {
      throw new ApiError(400, "Valid Focus Duration is Required");
    }
  
    const userId = req.user._id; 
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new ApiError(404, "Invalid User Access");
    }
  
    const focusSession = await Focus.create({
      owner: userId,
      duration,
    });
  
    if (!focusSession) {
      throw new ApiError(400, "Error Starting Focus Session");
    }
  
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          focusSession,
          "Focus Session Start Successfully"
        )
      );
  });
//     const userId = req.user._id; // ✅ FIXED destructuring
  
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       throw new ApiError(404, "Invalid User Access. Please LogIn or Register");
//     }
  
//     const fetchHistory = await Focus.find({ owner: userId }).sort({ createdAt: -1 });
  
//     if (!fetchHistory) {
//       throw new ApiError(400, "Unable to fetch Focus History");
//     }
  
//     return res.status(200).json({
//       success: true,
//       data: fetchHistory,
//       message: "Successfully retrieved User Focus History"
//     });
//   });

const getFocusHistory = async (req, res) => {
    try {
      const userId = req.user.id;
  
      // Define the beginning and end of the current UTC day
      const now = new Date();
      const todayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
      const todayEnd = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999));
  
      console.log("🕓 UTC Range:", todayStart.toISOString(), "to", todayEnd.toISOString());
  
      // Fetch only today's sessions
      const sessionsToday = await Focus.find({
        owner: userId,
        createdAt: {
          $gte: todayStart,
          $lte: todayEnd
        }
      });
  
      console.log("📦 Found sessions:", sessionsToday);
  
      return res.status(200).json({
        success: true,
        message: "Today's focus sessions retrieved",
        data: sessionsToday
      });
  
    } catch (error) {
      console.error("❌ Error fetching today's focus history:", error.message);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  };
  
const deleteFocus = asyncHandler(async (req, res) => {
    const userId = req.user._id; // ✅ FIXED

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(404, "Invalid User Access");
    }

    const { focusId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(focusId)) {
        throw new ApiError(404, "Focus Session doesn't Exist");
    }

    const deletedFocus = await Focus.findOneAndDelete({ owner: userId, _id: focusId });

    if (!deletedFocus) {
        throw new ApiError(400, "Error while Deleting the Focus Session");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Focus Session Deleted Successfully")
    );
});


export {
    startFocus,
    getFocusHistory,
    deleteFocus
}  