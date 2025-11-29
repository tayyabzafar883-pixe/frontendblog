import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEdit } from 'react-icons/fa';

const BlogCreation = () => {
  let { category, id } = useParams();
  let [imgData, setImg] = useState('');
  let [title, setTitle] = useState('');
  let [blogPara, setBlog] = useState('');
  let [categ, setCate] = useState(category);

  let navigate = useNavigate();

  // Get blog detail if updating
  useEffect(() => {
    if (id) {
      let getBlog = async () => {
        try {
          let resp = await fetch(`http://localhost:3000/post/getDetail/${id}`, {
            credentials: 'include'
          });
          let jresp = await resp.json();
          if (jresp.success) {
            setImg({ img: jresp.resp.img });
            setTitle(jresp.resp.title);
            setBlog(jresp.resp.blogPara);
            setCate(jresp.resp.category);
          } else if (jresp.message === 'invalid') {
            navigate('/login');
          } else {
            toast.error(jresp.message);
          }
        } catch (error) {
          toast.error('Something went wrong');
        }
      }
      getBlog();
    }
  }, [id, navigate]);

  // Update blog
  let update = async () => {
    try {
      let resp = await fetch('/post/update', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id, title, blogPara })
      });
      let jresp = await resp.json();
      if (jresp.success) {
        navigate("/home");
      } else if (jresp.message === 'invalid') {
        navigate('/login');
      } else {
        toast.error(jresp.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  // Upload image
  let img = async (e) => {
    try {
      let formData = new FormData();
      formData.append("blog", e.target.files[0]);
      let resp = await fetch('http://localhost:3000/post/createImg', {
        method: "POST",
        credentials: 'include',
        body: formData
      });
      let jresp = await resp.json();
      if (jresp.success) {
        setImg({ img: jresp.CreatePost.img, id: jresp.CreatePost._id });
      } else if (jresp.message === 'invalid') {
        navigate('/login');
      } else {
        toast.error(jresp.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  // Publish blog
  let publish = async () => {
    if (!title) return toast.warning("Please enter a blog title");
    if (!blogPara) return toast.warning("Please write your blog content");
    if (!imgData) return toast.warning("Please upload a blog image");

    try {
      let resp = await fetch(`http://localhost:3000/post/createpost`, {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title, blogPara, id: imgData.id, category: categ })
      });
      let jresp = await resp.json();
      if (jresp.success) {
        navigate("/home");
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
    <div className="mt-20 p-4 lg:p-10 max-w-5xl mx-auto">
      {/* IMAGE PREVIEW */}
      <div className="w-full h-[55vh] bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden shadow-lg">
        {imgData ? (
          <img src={imgData.img} className="w-full h-full object-cover rounded-xl" />
        ) : (
          <p className="text-4xl font-bold text-gray-500">BLOG IMAGE</p>
        )}
      </div>

      {/* UPLOAD + TITLE + PUBLISH */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex flex-col gap-3 w-[70%]">
          <div className='flex items-center'>
            <label htmlFor='img' className='text-2xl font-bold'>+</label>
            <input id='img' onChange={img} type="file" className="text-sm hidden" />
          </div>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Write your blog title..."
            className="w-full text-3xl font-semibold border-b border-gray-400 outline-none pb-2"
          />
        </div>

        {id ? (
          <button onClick={update} className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">
            <FaEdit /> Update
          </button>
        ) : (
          <button onClick={publish} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow">
            Publish
          </button>
        )}
      </div>

      {/* BLOG PARAGRAPH */}
      <textarea
        value={blogPara}
        onChange={(e) => setBlog(e.target.value)}
        placeholder="Tell your story..."
        className="w-full mt-8 p-5 text-lg leading-7 border border-gray-300 rounded-xl outline-none min-h-[55vh] shadow-sm"
      ></textarea>
    </div>
  );
};

export default BlogCreation;
