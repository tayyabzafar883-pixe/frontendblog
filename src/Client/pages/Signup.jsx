import { useState } from "react";
import { Link } from "react-router-dom"

export default function Signup() {
  let[message,setmessage]=useState('')
  let [name,setName]=useState('')
  let [email,setEmail]=useState('')
  let[password,setPassword]=useState('')
let[error,seterror]=useState('')
  let submit=async(e)=>{
    let error={}

    e.preventDefault()
    console.log('submit',name,email,password)
    if(name==''){
      error.name='please fill this first'
    }
    if(email==''){
      error.email='please fill this first'
    }
    if(password==''){
      error.password='please fill this first'
    }

    if(Object.keys(error).length==0){
    let resp= await  fetch(` https://blog-backend-6kdu.vercel.app/api/user/create`,{
        method:'POST',
        credentials:'include',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({name,email,password})

      })
     let jresp= await resp.json()
     console.log(jresp)
    if(!jresp.success){
      setmessage(jresp)
      seterror(error)
    }
    else{
      setmessage(jresp)
      seterror(error)
    }
    }
    else{
seterror(error)
    }
      }
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-white/90 backdrop-blur-md w-full max-w-md rounded-2xl shadow-2xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Your Account ✨
        </h2>

        {/* Form */}
        <form onSubmit={submit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input value={name}
            onChange={(e)=>{
setName(e.target.value)
            }}
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-red-600">{error.name}</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
            value={email}
            onChange={(e)=>{
setEmail(e.target.value)
            }}
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-red-600">{error.email}</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input 
            value={password}
            onChange={(e)=>{
setPassword(e.target.value)
            }}
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-red-600">{error.password}</p>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg shadow-lg transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Button */}
       <p className={` text-center ${message.success?'text-green-500':'text-red-500'}`}>{message.message}</p>

        {/* Login Link */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
         
          <Link className='text-purple-600 font-medium hover:underline' to={'/login'}>Loginhahaja</Link>
        </p>
      </div>
    </div>
  );
}
