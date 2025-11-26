import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../Context.jsx/Contextt";
const BlogCard = () => {
 let {blog,getBlog}=useContext(Context)
 console.log('blog data ',blog)
  let navigate = useNavigate();
  useEffect(()=>{
    getBlog()
  },[])

  

  return blog.length>0? blog.map((data) => {
    return (
      <Link to={`/detail/${data._id}`} key={data._id}>
        <div className="bg-white rounded-xl shadow-md  hover:shadow-lg transition">
          <img
            src={data.img}
            alt="Blog"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <p className="text-sm text-gray-500">{data.category}</p>
            <h3 className="text-lg font-bold text-gray-800">
              {data.title.length > 20
                ? data.title.slice(0, 20) + "..."
                : data.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Author: <span className="font-medium">{data.user.name}</span>
            </p>
            <p className="text-sm text-gray-500 mt-2 break-words">
              {data.blogPara.length > 200
                ? data.blogPara.slice(0, 200) + "..."
                : data.blogPara}
            </p>
            <p>{data.createdAt}</p>
          </div>
        </div>
      </Link>
    );
  }):<div className="col-span-full flex justify-center font-bold"><p>No result</p></div>;
};

export default BlogCard;
