import React from "react";
import { themes } from "../constant";
import { Key, Send } from "lucide-react";
import { useThemeStore } from "../store/useTheme";
function Setting() {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="p-6 h-screen">
      <div className="space-y-6">
        <h1 className="text-lg font-bold text-warning">Themes</h1>
        <p className="">
          Select your preferred theme for chat interface.
        </p>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 mt-6">
        {themes.map((t) => {
          return (
            <button
              className={`group flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                theme == t ? "bg-base-200" : "hover:bg-base-200/50"
              }`}
              onClick={() => setTheme(t)}
            >
              <div
                className="relative h-8 w-full rounded-md overflow-hidden"
                data-theme={t}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Setting;
