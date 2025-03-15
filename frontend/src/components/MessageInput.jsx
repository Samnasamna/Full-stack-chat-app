import React, { useRef, useState } from 'react'
import { useChatStore } from '../Store/useChatStore';
import { Image, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';

const MessageInput = () => {
  const [text, setText] = useState("")
  const [imagePreview, setimagePreview] = useState("")
  const fileInputRef = useRef(null);
  const {sendMessage} = useChatStore()

  const handleImageChange =(e)=>{
    const file = e.target.files[0]
    if(!file.type.startsWith("image/")){
      toast.error("please select an image file")
      return
    }

    const reader = new FileReader();
    reader.onloadend = ()=>{
      setimagePreview(reader.result)
    }
    reader.readAsDataURL(file);
  }

  const removeImage = ()=>{
    setimagePreview(null)
    if(fileInputRef.current) fileInputRef.current.value ="";
  }

  const handleSendMessage = async(e)=>{
    e.preventDefault()
    if(text?.trim() == "" && !imagePreview ) return

    try {
      await sendMessage({
        text:text.trim(),
        image:imagePreview,
      })

      setText("")
      setimagePreview("")
      if(fileInputRef.current) fileInputRef.current.value ="";
    } catch (error) {
      console.log("Failed to send message", error)
    }
  }

  return (
    <div className='p-4 w-full '>
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2 ">
          <div className="relative">
            <img src={imagePreview} alt="Preview"
            className='size-20 object-cover rounded-lg border border-conatiner' />

            <button 
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300
              flex items-center justify-center" type='button'>
                <X className='size-3 text-white'/>
              </button>
          </div>
        </div>
      )}

      <form className='flex items-center gap-2' onSubmit={handleSendMessage}>
        <div className="flex-1 flex gap-2 ">
          <input 
            type="text"
            className='w-full input input-bordered rounded-lg input-sm sm:input-md bg-white text-conatiner shadow-md'
            placeholder='Type a message...'
            value={text}
            onChange={(e)=> setText(e.target.value)} />

            <input 
              type="file"
              accept='image/*'
              className='hidden'
              ref={fileInputRef}
              onChange={handleImageChange} />

              <button 
                type='button'
                className={`hidden sm:flex btn btn-circle bg-transparent border-none shadow-none 
                ${imagePreview? "text-emerald-500" : "text-zinc-400"}`}
                onClick={()=> fileInputRef.current?.click()}>
                  <Image size={20} className='text-conatiner '/>
                </button>
        </div>

        <button
          type='submit'
          className={` btn btn-sm btn-circle ${text?.trim() == "" && !imagePreview && "text-conatiner"  }  `}
          disabled={text?.trim() == "" && !imagePreview}><Send size={20}/></button>
      </form>

    </div>
  )
}

export default MessageInput