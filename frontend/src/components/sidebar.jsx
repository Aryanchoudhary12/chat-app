import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Users } from "lucide-react";
import { useState } from "react";
function Sidebar() {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const flatOnlineUsers = onlineUsers.flat();
  const onlineOnlyUsers = users.filter((user) =>
    flatOnlineUsers.includes(user._id)
  );
  console.log("Online : ", flatOnlineUsers);
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <aside className="h-full w-20 lg:w-72 border-r-2 border-base-300/50 flex flex-col transition-all duration-200">
      <div className="w-full p-5">
        <div className="flex items-center gap-2 ">
          <Users className="stroke-warning p-1.5 bg-warning/15 rounded-xl size-8"></Users>{" "}
          <span className="font-medium hidden lg:block text-warning">
            Contacts
          </span>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <input
            type="checkbox"
            className="checkbox checkbox-warning"
            value={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <span className="hidden lg:block">Show online users</span>
        </div>
      </div>
      <div className="overflow-y-auto w-full py-3">
        {(isChecked ? onlineOnlyUsers : users).map((user) => (
          <button
            key={user._id}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors justify-start ${
              selectedUser?._id === user._id
                ? "bg-base-300 ring-1 ring-base-300"
                : ""
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <div className="relative">
              <img
                src={user.ProfilePic || "/deadpool 2.jpg"}
                alt={user.fullname}
                className="size-12 rounded-full object-cover"
              />
              {flatOnlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-emerald-500 rounded-full ring-2 ring-base-200" />
              )}
            </div>
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullname}</div>
              <div className="text-sm text-accent">
                {flatOnlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
