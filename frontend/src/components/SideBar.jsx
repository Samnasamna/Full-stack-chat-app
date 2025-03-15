import React, { useEffect, useState } from 'react'
import SideBarSkeleton from "../skeletons/SideBarSkeleton"
import { useChatStore } from '../Store/useChatStore'
import {Users } from 'lucide-react';
import { useAuthStore } from '../Store/UseAuthStore';

const SideBar = () => {
  const {getUsers, users, selectedUser, setSelectedUser, isUsersLoading} = useChatStore();
  const {onlineUsers} = useAuthStore()
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)

  useEffect(()=>{
    getUsers()
  },[getUsers])


  const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users;

  if(isUsersLoading) return <SideBarSkeleton/>


  return (
    <div className={`w-full md:w-[15%] lg:w-[30%] h-full  border-lightShade  lg:border-r md:border-r border-r-container/20 
      drop-shadow-sm flex flex-col transition-all duration-200 
      ${selectedUser ? "hidden md:block lg:block" : ""}`}  >
      <div className="w-full p-5   drop-shadow-sm">
        <div className="flex items-center gap-2  ">
          <Users className='size-6 text-primary ' />
          <span className="font-semibold md:hidden text-lg block text-container lg:block text-primary ">Contacts</span>
        </div>


        {/*Online filter toggle */}
        <div className="  mt-4 hidden lg:flex items-center gap-2">
          <label  className="cursor-pointer flex items-center gap-2">
            <input 
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e)=> setShowOnlineOnly(e.target.checked)}
              className={`checkbox checkbox-sm border border-primary text-primary `} />
              <span className="text-sm text-gray-500">Show online only</span>
          </label>
          <span className='text-xs text-gray-500'>({onlineUsers.length -1} online)</span>
        </div>
      </div>


      <div className={`overflow-auto w-full py-2  `}>
        {filteredUsers.map((user)=>{
          return <div  key={user._id} 
          className={`hover:bg-lightShade  p-1 transition-colors cursor-pointer 
            ${selectedUser?._id === user._id ? "bg-lightShade ": "" }`}
          onClick={()=>{setSelectedUser(user)}}>
          <button 
            className={`
             p-3 flex gap-4
            `}

          >
            <div className="relative mx-auto lg:mx-0">
              <img src={user.profilePic || "/avatar.png"} alt={user.name}
              className='size-12 object-cover rounded-full' />

              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 
                rounded-full "></span>
              )}
            </div>

            <div className="block lg:block md:hidden text-left min-w-0">
              <div className="font-medium truncate text-primary ">{user.fullName}</div>
              <div className="text-sm  text-gray-500">
                {onlineUsers.includes(user._id)? "Online" : "Offline"}
              </div>
            </div>
          </button>
          </div>
        })}

        {filteredUsers.length === 0 &&(
          <div className="text-center text-primary py-4">No online users</div>
        )}
      </div>
    </div>
  )
}

export default SideBar
