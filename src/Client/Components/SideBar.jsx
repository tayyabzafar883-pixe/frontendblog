import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../Context.jsx/Contextt";
import { useContext } from "react";
const SideBar = () => {
  let navigate = useNavigate();
  let{setBlog,filter}=useContext(Context)

  let [cate, setCate] = useState("");

  console.log("category in sidebar", cate);
  let category = (e) => {
    console.log(e.target.innerText);
    setCate(e.target.innerText);

if(e.target.innerText!='All'){
  let filterData=filter.filter((item)=>{

  return item.category==e.target.innerText
  
})

setBlog(filterData)
}
else{
  setBlog(filter)
}

  };

  let createBlog = () => {
    if (cate=='All'||cate=='') {
      
    }
    else{
      navigate(`/create/${cate}`);
    }
  };

  return (
    <div>
      <div className="w-full bg-white shadow-md rounded-xl p-4 space-y-4">
       
         <button
          onClick={createBlog}
          className={`w-full text-white font-semibold py-2 rounded-lg ${
            (cate=='All'||cate=='') ? "bg-blue-300"  : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
          }`}
        >
          CREATE BLOG
        </button>
       

        <h3 className="text-lg font-bold text-gray-700 border-b pb-2">
          All Categories
        </h3>

        <ul onClick={category} className="space-y-2 text-gray-600">
          <li  className={`hover:text-blue-600 cursor-pointer ${('Music'==cate)?'text-blue-600':null}`}>Music</li>
          <li  className={`hover:text-blue-600 cursor-pointer ${('Movies'==cate)?'text-blue-600':null}`}>Movies</li>
          <li  className={`hover:text-blue-600 cursor-pointer ${('Sports'==cate)?'text-blue-600':null}`}>Sports</li>
          <li  className={`hover:text-blue-600 cursor-pointer ${('Web Development'==cate)?'text-blue-600':null}`}>
            Web Development
          </li>
          <li  className={`hover:text-blue-600 cursor-pointer ${('Education'==cate)?'text-blue-600':null}`}>Education</li>
            <li  className={`hover:text-blue-600 cursor-pointer ${('All'==cate)?'text-blue-600':null}`}>All</li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
