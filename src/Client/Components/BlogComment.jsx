import React, { useContext, useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import { Context } from '../Context.jsx/Contextt';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BlogComment = ({id, userP}) => {
  let navigate = useNavigate();
  let { user } = useContext(Context);
  let [comments, setComments] = useState([]);
  let [comment, setComment] = useState('');

  // GET COMMENTS
  let getComment = async () => {
    try {
      let resp = await fetch(` https://blog-backend-6kdu.vercel.app/api/comment/get/${id}`, {
        credentials: 'include'
      });
      let jresp = await resp.json();
      if (jresp.success) {
        setComments(jresp.resp);
        setComment('');
      } else if (jresp.message === 'invalid') {
        navigate('/login');
      } else {
        toast.error(jresp.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  useEffect(() => {
    getComment();
  }, []);

  // SUBMIT COMMENT
  let submitComm = async () => {
    try {
      let resp = await fetch(' https://blog-backend-6kdu.vercel.app/api/comment/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ id: id, comment })
      });
      let jresp = await resp.json();
      if (jresp.success) {
        getComment();
      } else if (jresp.message === 'invalid') {
        navigate('/login');
      } else {
        toast.error(jresp.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  // DELETE COMMENT
  let deleteC = async (cid) => {
    try {
      let resp = await fetch(` https://blog-backend-6kdu.vercel.app/api/comment/delete/${cid}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      let jresp = await resp.json();
      if (jresp.success) {
        getComment();
      } else if (jresp.message === 'invalid') {
        navigate('/login');
      } else {
        toast.error(jresp.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  return (
    <div className="mt-10 pb-4">
      {/* COMMENT INPUT BOX */}
      <div className="flex items-start gap-3 pb-20">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full h-28 p-3 text-black border border-gray-300 rounded-xl outline-none focus:border-blue-500 shadow-sm"
          placeholder="Write your comment..."
        ></textarea>

        <button onClick={submitComm} className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-xl shadow">
          Post
        </button>
      </div>

      <h1>Comments: {comments.length}</h1>
      {comments.map((data) => (
        <div key={data._id} className="bg-gray-100 mt-6 p-4 rounded-xl shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 text-gray-700">
              <p className="font-semibold">{data.user.email}</p>
              <p className="text-sm text-gray-500">{data.createdAt}</p>
            </div>

            {(data.user.email === user || userP === user) && (
              <button
                onClick={() => deleteC(data._id)}
                className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                <FaTrash size={14} />
              </button>
            )}
          </div>

          <p className="mt-2 text-gray-800 leading-6">{data.title}</p>
        </div>
      ))}
    </div>
  )
}

export default BlogComment;
