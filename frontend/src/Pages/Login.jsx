import React, { useState } from 'react'
import lImg from "../assets/lImg.svg"
import { useAuthStore } from '../Store/UseAuthStore'
import { Loader2, Lock, Mail, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/validation';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
      email:"",
      password:""
    })

    const {login, isLoggingIn} = useAuthStore();

    const handleValidation = ()=>{
      if(!formData.email.trim()) return toast.error("Email is required")
      if(!validateEmail(formData.email)) return toast.error("Invalid email format")
      if(!formData.password) return toast.error("Password is required")
      if(!validatePassword(formData.password)) return toast.error("Password must be atleast 6 characters")
      return true;
    }
  
    const handleonChange = (e)=>{
      setFormData({...formData, [e.target.name]: e.target.value})
    }
  
    const handleSubmit = (e)=>{
      e.preventDefault();
      const success = handleValidation();
      if(success === true) login(formData)
    }


  return (
    <div className='min-h-screen  grid lg:grid-cols-2 md:grid-cols-2 w-full text-primary p-4'>
      {/*leftSide*/}
      <div className='flex flex-col justify-center items-center p-10 lg:ml-32 '>
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary text-secondary flex items-center justify-center
              animate-bounce transition-colors">
                <MessageSquare className='size-6 text-secondary'/>
              </div>
              <h1 className="text-2xl font-bold mt-2 text-primary">Welcome Back</h1>
              <p className='text-lightShade text-sm'>Sign in to your account</p>
            </div>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6  '>

            <div className="form-control space-y-2 ">
              <label className='label'>
                <span className="label-text font-medium text-primary ">Email</span>
              </label>
              <div className="relative  ">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail  className='size-5  z-50 '/>
                </div>
                <input 
                  type="email"
                  name='email'
                  className={`input input-bordered w-full pl-10 bg-white shadow-md`}
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={(e) => handleonChange(e)} />
              </div>
            </div>

            <div className="form-control space-y-2">
              <label className='label'>
                <span className="label-text font-medium text-pimary">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className='size-5 text-primary  z-50 '/>
                </div>
                <input 
                  type="password"
                  name='password'
                  className={`input input-bordered w-full pl-10 bg-white shadow-md`}
                  placeholder='••••••••••••••'
                  value={formData.password}
                  onChange={(e) => handleonChange(e)} />
              </div>
            </div>

            <button type='submit' className='btn bg-primary text-secondary w-full' disabled={isLoggingIn}>
              {
                isLoggingIn ? (
                  <>
                    <Loader2 className='size-5 animate-spin'/>
                    Loading...
                  </>
                ):(
                  "Login"
                )
              }
            </button>


          </form>

          <div className='text-center'>
            <p className="text-primary">
           New user?{" "}
            <Link to="/signup" className='link text-lightShade'>create new account</Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side  add next col design her with title and message with it*/}
      <div className='lg:-ml-52 flex-col items-center justify-center hidden lg:flex md:flex'>
               <img src={lImg} className="size-[70%] lg:size-[50%]" alt="" />
              </div>
    </div>
  )
}

export default Login
