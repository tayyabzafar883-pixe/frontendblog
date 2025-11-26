import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export let Context = createContext('')

const Contextt = ({ children }) => {
  let [userData, setData] = useState({ name: '', img: '', idd: '' })
  let navigate = useNavigate()
  let [user, setUser] = useState(false)
  let [blog, setBlog] = useState([])
  let [filter, setFilter] = useState([])

  console.log('context')

  let getBlog = async () => {
    try {
      let resp = await fetch(`http://localhost:3000/post/getpost`, {
        credentials: "include",
      })
      let jresp = await resp.json()
      console.log(jresp, "blg ")
      if (jresp.success) {
        setBlog(jresp.resp)
        setFilter(jresp.resp)
      } else if (jresp.message === "invalid") {
        navigate("/login")
      } else {
        toast.error(jresp.message || "Something went wrong")
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <Context.Provider value={{ user, setUser, blog, setBlog, filter, userData, setData, getBlog }}>
      {children}
    </Context.Provider>
  )
}

export default Contextt
