import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import EditorJS from '@editorjs/editorjs'

// components
import logo from "../imgs/logo.png";
import PageAnimation from "../common/page-animation";
const name = "shubham mahatma";
import blogbanner from '../imgs/blog banner.png'
import { EditorContext } from "../pages/editor.pages";
import {tools} from './tools.component'

const BlogEditor = () => {

  const handleUploadImage = (e) => {
    console.log("upload images",e)
    const img = e.target.files[0]
    console.log("==>",img)
  }

  const handleTitleChange = (e) => {
    let input = e.target;

    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px' 
    setBlog({...blog , title: e.target.value})
  }

  useEffect(()=>{
    let editor = new EditorJS({
      holderId: "textEditor",
      data: "",
      tools: tools,
      placeholder: "Let's write an awesome story"
    })
  },[])

  let {blog , setBlog , blog: {title , description , banner , content , tags}} = useContext(EditorContext);

  return (
    <>
    
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
        <button className="btn-dark py-2">Publish</button>
        <button className="btn-light py-2">Save Draft</button>
      </div>
    </div>


    <PageAnimation>
      <section>
        <div className="mx-auto w-full max-w-[900px]">

             <div className=" aspect-video  opacity-80 border-4 border-grey relative">
                <label htmlFor = "uploadBanner">
                  <img src={blogbanner} alt="" className="z-20" srcset="" />
                  <input id="uploadBanner" type="file" accept=".png .jpg .jpeg" hidden  onChange={handleUploadImage}/>
                </label>
             </div>

             <textarea className="w-full h-20 text-4xl mt-8  placeholder:opacity-50 outline-none leading-tight font-medium" placeholder="Blog Title"
             onChange={handleTitleChange}
             >
             </textarea>

             <hr className="w-full opacity-30 py-2"/>

             <div id="textEditor" className="font-inter">

             </div>
        </div>

      </section>
    </PageAnimation>
    </>
    
  );
};

export default BlogEditor;
