import React from 'react'
import User from '../Components/User'

const UserBlog = () => {
  console.log('user blog')
  return (
    <div className='mt-20 min-h-[100vh]'>
      <h1 className='text-2xl font-bold text-center mb-5'>USER BLOG</h1>

      {/* GRID WRAPPER */}
      <div className="md:col-span-3 grid-cols-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
        <User />
      </div>
    </div>
  )
}

export default UserBlog
