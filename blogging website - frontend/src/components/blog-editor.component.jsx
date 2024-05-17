import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import EditorJS from '@editorjs/editorjs'
import toast from "react-hot-toast";

// components
import logo from "../imgs/logo.png";
import PageAnimation from "../common/page-animation";
const name = "shubham mahatma";
import blogbanner from '../imgs/blog banner.png'
import { EditorContext } from "../pages/editor.pages";
import {tools} from './tools.component'
import { auth } from "../services/api";
import { apiConnector } from "../services/apiConnector";

const BlogEditor = () => {

  const handleUploadImage = async (e) => {
         const file = e.target.files[0]
         let formData;
         if (file) {
        // console.log(file)
        //  previewFile(file)
        //  setImageFile(file)

          formData = new FormData()
          formData.append("bannerImage", file)
       }

    try {
      const result =await apiConnector("POST", auth.image_api , formData);
      console.log("Photo Uploaded successfully", result);
      console.log(result?.data?.successResponse?.data);
      toast.success("Image Uploaded")
      toast.success(result?.data?.successResponse?.data?.user?.
        personal_info?.fullname
      )
    } catch (error) {
      console.log("error",error.AxiosError);
      console.log("==>",error);
      toast.error(error?.response?.data?.errorResponse?.message)
      console.log("Cloud not login the User Profile");
    }

  }

  const handleTitleChange = (e) => {
    let input = e.target;
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px' 
    setBlog({...blog , title: e.target.value})
  }

  

  useEffect(()=>{
    setTextEditor(new EditorJS({
      holderId: "textEditor",
      data: content,
      tools: tools,
      placeholder: "Let's write an awesome story"
    }))
  },[])

  let {blog , setBlog , blog: {title , description , banner , content , tags} , setEditorState
  , textEditor , setTextEditor
} = useContext(EditorContext);

  const handlePublishEvenet = () => {
    setEditorState("publish")
  }

  return (
    <>
     
    {/* navbar setting */}
    <div className="navbar">
      <div className=" flex items-cente gap-6">
        <Link to={"/"} className=" flex items-center">
          <img src={logo} alt="" srcset="" className="w-10"/>
        </Link>

        <p className="max-md:hidden text-dark-grey flex items-center font-semibold">Blog By {name} 
        <span className="text-dark-grey font-normal btn-light py-1 mx-4">Save</span>
        <span className="text-dark-grey font-bold text-2xl pl-16">{title.length == 0 ? "New Blog" : title}</span>
        </p>
      </div>

      <div className="flex gap-8 ml-auto">
        <button className="btn-dark py-2" onClick={handlePublishEvenet}>Publish</button>
        <button className="btn-light py-2">Save Draft</button>
      </div>
    </div>


    {/* Bloging Editing section */}
    <PageAnimation>
      <section>
        <div className="mx-auto w-full max-w-[900px]">

             <div className=" aspect-video  opacity-40 border-4 border-grey relative">
                <label htmlFor = "uploadBanner">
                  <img src={blogbanner} alt="" className="z-20" srcset="" />
                  <input id="uploadBanner" type="file" accept=".png .jpg .jpeg" hidden  onChange={handleUploadImage}/>
                </label>
             </div>

             <textarea className="w-full h-20 text-4xl mt-8  placeholder:opacity-50 outline-none leading-tight font-medium" 
             placeholder="Blog Title"
             onChange={handleTitleChange}
             defaultValue={title}
             >
             </textarea>

             <hr className="w-full opacity-30 py-2"/>

             <div id="textEditor" defaultValue={content} className="font-inter"
             onChange={()=>{setBlog({...blog , des : e.target.value})}}
             ></div>
        </div>

      </section>
    </PageAnimation>
    </>
    
  );
};

export default BlogEditor;
