import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create( (set) => ({
    authUser : null,        // as initially we don't know if user is authenticated or not
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,
    isCheckingAuth : true,      // as soon as page refreshes we want to check if user is authenticated or not


    checkAuth : async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser : res.data})
        } catch (error) {
            console.log("Error in check auth hook ",error);
            set({authUser : null});
        }finally{
            set({isCheckingAuth : false})
        }
    },

    signup : async (data) => {
        set({isSigningUp : true})
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({authUser : res.data})
            toast.success("SignUp successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isSigningUp : false});
        }
    },

    logout : async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser : null});
            toast.success("Logged Out Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}) )