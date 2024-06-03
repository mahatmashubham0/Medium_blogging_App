import React, { useContext } from 'react'
import toast, {Toaster} from 'react-hot-toast'

// Components
import PageAnimation from '../common/page-animation'
import fullLogo from '../imgs/full-logo.png'
import { EditorContext } from '../pages/editor.pages'
import Tags from './tags.component'
import { apiConnector } from '../services/apiConnector'
import { auth } from '../services/api'
import { UserContext } from '../App'

const PublishEditor = () => {

  const {setEditorState, blog ,  blog: {title , content , banner , tags} , setBlog} = useContext(EditorContext)
  const blogContent = content?.blocks[0]?.data?.text

  const {userAuth} = useContext(UserContext)

  const handleChangeOnTags = (e) => {
    if(e.keyCode === 13 || e.keyCode === 188){
      e.preventDefault();
      let tag = e.target.value
      console.log(tag)
      if(tags.length < 2) {
      if(!tags.includes(tag) && tag.length) {
        setBlog({...blog , tags: [ ...tags , tag]})
      }
     }else{
      toast.error(`You Can not add More tag after ${tags.length}`)
     }
     e.target.value = ""
    }
  }

  const handleSubmitData = async () => {

    let blogObj = {title , banner , content , currentUserToken:userAuth?.data?.token , tags , des:"The filter() method of Array instances creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function." }

    console.log("==>",userAuth?.data?.token,blogObj)

    try {
      const result =await apiConnector("POST", auth.create_blog_api , blogObj 
      //  {headers: {'Authorization': `Bearer ${userAuth?.data?.token}`}}
      );
      console.log("created Successfully", result);
      console.log(result?.data?.successResponse?.data);
      toast.success("Publish Successfull ✅️")
    } catch (error) {
      console.log("error",error.AxiosError);
      console.log("==>",error);
      toast.error(error?.response?.data?.errorResponse?.message)
      console.log("Cloud not create the blog");
    }

  }

  const handleCloseEvent = () => {
    setEditorState("editor")
  }

  return (
    <div>
      <PageAnimation>
          <div>

          <Toaster />

              <button className='w-16 h-16 absolute top-[5%] lg:top-[10%] right-[5vw]'
              onClick={handleCloseEvent}
              >
                <i className='fi fi-br-cross text-xl'></i>
              </button>

              <div className='center max-w-[550px]'>

                  <p className='text-dark-grey-grey my-4 font-medium text-3xl'>Preview</p>
                  <div className='mt-4 overflow-hidden rounded-xl w-[100%] aspect-video bg-grey'>
                    <img src={banner ? banner : fullLogo} className=''/>
                  </div>

                  <h1 className='text-4xl italic text-opacity-10 shadow-lg line-clamp-2 font-medium mt-2'>{title}</h1>

                  <hr className="w-full opacity-30 py-2"/>

                  <p className='leading-7 italic text-opacity-10 shadow-lg input-box font-gelasio text-xl mt-4'>ok i am trying to do{blogContent}</p>

                  <hr className="w-full opacity-30 py-2 pb-8"/>

                {/* Editing section */}

                 <div>
                     <p>Help for searching the blog post with good ranking</p>
                     <div className='input-box pl-2 py-2'>
                      <input type="text" name="" defaultValue={''} onKeyDown={handleChangeOnTags} placeholder='Topic' className=' border text-black border-grey input-box top-0 left-0 bg-white focus:bg-white sticky pl-4' id="" />

                      {
                        tags.map((tag , i) => {
                          return <Tags tag = {tag} key={i}/>
                        })
                      } 
                    
                     </div>
                 </div>

                 <button className='btn-dark my-4' onClick={handleSubmitData}>Publish</button>

              </div>

          </div>
      </PageAnimation>
     
    </div>
  )
}

export default PublishEditor