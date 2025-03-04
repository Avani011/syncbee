import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // Extract token from cookies or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized Access: Token missing");
        }

        // Verify token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Fetch user from database
        const user = await User.findById(decodedToken._id).select("_id username email"); 

        if (!user) {
            throw new ApiError(401, "Unauthorized Access: User not found");
        }

        req.user = user; // ✅ Attach user object
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message); // ✅ Log exact error
        throw new ApiError(401, "Unauthorized Access: Invalid Token");
    }
});
