import { MessageSquare } from 'lucide-react'
import React from 'react'

const NoChatSelected = () => {
  return (
    <div className=' hidden md:flex lg:flex w-full flex-col items-center justify-center p-16 bg-white/20'>
      <div className="max-w-md text-center space-y-6">
        {/* Icon display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
              <MessageSquare className='size-8 text-conatiner'/>
            </div>
          </div>
        </div>

        {/* Welcome text */}
        <h2 className='text-2xl font-bold text-conatiner'>Welcome to Chatty!</h2>
        <p className="text-conatiner/50">
        Select a conversation from the sidebar to start chatting</p>
      </div>
      
    </div>
  )
}

export default NoChatSelected
