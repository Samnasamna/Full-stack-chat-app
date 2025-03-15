import React from 'react'
import NavBar from './NavBar'
import SideBar from "../components/SideBar"
import NoChatSelected from "../components/NoChatSelected"
import ChatContainer from "../components/ChatContainer"
import { useChatStore } from '../Store/useChatStore'

const HomePage = () => {
  const {selectedUser} = useChatStore();
  return (
    <div className='h-screen w-full py-5 '>
      <div className="flex items-center px-4 ">
        <div className="bg-conatiner/10 rounded-lg shadow-lg w-full min-w-6xl h-[46rem] ">
          <div className="flex  h-full rounded-lg overflow-hidden">
            <SideBar/>

            {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}
          </div>
        </div>
      </div>
       
    </div>
  )
}

export default HomePage
