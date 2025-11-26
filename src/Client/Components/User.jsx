import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const User = () => {
  let [blog, setBlog] = useState([])
  let navigate = useNavigate()

  useEffect(() => {

    const getBlog = async () => {
      try {
        let resp = await fetch(`https://blog-backend-2o1k.vercel.app/post/getuserpost`, {
          credentials: 'include'
        })
        let jresp = await resp.json()

        if (jresp.success) {
          setBlog(jresp.resp)
        }
        else if (jresp.message === 'invalid') {
          navigate('/login')
        }
        else {
          toast.error(jresp.message || "Something went wrong")
        }
      } catch (error) {
        toast.error("Something went wrong")
      }
    }

    getBlog()
  }, [])

  return (
    blog.length > 0 ? (
      blog.map((data) => (
        <Link to={`/detail/${data._id}`} key={data._id}>
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition h-full flex flex-col">

            <img
              src={data.img}
              alt="Blog"
              className="w-full h-40 object-cover rounded-t-xl"
            />

            <div className="p-4 flex flex-col h-full">

              <p className="text-sm text-gray-500 break-words">{data.category}</p>

              <h3 className="text-lg font-bold text-gray-800 break-words">
                {data.title.length > 20 ? data.title.slice(0, 20) + '...' : data.title}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                Author: <span className="font-medium">{data.user.name}</span>
              </p>

              <p className="text-sm text-gray-500 mt-2 break-words">
                {data.blogPara.length > 200 ? data.blogPara.slice(0, 200) + '...' : data.blogPara}
              </p>

              <p className="text-xs text-gray-400 mt-auto">{data.createdAt}</p>

            </div>

          </div>
        </Link>
      ))
    ) : (
      <div className='flex justify-center items-center text-3xl font-medium col-span-full h-[100vh]'>
        <h1>No record found</h1>
      </div>
    )
  )
}

export default User
