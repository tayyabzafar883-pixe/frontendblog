import React, { useEffect, useState, useContext } from 'react'
import BlogComment from '../Components/BlogComment'
import BlogData from '../Components/BlogData'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Context } from '../Context.jsx/Contextt'

const BlogDetail = () => {
  let [lik, setLik] = useState('')
  let [unlik, setUnLik] = useState('')
  let { userData } = useContext(Context)
  let navigate = useNavigate()
  let [userPost, setUser] = useState('')
  let [data, setData] = useState('')
  let { id } = useParams()

  useEffect(() => {
    console.log('parent effect')

    const getBlog = async () => {
      try {
        let resp = await fetch(` https://blog-backend-6kdu.vercel.app/api/post/getDetail/${id}`, {
          credentials: 'include'
        })
        console.log('parent api call ka baad')
        let jresp = await resp.json()
        console.log('parent json ka baad', jresp)

        if (jresp.success) {
          setData(jresp.resp)
          setUser(jresp.resp.user.email)

          let resp1 = jresp.resp.likes.find((data) => data === userData.idd)
          setLik(resp1)

          let resp2 = jresp.resp.dislikes.find((data) => data === userData.idd)
          setUnLik(resp2)
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
  }, [id, navigate, userData.idd])

  return (
    <div className='min-h-[100vh] break-word mt-20 px-1 lg:px-8'>
      {data ? <BlogData detail={data} likke={lik} dislikee={unlik} /> : null}
      <BlogComment id={id} userP={userPost} />
    </div>
  )
}

export default BlogDetail
