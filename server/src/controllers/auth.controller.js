import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Signup //
export const signup = async (req, res) => {
    const { email, fullName, password, profilePic } = req.body;

    try {
        if (!email || !fullName || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long",
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists",
            });
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
        return res.status(400).json({
            message: "Invalid User Data",
        });
    } catch (error) {
        console.error("Error in signup Controller:", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// Login //
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
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
    } catch (error) {
        console.error("Error in login Controller:", error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// Logout //
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({
            message: "User Logged Out Successfully",
        });
    } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// Update Profile //
export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({
                message: "Profile picture is required",
            });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json({ message: "Profile Updated Successfully", user: updatedUser });
    } catch (error) {
        console.error("Error in updateProfile Controller:", error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// Check User Authentication
export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error in checkAuth Controller:", error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
