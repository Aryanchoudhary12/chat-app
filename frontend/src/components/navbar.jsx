import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageCircleCode, Settings, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const { logout, authUser } = useAuthStore();
  return (
    <header className="flex justify-between items-center p-3 border-b-2 border-base-300/50">
      <div className="flex justify-center items-center gap-2 pl-2">
        <MessageCircleCode className="stroke-warning stroke-1 bg-amber-500/15 p-1 h-8 w-8 rounded-xl" />{" "}
        <p className="text-xl font-semibold text-warning">Chatty</p>
      </div>
      <div className="flex justify-center items-center gap-6 pr-2">
        <Link to="/setting" className="flex justify-center items-center gap-1">
          <Settings className="stroke-warning h-5 w-5" />{" "}
          <p className="text-warning font-normal">Settings</p>
        </Link>
        {authUser && (
          <Link to="/profile" className="flex justify-center items-center gap-1">
            <User className="stroke-warning h-5 w-5" />{" "}
            <p className="text-warning font-normal">Profile</p>
          </Link>
        )}
        {authUser && (
          <button  className="flex justify-center items-center gap-1" onClick={logout}>
            <LogOut className="stroke-warning h-5 w-5" />{" "}
            <p className="text-warning font-normal">Logout</p>
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
