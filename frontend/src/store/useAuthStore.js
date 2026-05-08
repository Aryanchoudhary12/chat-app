import { create } from "zustand";
import { axiosInstant } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:4000";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningup: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,
  checkAuth: async () => {
    try {
      const res = await axiosInstant.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
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
      get().connectSocket();
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
      get().disConnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  upload: async (file) => {
    try {
      const res = await axiosInstant.put("/auth/update-profile", file);
      set({ authUser: res.data });
      toast.success("Profile Pic updated succesfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) {
      return;
    }
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disConnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) {
      socket.disconnect(); 
      set({ socket: null, onlineUsers: [] });
    }
  },
}));
