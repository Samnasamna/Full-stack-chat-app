import { Coffee, LogOut, MessageSquare, Moon, Settings, Sun, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useThemeStore from '../Store/useThemeStore'

const NavBar = () => {
  const {theme, toggleTheme} = useThemeStore();
  
  return (
    <header className={` h-fit  p-5   shadow-container lg:border  border-lightShade drop-shadow-lg rounded-lg w-12 lg:w-16 lg:mx-5 sm:-mr-2 lg:mt-5 lg:mb-10 `}>
      <div className=" flex  items-center  lg:h-[43em] h-[45em]">
        <div className='flex flex-col items-center justify-between h-full w-full'>
          <div className="">
              <Link to="/" className='hover:opacity-80 transition-all '>
                <div className={`size-9 rounded-lg border-none  flex items-center justify-center bg-primary text-secondary `}>
                  <Coffee className='w-5 h-5'/>
                </div>
              </Link>
          </div>

          <div className="flex flex-col gap-3 ">
            <div className=' p-3 bg-transparent  text-primary hover:text-lightShade cursor-pointer' onClick={toggleTheme}>
                  {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-[18px]" />} 
                </div>

                <Link 
                  to={"/profile"} 
                  className={`p-3 bg-transparent  text-primary hover:text-lightShade`}>
                      <User className='size-5 '/>
                    </Link>
            </div>
          </div>
        
      </div>


    </header>



  )
}

export default NavBar
