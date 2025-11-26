import React, { useContext, useEffect } from 'react'
import { Context } from '../Context.jsx/Contextt'
import { useNavigate } from 'react-router-dom'
const ProtectedRoute = ({children}) => {
    let navigate=useNavigate()
    console.log('protected')
  let {user}=  useContext(Context)
  useEffect(()=>{

if(!user){
    navigate('/login')
}
  },[])
  return (
    <div>
    {
        (user)?children:null
    }
    </div>
  )
}

export default ProtectedRoute
