import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react'
import React, { useState } from 'react'
import { useAuthStore } from '../Store/UseAuthStore'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { validateEmail, validatePassword } from '../utils/validation'
import suImg from "../assets/suImg.svg"

const SIgnUp = () => {
  const [formData, setFormData] = useState({
    fullName:"",
    email:"",
    password:""
  })

  const {signup, isSigningUp} = useAuthStore();

  const handleValidation = ()=>{
    if(!formData.fullName.trim()) return toast.error("Full name is required");
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
    if(success === true) signup(formData);
  }

  return (
    <div className='min-h-screen grid lg:grid-cols-2 md:grid-cols-2 w-full  text-conatiner'>
      {/*leftSide*/}
      <div className='flex flex-col justify-center items-center p-10 lg:ml-32'>
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center
              animate-bounce transition-colors">
                <MessageSquare className='size-6 text-conatiner'/>
              </div>
              <h1 className="text-2xl font-bold mt-2 text-conatiner">Create Account</h1>
              <p className='text-conatiner/60'>Get started with your free account</p>
            </div>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className="form-control space-y-2">
              <label className='label'>
                <span className="label-text font-medium text-conatiner">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className='size-5  text-conatiner z-50 '/>
                </div>
                <input 
                  type="text"
                  name='fullName'
                  className={`input input-bordered w-full pl-10 bg-white shadow-md`}
                  placeholder='John Doe'
                  value={formData.fullName}
                  onChange={(e) => handleonChange(e)} />
              </div>
            </div>

            <div className="form-control space-y-2">
              <label className='label'>
                <span className="label-text font-medium  text-conatiner">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail  className='size-5 text-base-content/40 z-50  text-conatiner'/>
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
                <span className="label-text font-medium  text-conatiner">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className='size-5 text-base-content/40 z-50  text-conatiner'/>
                </div>
                <input 
                  type="password"
                  name='password'
                  className={`input input-bordered w-full pl-10 bg-white shadow-md `}
                  placeholder='••••••••••••••'
                  value={formData.password}
                  onChange={(e) => handleonChange(e)} />
              </div>
            </div>

            <button type='submit' className='btn bg-conatiner w-full' disabled={isSigningUp}>
              {
                isSigningUp ? (
                  <>
                    <Loader2 className='size-5 animate-spin'/>
                    Loading...
                  </>
                ):(
                  "Create Account"
                )
              }
            </button>


          </form>

          <div className='text-center'>
            <p className=" text-conatiner">
            Already have an account?{" "}
            <Link to="/login" className='link text-primary'>Sign in</Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side  add next col design her with title and message with it*/}
      <div className='lg:-ml-52 flex-col items-center justify-center hidden lg:flex md:flex'>
         <img src={suImg} className="size-[70%] lg:size-[50%]" alt="" />
        </div>
      
    </div>
  )
}

export default SIgnUp
