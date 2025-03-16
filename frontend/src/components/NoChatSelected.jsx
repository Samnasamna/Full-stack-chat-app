import { Coffee } from 'lucide-react'
import React from 'react'


const NoChatSelected = () => {

  return (
    <div className=' hidden md:flex lg:flex w-full flex-col items-center justify-center p-16 bg-transparent'>
      <div className="max-w-md text-center space-y-6">
        {/* Icon display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="size-16 rounded-2xl bg-primary flex items-center justify-center animate-bounce">
              <Coffee  className={`size-8 text-secondary`}/>
            </div>
          </div>
        </div>

        {/* Welcome text */}
        <h2 className='text-2xl font-bold text-primary'>Welcome to YAPNET!</h2>
        <p className="text-lightShade">
        Pick a chat from the sidebar and spill some piping hot tea!</p>
      </div>
      
    </div>
  )
}

export default NoChatSelected
