import React, { useContext } from 'react'
import Nav from '../Components/Nav'
import Footer from '../Components/Footer'
import { Context } from '../Context.jsx/Contextt'
import { Outlet, useLocation } from 'react-router-dom'
const Layout = () => {
   let{user}= useContext(Context)
   let location= useLocation()
   console.log(location)
  return (
    <div>
    {(location.pathname=='/'||location.pathname=='/login')?null:  <Nav/>}
      <Outlet/>
       {(location.pathname=='/'||location.pathname=='/login')?null:  <Footer/>}
    </div>
  )
}

export default Layout
