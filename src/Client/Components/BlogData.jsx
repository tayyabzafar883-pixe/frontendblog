import React, { useContext, useState } from 'react';
import { FaEdit, FaTrash, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { Context } from '../Context.jsx/Contextt';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const BlogData = ({ detail, likke, dislikee }) => {
  let [likeCheack, setLike] = useState(likke);
  let [dislikeCheack, setdisLike] = useState(dislikee);
  let [value, setDetail] = useState(detail);
  const navigate = useNavigate();
  const { user, userData } = useContext(Context);

  // DELETE BLOG
  const deleteBlog = async (id) => {
    try {
      let resp = await fetch(`https://blog-backend-2o1k.vercel.app/post/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      let jresp = await resp.json();
      if (jresp.success) {
        navigate('/home')
      } else if (jresp.message === 'invalid') {
        navigate('/login');
      } else {
        toast.error(jresp.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  // LIKE BLOG
  const like = async (action, id) => {
    try {
      let resp = await fetch(`https://blog-backend-2o1k.vercel.app/post/like/${id}`, {
        method: 'PUT',
        credentials: 'include',
      });
      let jresp = await resp.json();
      if (jresp.success) {
        setDetail(jresp.postt);
        let resp1 = jresp.postt.likes.find((data) => data === userData.idd);
        setLike(resp1);
        setdisLike('');
      } else if (jresp.message === 'invalid') {
        navigate('/login');
      } else {
        toast.error(jresp.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  // DISLIKE BLOG
  const disLike = async (action, id) => {
    try {
      let resp = await fetch(`https://blog-backend-2o1k.vercel.app/post/disLike/${id}`, {
        method: 'PUT',
        credentials: 'include',
      });
      let jresp = await resp.json();
      if (jresp.success) {
        setDetail(jresp.postt);
        let resp1 = jresp.postt.dislikes.find((data) => data === userData.idd);
        setdisLike(resp1);
        setLike('');
      } else if (jresp.message === 'invalid') {
        navigate('/login');
      } else {
        toast.error(jresp.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
        {/* BLOG IMAGE */}
        <div className="overflow-hidden rounded-xl">
          <img
            className="w-full h-[55vh] object-cover transform hover:scale-105 transition-transform duration-500"
            src={value.img}
            alt={value.title}
          />
        </div>

        {/* ACTION BUTTONS */}
        {value.user.email === user && (
          <div className="flex flex-wrap justify-end mt-4 gap-3">
            <Link to={`/update/${value._id}`}>
              <button className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors duration-200">
                <FaEdit /> Update
              </button>
            </Link>
            <button
              onClick={() => deleteBlog(value._id)}
              className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow transition-colors duration-200"
            >
              <FaTrash /> Delete
            </button>
          </div>
        )}

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center mt-6 mb-4 text-gray-900 tracking-tight">
          {value.title}
        </h1>

        {/* AUTHOR DETAILS */}
        <div className="flex flex-wrap justify-between items-center text-gray-600 text-sm mb-6 border-b pb-3 gap-2">
          <p><span className="font-semibold">Author:</span> {value.user.name}</p>
          <p><span className="font-semibold">Email:</span> {value.user.email}</p>
          <p><span className="font-semibold">Date:</span> {value.createdAt}</p>
        </div>

        {/* BLOG CONTENT */}
        <p className="text-gray-800 text-lg leading-8 tracking-wide mt-4 break-words whitespace-pre-wrap">
          {value.blogPara}
        </p>
      </div>

      {/* LIKE / DISLIKE */}
      <div className='flex items-center gap-3 text-gray-400 mt-4'>
        <div className='flex flex-col justify-center items-center'>
          <p>{value.likes.length}</p>
          <FaThumbsUp
            onClick={() => like('like', value._id)}
            className={likeCheack ? 'text-blue-500 cursor-pointer' : 'cursor-pointer'}
          />
        </div>
        <div className='flex flex-col justify-center items-center'>
          <p>{value.dislikes.length}</p>
          <FaThumbsDown
            onClick={() => disLike('dislike', value._id)}
            className={dislikeCheack ? 'text-blue-500 cursor-pointer' : 'cursor-pointer'}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogData;
