import { MessageCircleCode } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useForm } from "react-hook-form";
import { axiosInstant } from "../lib/axios";
function Signin() {
  const { signup, isSigningup } = useAuthStore();
  const { register, handleSubmit, formState:{errors} } = useForm();
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <MessageCircleCode className="p-2 h-12 w-12 stroke-1 stroke-yellow-300 bg-amber-500/15 rounded-2xl mb-4" />
      <legend className="mb-4 text-warning">
        Get started with your free account
      </legend>

      <form className="fieldset w-xs flex flex-col justify-center" onSubmit={handleSubmit(async(data)=>{
        try {
          signup(data)
        } catch (error) {
          console.error("Something went wrong",error)
        }
      })}>
        <label className="label text-warning text-sm font-medium">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <label className="label text-warning text-sm font-medium">
          Full Name
        </label>
        <input
          type="text"
          className="input"
          placeholder="Full Name"
          {...register("fullname", { required: "Full Name is required" })}
        />
        {errors.fullname && <p>{errors.fullname.message}</p>}
        <label className="label text-warning text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          {...register("password", {
            required: "Password is required and it must contain at leat 6 letters",
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button className="btn btn-warning btn-active mt-4">Signin</button>
        <p className="text-sm w-full text-center text-accent mt-4">
          Already have an account ?{" "}
          <Link to="/login" className="text-info">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signin;
