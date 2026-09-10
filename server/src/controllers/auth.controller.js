import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// Signup //
export const signup = asyncHandler(async (req, res) => {
    const { email, fullName, password, profilePic } = req.body;

    if (!email || !fullName || !password) {
        throw new ApiError(400, "All fields are required");
    }

    if (password.length < 6) {
        throw new ApiError(400, "Password must be at least 6 characters long");
    }

    const user = await User.findOne({ email });
    if (user) {
        throw new ApiError(400, "User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
        email,
        fullName,
        password: hashedPassword,
        profilePic,
    };
    const newUser = await User.create(userData);

    if (newUser) {
        generateToken(newUser._id, res);
        await newUser.save();
        return res.status(201).json({
            message: "User Created Successfully",
            user: {
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                profilePic: newUser.profilePic,
            },
        });
    }
    throw new ApiError(400, "Invalid User Data");
});

// Login //
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, "Invalid Credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid Credentials");
    }
    generateToken(user._id, res);
    res.status(200).json({
        message: "User Logged In Successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilePic: user.profilePic,
        },
    });
});

// Logout //
export const logout = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
        message: "User Logged Out Successfully",
    });
});

// Update Profile //
export const updateProfile = asyncHandler(async (req, res) => {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
        throw new ApiError(400, "Profile picture is required");
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: uploadResponse.secure_url },
        { new: true }
    );

    res.status(200).json({ message: "Profile Updated Successfully", user: updatedUser });
});

// Check User Authentication
export const checkAuth = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});
