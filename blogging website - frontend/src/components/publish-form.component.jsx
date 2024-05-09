import React, { useContext } from 'react'
import {Toaster} from 'react-hot-toast'

// Components
import PageAnimation from '../common/page-animation'
import { EditorContext } from '../pages/editor.pages'
import fullLogo from '../imgs/full-logo.png'

const PublishEditor = () => {

  const {setEditorState, blog:{title , des}} = useContext(EditorContext)

  const handleCloseEvent = () => {
    setEditorState("editor")
  }

  return (
    <div>
      <PageAnimation>
          <div>

          <Toaster />

              <button className='w-12 h-12 absolute top-[5%] lg:top-[10%] right-[5vw]'
              onClick={handleCloseEvent}
              >
                <i className='fi fi-br-cross'></i>
              </button>

              <div className='center max-w-[550px]'>

                  <p className='text-dark-grey-grey font-medium text-3xl'>Preview</p>
                  <div className='mt-4 overflow-hidden rounded-lg w-[100%] aspect-video bg-grey'>
                    <img src={fullLogo} className=''/>
                  </div>

                  <h1 className='text-4xl line-clamp-2 font-medium mt-2'>{title}</h1>

                  <hr className="w-full opacity-30 py-2"/>

                  <p className='leading-7 font-gelasio text-xl mt-4'>ok i am trying to do{des}</p>

              </div>

                {/* Editing section */}
              <div>

              </div>

          </div>
      </PageAnimation>
     
    </div>
  )
}

export default PublishEditor