import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";

export const useAuthStore = create((set, get)=>({
    theme:localStorage.getItem("app-theme") || "light",
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers: [],
    socket:null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser:res.data})
            get().connectSocket()
        } catch (error) {
            console.log("Error in checking auth", error)
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },

    signup : async (data) => {
        set({isSigningUp:true})
        try {
            const res = await axiosInstance.post("/auth/signup",data);
            set({authUser: res.data})
            toast.success("Account created successfully!")

            get().connectSocket()
        } catch (error) {
            console.log("error while signing up ", error.response.data.message)
            toast.error(error.response.data.message)

        }finally{
            set({isSigningUp:false})
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null})
            toast.success("Logged out successfully!")
            get().diconnectSocket()
        } catch (error) {
            toast.error("Something went wrong. Try again later")
        }
    },

    login: async (data) => {
        set({isLoggingIn:true})
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser:res.data})
            toast.success("Logged in successfully!")

            get().connectSocket()
        } catch (error) {
            console.log("error while signing up ", error.response.data.message)
            toast.error(error.response.data.message)
        }finally{
            set({isLoggingIn:false})
        }
    },

    updateProfile: async (data)=>{
        set({isUpdatingProfile : true})
        try {
           const res = await axiosInstance.put("/auth/update-profile", data);
           set({authUser: res.data})
           toast.success("Profile updated successfully")
        } catch (error) {
            console.log("error while updating profile", error.response.data.message)
            toast.error(error.response.data.message)

        }finally{
            set({isUpdatingProfile : false})
        }
    },

    connectSocket:()=>{
        const {authUser} = get()
        if(!authUser || get().socket?.connected) return;

        const socket = io(import.meta.env.MODE === "development" ? import.meta.env.VITE_SERVER_URL : "/", {
            query:{
                userId: authUser._id,
            }
        })
        socket.connect()

        set({socket:socket})

        socket.on("getOnlineUsers" , (userIds)=>{
            set({onlineUsers:userIds})
        })
    },

    diconnectSocket: ()=>{
        if(get().socket?.connected) get().socket.disonnect()
    }

}))