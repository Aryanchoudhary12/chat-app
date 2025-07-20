import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filtereduser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filtereduser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: senderId, recieverId: userToChatId },
        { senderId: userToChatId, recieverId: senderId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const sendMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const { text, image } = req.body;
    const { id: recieverId } = req.params;
    let imageurl;
    if (image) {
      const uploadresponse = await cloudinary.uploader.upload(image);
      imageurl = uploadresponse.secure_url;
    }
    const newMessage = new Message({
      senderId: userId,
      recieverId,
      text,
      image: imageurl,
    });
    await newMessage.save();
    //realtime functionality goes there
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
