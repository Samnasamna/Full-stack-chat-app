import React, { useEffect, useRef } from 'react'
import {useChatStore} from "../Store/useChatStore"
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import { useAuthStore } from '../Store/UseAuthStore';
import { formatMessageTime } from '../utils/validation';

const ChatContainer = () => {
  const {messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const {authUser} = useAuthStore();
  const messageEndRef = useRef(null)

  
  useEffect(()=>{
    getMessages(selectedUser._id)

    subscribeToMessages();

    return ()=> unsubscribeFromMessages()
    
  },[selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages])

  useEffect(()=>{
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({behavior: "smooth"})
    }
  }, [messages])

  if(isMessagesLoading){ 
    return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>
      <MessageSkeleton/>
      <MessageInput/>
    </div>
  )}

  console.log(messages)

  

  return (
    <div className={`flex-1 flex flex-col  ${selectedUser && "sm:flex"} w-full relative `}>
      <ChatHeader/>
      
      <div className="relative flex-1 overflow-y-auto p-4 space-y-4  ">
        {messages.map((message) =>{
          return <div className={`chat  ${message.senderId === authUser._id ? "chat-end" : "chat-start"} `} key={message._id} ref={messageEndRef}>

            <div className="chat-image avatar">
              <div className="size-7 rounded-full border">
                <img 
                  src={message.senderId === authUser._id  ? 
                      authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"} 
                  alt="profile pic" />
              </div>
            </div>

            <div className="chat-header mb-1 ">
              <time datetime="" className='text-xs opacity-50 ml-1 text-primary'>{formatMessageTime(message.createdAt)}</time>
            </div>

            <div className={`chat-bubble shadow-lg shadow-gray ${message.image && "p-1.5 rounded-lg"} flex flex-col  ${message.senderId === authUser._id ? "bg-primary text-secondary":"bg-secondary text-primary"} `}>
              {message.image && (
                <img
                  src={message.image}
                  alt='Attachment'
                  className='max-w-[150px] rounded-md '
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>

          </div>
        })}
      </div>

      <MessageInput/>
      
    </div>
  )
}

export default ChatContainer
