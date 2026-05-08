import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { X } from "lucide-react";
function ChatHeaders() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  return (
    <div className="p-2.5 border-b border-base-200 w-full">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <img
            src={selectedUser.ProfilePic || "/deadpool 2.jpg"}
            alt=""
            className="size-12 rounded-full object-cover"
          />
          <div className="flex flex-col justify-center item-start">
            <h1 className="font-medium text-base text-warning">{selectedUser.fullname}</h1>
            <p className="text-sm text-gray-400">{onlineUsers.flat().includes(selectedUser._id) ? "Online" : "Offline"}</p>
          </div>
        </div>
        <button onClick={()=>setSelectedUser(null)}>
            <X className="text-warning"></X>
        </button>
      </div>
    </div>
  );
}

export default ChatHeaders;
