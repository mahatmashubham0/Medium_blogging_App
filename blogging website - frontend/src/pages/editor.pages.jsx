import React, { createContext, useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import BlogEditor from '../components/blog-editor.component';
import PublishEditor from '../components/publish-form.component';

const blogStruture = {
  title : "",
  banner: "",
  content: [],
  tags: [],
  description: "",
  author: {personal_info: {}} 

}

export const EditorContext = createContext({})

const Editor = () => {

   const [blog , setBlog] = useState(blogStruture);
    // const {userAuth: {access_token}} = useContext(UserContext);
    const [editorState , setEditorState] = useState("editor")
   const access_token = true
  return (
    <EditorContext.Provider value={{blog , setBlog , editorState , setEditorState}}>
       {access_token === null ? <Navigate to={'/login'}/> : 

        editorState === "editor" ? <BlogEditor></BlogEditor> : <PublishEditor></PublishEditor>
       
      }
    </EditorContext.Provider>
  )
}

export default Editor