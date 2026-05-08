import React, { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";
function MessageInput() {
  const [imagePreview, setImagePreview] = useState(null);
  const inputref = useRef(null);
  const { register, control, reset } = useForm({
    defaultValues: {
      text: "",
    },
  });
  const text = useWatch({ control, name: "text" });
  const { sendMessages } = useChatStore();
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const removeImg = () => {
    setImagePreview(null);
    if (inputref.current) inputref.current.value = "";
  };
  const handlesendMessages = async (e) => {
    if (!text && !imagePreview) return;
    try {
      await sendMessages({
        text,
        image: imagePreview,
      });
      setImagePreview(null);
      if (inputref.current) {
        inputref.current.value = "";
      }
      reset({ text: "" });
      toast.success("Message sent successfully");
    } catch (error) {
      console.error("Failed to send message", error);
      toast.error("Failed to send message");
    } finally {
      setImagePreview(null);
      if (inputref.current) {
        inputref.current.value = "";
      }
      reset({ text: "" });
    }
  };
  console.log(imagePreview);
  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="preview"
              className="h-20 w-30 object-cover"
            />
            <button
              onClick={removeImg}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex justify-center items-center"
            >
              <X className="size-3"></X>
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handlesendMessages} className="w-full">
        <div className="flex-1 flex gap-1">
          <input
            type="text"
            placeholder="Type your messages here ..."
            className="input input-neutral w-full"
            {...register("text")}
          />
          <input
            key={imagePreview ? "image-selected" : "no-image"}
            type="file"
            accept="image/*"
            className="hidden"
            ref={inputref}
            onChange={handleChange}
          ></input>
          <button
            type="button"
            className={`flex btn btn-circle ${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            }`}
            onClick={() => inputref.current.click()}
          >
            <Image size={20} />
          </button>
          <button
            type="submit"
            className={`flex btn btn-circle `}
            disabled={!text && !imagePreview}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default MessageInput;
