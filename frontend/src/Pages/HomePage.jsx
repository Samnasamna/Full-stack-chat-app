import React from 'react'
import NavBar from './NavBar'
import SideBar from "../components/SideBar"
import NoChatSelected from "../components/NoChatSelected"
import ChatContainer from "../components/ChatContainer"
import { useChatStore } from '../Store/useChatStore'
import useThemeStore from '../Store/useThemeStore'
const HomePage = () => {
  const {selectedUser} = useChatStore();
  const {theme} = useThemeStore();
  return (
    <div className='h-screen w-full py-5 '>
      <div className="flex items-center px-4 ">
        <div className={`bg-container/5 border border-lightShade  rounded-lg   w-full min-w-6xl h-[46rem] `}>
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
