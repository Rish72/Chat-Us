import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create( (set) => ({
    authUser : null,        // as initially we don't know if user is authenticated or not
    isSigningIn : false,
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
    }
}) )