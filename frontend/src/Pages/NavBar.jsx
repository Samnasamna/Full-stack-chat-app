import { LogOut, MessageSquare, Moon, Settings, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../Store/UseAuthStore'

const NavBar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
      if (theme === "dark") {
          document.documentElement.classList.add("dark");
      } else {
          document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
  }, [theme]);

  
  return (
    <header className="h-fit  p-5 bg-white/70 border-conatiner/40  shadow-conatiner drop-shadow-lg rounded-lg text-conatiner w-16 mx-5 mt-5 mb-10">

      <div className=" flex items-center h-[43em]">
        <div className='flex flex-col items-center justify-between h-full w-full'>
          <div className="">
              <Link to="/" className='hover:opacity-80 transition-all '>
                <div className="size-9 rounded-lg border-none bg-primary/20 flex items-center justify-center ">
                  <MessageSquare className='w-5 h-5 text-conatiner'/>
                </div>
              </Link>
          </div>

          <div className="flex flex-col gap-3 ">
            <div className=' p-3 bg-transparent  text-conatiner hover:text-primary' onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                  {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-[18px]" />} 
                </div>

                <Link 
                  to={"/profile"} 
                  className={`p-3 bg-transparent botext-conatiner hover:text-primary`}>
                      <User className='size-5 '/>
                    </Link>
            </div>
          </div>
        
      </div>

      {/* <div className='flex flex-col items-center justify-between h-full'>
          <div className="flex items-center gap-8">
            <Link to="/" className='hover:opacity-80 transition-all '>
              <div className="size-9 rounded-lg bg-primary/20 flex items-center justify-center ">
                <MessageSquare className='w-5 h-5 text-white hover:text-primary'/>
              </div>
            </Link>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className='btn btn-sm p-2 rounded-full ' onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />} 
            </div>

            <Link to={"/profile"} className={`btn btn-sm p-2 rounded-full`}>
                  <User className='size-4'/>
                </Link>
          </div>
        </div> */}
    </header>



  )
}

export default NavBar
