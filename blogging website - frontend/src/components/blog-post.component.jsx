import React from 'react'

const Blog = ({info}) => {
    const {des , title , tags , banner} = info
  return (
    <div className='w-[450px] h-[350px] border rounded-lg space-y-4'>
      <img src={banner} alt="" className='w-[100%] h-[50%]' srcset="" />
      <h1>Title: {title}</h1>
      <p>Description: {des}</p>
      <h6>Tags: {tags}</h6> 
    </div>
  )
}

export default Blog