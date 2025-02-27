import {create} from "zustand";
import {toast} from "react-hot-toast"
import {axiosInstance} from "../lib/axios,.js"

export const useChatsStore = create((set) => ({
    messages : [],
    users : [],
    selectedUsers : null,
    isUserLoading : false,
    isMessageLoading : false,

    getUsers : async () => {
        
        set({isUserLoading : true})
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users : res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isMessageLoading : false})
        }

    },

    getMessages : async (userId) => {

        set( {isMessageLoading : true} )
        try {
            const res = await axiosInstance(`/messages/${userId}`)
            set({message : res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set( {isMessageLoading : false} )
        }
    }
}))