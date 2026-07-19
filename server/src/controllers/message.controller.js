import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getUsersForSideBar = asyncHandler(async (req, res) => {
    const loggedUserId = req.user._id;
    const filteredUsers = await User.find({
        _id: { $ne: loggedUserId },
    }).select("-password -__v");

    res.status(200).json({
        message: "Users Fetched Successfully",
        data: filteredUsers,
    });
});

export const getMessages = asyncHandler(async (req, res) => {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
        $or: [
            { senderId: myId, receiverId: userToChatId },
            { senderId: userToChatId, receiverId: myId },
        ],
    });

    res.status(200).json({
        message: "Messages Fetched Successfully",
        data: messages,
    });
});

export const sendMessage = asyncHandler(async (req, res) => {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
        // Upload Base64 Image to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
        senderId,
        receiverId,
        text,
        image: imageUrl,
    });
    await newMessage.save();

    // Real Time Functionality Here
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({
        message: "Message Sent Successfully",
        data: newMessage,
    });
});
