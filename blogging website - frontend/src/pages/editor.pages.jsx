import React, { createContext, useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import BlogEditor from '../components/blog-editor.component';
import PublishEditor from '../components/publish-form.component';
import { UserContext } from '../App';

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

    const {userAuth} = useContext(UserContext);

    const [textEditor , setTextEditor] = useState();

    const [editorState , setEditorState] = useState("editor")

  return (
    <EditorContext.Provider value={{blog , setBlog , editorState , setEditorState , setTextEditor , textEditor}}>
       {userAuth?.data?.token === null ? <Navigate to={'/login'}/> : 

        editorState === "editor" ? <BlogEditor></BlogEditor> : <PublishEditor></PublishEditor>
       
      }
    </EditorContext.Provider>
  )
}

export default Editor