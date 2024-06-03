import React, { useContext } from 'react'
import { EditorContext } from '../pages/editor.pages'

const Tags = ({tag}) => {

    let {blog , blog: { tags } , setBlog} =  useContext(EditorContext)

    const handleTagDelete = () => {
        let newTag = tags.filter((t)=>{t =! tags})
        setBlog({...blog , tags: newTag})
    }
  return (
    <div className='relative p-2 mt-2 mr-2 px-5 bg-white rounded-full inline-block pr-8'>
        
        <div className='flex gap-4'>
        <p className='outline-none' contentEditable="true">{tag}</p>
        <button className='space-x-4 pl-4 inline-block'
        onClick={handleTagDelete}
        >
            <i className='fi fi-br-cross text-sm pointer-events-none'></i>
         </button>
        </div>

    </div>
  )
}

export default Tags