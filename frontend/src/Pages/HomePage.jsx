import React from 'react'
import SideBar from "../components/SideBar"
import NoChatSelected from "../components/NoChatSelected"
import ChatContainer from "../components/ChatContainer"
import { useChatStore } from '../Store/useChatStore'

const HomePage = () => {
  const {selectedUser} = useChatStore();
  return (
    <div className='h-screen w-full lg:py-5 '>
      <div className="flex items-center px-4 lg:pr-4 pr-0 ">
        <div className={`bg-transparent border border-lightShade  lg:rounded-lg   w-full min-w-6xl lg:h-[46rem] h-screen `}>
          <div className="flex  h-full rounded-lg overflow-hidden shadow-xl ">
            <SideBar/>

            {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}
          </div>
        </div>
      </div>
       
    </div>
  )
}

export default HomePage
