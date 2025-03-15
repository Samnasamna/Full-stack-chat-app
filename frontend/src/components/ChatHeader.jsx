import React from 'react'
import { useChatStore } from '../Store/useChatStore'
import { useAuthStore } from '../Store/UseAuthStore'
import { X } from 'lucide-react';

const ChatHeader = () => {
    const {selectedUser, setSelectedUser} = useChatStore();
    const {onlineUsers} = useAuthStore();
  return (
    <div className='p-3  border-b-2 border-conatiner/20 sticky'>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="avatar">
                    <div className="size-8 rounded-full relative">
                        <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
                    </div>
                </div>

                {/* UserInfo */}
                <div>
                    <h3 className="font-medium text-conatiner">{selectedUser.fullName}</h3>
                    <p className="text-sm text-gray-600">
                    {onlineUsers.includes(selectedUser._id)? "Online" : "Offline"}</p>
                </div>
            </div>

            {/* Close Button */}
            <button onClick={()=> setSelectedUser(null)}><X className='text-conatiner'/></button>
            
        </div>
    </div>
  )
}

export default ChatHeader