import {asyncHandler} from '../utils/asyncHandler.js';
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { ApiError } from '../utils/apiError.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId)

        const refreshToken = user.generateRefreshToken()
        const accessToken = user.generateAccessToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Error generating access and refresh token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, username, phone } = req.body;

    if ([fullName, email, password, username].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Please fill in all fields");
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already existed");
    }

    let avatarLocalPath;
    if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        avatarLocalPath = req.files.avatar[0].path;
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    const user = await User.create({
        fullName,
        email,
        password,
        username: username.toLowerCase(),
        phone,
        avatar: avatar?.url
    });

    // ✅ Generate Tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // ✅ Options for setting cookies
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "Strict"
    };

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Error creating user");
    }

    // ✅ Return user + token in cookie + response
    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                201,
                {
                    user: createdUser,
                    accessToken,
                    refreshToken
                },
                "User created and logged in successfully!"
            )
        );
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
  
    if (!(email || username)) {
      throw new ApiError(400, 'Please provide email or username');
    }
  
    const emailLower = email?.toLowerCase();
    const usernameLower = username?.toLowerCase();
  
    const user = await User.findOne({
      $or: [
        { email: emailLower },
        { username: usernameLower }
      ]
    });
  
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
  
    const isPasswordValid = await user.isPasswordCorrect(password);
  
    console.log('Login payload:', req.body);
    console.log('Stored hash:', user.password);
    console.log('Comparison result:', isPasswordValid);
  
    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid user credentials');
    }
  
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
  
    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');
  
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false, // ✅ Important
      sameSite: 'Lax', // ✅ Safer for general auth flows
      maxAge: 7 * 24 * 60 * 60 * 1000 // ✅ 7 days expiry
    };
  
    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .json(
        new ApiResponse(200, {
          user: loggedInUser,
          accessToken,
          refreshToken
        }, 'User logged in successfully')
      );
  });  
  
  

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id, 
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "User LoggedOut Successfully"
        )
    )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorised Request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        ) 
    
        const user = await User.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiError(401, "Unauthorised Request")
        }
    
        if (incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(401, "Refresh Tokn is expired or used")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken,
                    refreshToken: newRefreshToken
                },
                "Access Token Refreshed Successfully"
            )
        )
    } catch (error) {
        throw new ApiError(401, "Unauthorised Request")
        
    }
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const {oldPassword, newPassword} = req.body

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid Password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Password Changed Successfully"
        )
    )
})

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -refreshToken");
    
    if (!user) {
      throw new ApiError(404, "User not found");
    }
  
    return res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
  });
  

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email, phone, username } = req.body;

    if (!fullName && !email && !phone && !username) {
        throw new ApiError(400, "Please provide at least one field to update");
    }

    // Dynamically build the update object
    const updateFields = {};
    if (fullName) updateFields.fullName = fullName;
    if (email) updateFields.email = email;
    if (phone) updateFields.phone = phone;
    if (username) updateFields.username = username;

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        { $set: updateFields }, // Only update the provided fields
        { new: true } // Return the updated user
    ).select("-password");

    return res.status(200).json(
        new ApiResponse(200, user, "User Details Updated Successfully")
    );
});

const updateAvatar = asyncHandler(async (req, res) => {   
    const avatarLocalPath = req.file?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Please provide an image")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if (!avatar) {
        throw new ApiError(500, "Error uploading image")
        
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "User Avatar Updated Successfully"
        )
    )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateAvatar
}