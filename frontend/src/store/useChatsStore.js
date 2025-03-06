import {create} from "zustand";
import {toast} from "react-hot-toast"
import {axiosInstance} from "../lib/axios.js"

export const useChatsStore = create((set, get) => ({
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
            set({isUserLoading : false})
        }


    },

    getMessages : async (userId) => {

        set( {isMessageLoading : true} )
        try {
            const res = await axiosInstance(`/messages/${userId}`)
            set({messages : res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set( {isMessageLoading : false} )
        }
    },

    sendMessages : async (msgData) =>  {
        const {selectedUsers, messages} = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUsers._id}`,msgData);
            set({messages : [...messages, res.data]})
        } catch (error) {
            toast.error(error.response.data.message)
        }

    },
    //optimize later
    setSelectedUsers : (selectedUsers) => set({selectedUsers})
}))