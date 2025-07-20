import bycrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateTokens } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
export const signin = async (req, res) => {
  const { email, fullname, password } = req.body;
  try {
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);
    const newUser = new User({
      email: email,
      fullname: fullname,
      password: hashedPassword,
    });
    if (newUser) {
      generateTokens(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        fullname: newUser.fullname,
        ProfilePic: newUser.ProfilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error in signup controller");
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!email) {
      return res.status(400).json({ message: "Invalid user" });
    }
    const ispasswordcorr = await bycrypt.compare(password, user.password);
    if (!ispasswordcorr) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateTokens(user._id, res);
    res.status(201).json({
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      ProfilePic: user.ProfilePic,
    });
  } catch (error) {
    console.error("Error in login controller");
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out Seccessfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { ProfilePic } = req.body;
    const userid = req.user.id;
    if(!ProfilePic){
        return res.status(400).json({message:"Profile-Pic not found"})
    }
    const cloudinaryupload = await cloudinary.uploader.upload(ProfilePic);
    const updated = await User.findByIdAndUpdate(userid,{ProfilePic:cloudinaryupload.secure_url},{new:true})
    res.status(200).json(updated,{message:"Successfully updated"})
  } catch (error) {
    console.error(error);
    return res.status(500).json({message:"Internal server error"})
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.error(error);
    return res.status(500).json({message:"Internal server error"})
  }
};
