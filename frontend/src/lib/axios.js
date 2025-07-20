import axios from "axios";

export const axiosInstant = axios.create({
    baseURL:"http://localhost:4000/api",
    withCredentials:true,
})