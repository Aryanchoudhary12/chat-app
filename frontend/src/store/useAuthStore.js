import { create } from "zustand";
import { axiosInstant } from "../lib/axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningup: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers:[],
  checkAuth: async () => {
    try {
      const res = await axiosInstant.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
      console.error("error in checkAuth", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningup: true });
    try {
      const res = await axiosInstant.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Signed In Successfully");
    } catch (error) {
      console.error("Something went wrong", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningup: false });
    }
  },
  login: async (data) => {
    try {
      await axiosInstant.post("/auth/login", data);
      toast.success("Logged In Successfully");
    } catch (error) {
      console.error("Something went wrong");
      toast.error(error.response.data.message);
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstant.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged Out Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  upload: async (file) => {
    try {
      const res = await axiosInstant.put("/auth/update-profile",file);
      set({authUser:res.data})
      toast.success("Profile Pic updated succesfully")
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));
