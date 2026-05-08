import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useState, useRef } from "react";
import defaultimage from "../../public/deadpool 2.jpg";
import cam from "../../public/photo.png";
import { User, Mail } from "lucide-react";
function Profile() {
  const { authUser, upload } = useAuthStore();
  console.log(authUser);
  const inputref = useRef(null);
  const handleupload = () => {
    inputref.current.click();
  };
  const [file, setFile] = useState(null);
  const [selectedimg, setselectedimg] = useState(null);
  console.log(file);
  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-2 bg-base-300 p-5 mt-4 rounded-2xl w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12">
        <div className="flex  flex-col justify-center items-center relative ">
          <h1 className="text-2xl font-bold mb-2">Profile</h1>
          <p className="text-base font-normal mb-3 ">
            Your Profile Information
          </p>
          {authUser?.ProfilePic ? (
            <img
              src={authUser?.ProfilePic}
              alt=""
              className="h-40 w-40 object-cover rounded-full"
            />
          ) : (
            <img
              src={selectedimg || defaultimage}
              className="h-40 w-40 object-cover rounded-full"
            />
          )}

          <div
            onClick={handleupload}
            className="bg-gray-700  rounded-full w-fit relative -top-10 left-10 h-fit flex "
          >
            <input
              type="file"
              className="hidden"
              ref={inputref}
              onChange={(e) => {
                const selectedfile = e.target.files[0];
                setFile(selectedfile);
                let url = URL.createObjectURL(selectedfile);
                setselectedimg(url);
                const reader = new FileReader();
                reader.readAsDataURL(selectedfile);
                reader.onload = async () => {
                  const base64Image = reader.result;
                  await upload({ ProfilePic: base64Image });
                };
              }}
            />
            <button className="h-full w-full p-2 rounded-full">
              <img src={cam} alt="" className="h-6 w-6 " />
            </button>
          </div>

          <p className="text-xs -mt-6">
            Click on camera icon to upload your profile pic
          </p>
        </div>
        <div className="w-full flex items-center gap-2">
          <User className="h-5 w-5 "></User>
          <p className="w-full font-medium">Full Name</p>
        </div>
        <p className="w-full p-3 rounded-md border-2 border-gray-600 bg-base-100 pl-6">
          {authUser.fullname}
        </p>
        <div className="w-full flex items-center gap-2 mt-2">
          <Mail className="h-5 w-5 " />
          <p className="w-full font-medium  ">Email</p>
        </div>
        <p className="w-full p-3 rounded-md border-2 border-gray-600 bg-base-100 pl-6">
          {authUser.email}
        </p>
        <div className="w-full p-4">
          <p className="font-semibold">ACCOUNT INFORMATION</p>
          <div className="flex justify-between items-center border-b p-2 border-gray-600 mt-2">
            <p className="text-sm">Member since</p>
            <p className="text-sm">{authUser.createdAt?.split("T")[0]}</p>
          </div>
          <div className="flex justify-between items-center border-b p-2 border-gray-600 mt-2">
            <p className="text-sm">Account status</p>
            <p className="text-sm text-success font-medium">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
