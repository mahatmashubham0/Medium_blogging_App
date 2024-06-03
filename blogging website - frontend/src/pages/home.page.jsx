import React, { useEffect, useState } from 'react'
import { auth } from "../services/api";
import { toast } from 'react-toastify';
import { apiConnector } from '../services/apiConnector';
import Blog from '../components/blog-post.component';



const Home = () => {
    const [blog , setBlog] = useState([])

    const fetchBlogs = async () => {
        try {
          const result =await apiConnector("get", auth.fetchBlogs_api);
          console.log(result.data.successResponse.data);
          setBlog(result.data.successResponse.data)
          console.log("==>",blog)
          toast.success(result.data.successResponse.message)
          toast.success(result.data.successResponse.data.user.
            personal_info.fullname
          )
        } catch (error) {
        //   console.log("error",error.AxiosError);
          console.log("==>",error);
        //   toast.error(error.response.data.errorResponse.message)
        //   console.log("Cloud not login the User Profile");
        }
       };

       useEffect(()=>{
        fetchBlogs()
       },[])

  return (
    <div className='flex flex-col items-center w-11/12 max-w-maxContent mx-auto space-y-8'>
        Blogs
        {
           blog.length == 0 ? <h1>loading</h1> : <p className='flex flex-wrap gap-6 mx-auto'>
              {
                 blog?.blogs?.map((data , key)=>{
                    return(
                      <Blog info={data} key={key}/>
                    )
                 })
              }
           </p>
        }
    </div>
  )
}

export default Home