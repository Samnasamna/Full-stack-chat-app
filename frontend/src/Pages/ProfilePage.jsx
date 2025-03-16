import React, { useState } from 'react'
import { useAuthStore } from '../Store/UseAuthStore';
import { Camera, LogOut, Mail, User } from 'lucide-react';


const ProfilePage = () => {

  const {authUser, isUpdatingProfile, updateProfile, logout} = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null)


  const handleImageUpload = async (e)=>{
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async()=>{
      const base64Image = reader.result;
      
      const res = await updateProfile({profilePic:base64Image})
      if(!res.error){
        setSelectedImage(base64Image)
      }
    }
  }

  return (
    <div className='h-screen pt-20 w-full mt-[-90px]  '>
      <div className="max-w-2xl mx-auto p-4 py-8 ">
        <div className="space-y-6  p-5  border  shadow-lg rounded-lg ">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-primary ">Profile</h1>
            <p className="mt-2 text-gray-500">Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img 
                src={ selectedImage || authUser.profilePic || "/avatar.png"}
                alt="profile" 
                className='size-32 rounded-full object-cover border-4 border-primary p-1 '/>
                <label 
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0
                bg-secondary border border-gray-500 hover:scale-105
                p-2 rounded-full cursor-pointer
                transition-all duration-200
                
                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
                >
                  <Camera className={`w-5 h-5 text-primary `} />
                  <input 
                    type="file"
                    id='avatar-upload'
                    className='hidden'
                    accept='image/*'
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile} />
                </label>
            </div>
            <p className='text-sm text-gray-500'>
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="text-sm text-primary  flex items-center gap-2">
                <User className='size-4 text-primary'/>
                Full Name
              </div>
              <p className="px-4 py-2.5  backdrop-blur-md border p-5  shadow-lg rounded-lg text-gray-500">{authUser?.fullName}</p>
            </div>

            <div className="space-y-3 ">
              <div className="text-sm text-primary flex items-center gap-2">
                <Mail className='size-4 text-primary'/>
                Email Address
              </div>
              <p className="px-4 py-2.5  backdrop-blur-md border p-5  shadow-lg rounded-lg text-gray-500">{authUser?.email}</p>
            </div>
          </div>

          <div className="mt-6 py-2.5 backdrop-blur-md border shadow-lg rounded-lg text-primary p-6">
            <h2 className="text-lg font-medium mb-4 ">Account Information</h2>
            <div className="space-y-3 text-sm ">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span  >Member Since</span>
                <span className='text-gray-500'>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
          
        <button className='flex gap-2 items-center mx-2 bg-red-800 p-2 rounded-lg  text-white' onClick={logout}>
            <LogOut className='size-4'/>
            <span className='hidden sm:inline text-xs'>Logout</span>
        </button>
        </div>

        
      </div>
     
    </div>
  )
}

export default ProfilePage
