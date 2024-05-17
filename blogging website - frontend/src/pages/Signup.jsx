import React, { useRef, useEffect } from 'react'
import InputBox from '../components/InputBox'
import googleIcon from '../imgs/google.png'
import { Link } from 'react-router-dom'
import PageAnimation from '../common/page-animation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {apiConnector} from '../services/apiConnector'
import {auth} from '../services/api'

const Signup = ({type}) => {

  // const authForm = useRef();
  let fornData = {};


  const handleOnSubmit = (e) => {
    e.preventDefault();

    // fetch data from GUI
    let form = new FormData(formElement);
    for(let [key , value] of form.entries()){
      fornData[key] = value;
      console.log("===>",fornData)
    }

     // calling api with database
      SignupProcess();
  }

  const SignupProcess = async () => {
    try {
      console.log("run from here")
      const result =await apiConnector("POST", auth.signup_api , fornData);
      console.log("User created Successfully", result);
      console.log(result.data.successResponse.data);
      toast.success(result.data.successResponse.message)
      toast.success(result.data.successResponse.data.user.
        personal_info.fullname
        )
    } catch (error) {
      console.log("error",error);
      toast.success(error.response.data.errorResponse.message)
      console.log("Cloud not create the User Profile");
    }
   };

  return (
   <PageAnimation keyValue={type}>
     <div className='flex justify-center items-center h-cover'>
     
        <form id='formElement' className='w-[80%] shadow-2xl  max-w-[400px] p-10' onSubmit={handleOnSubmit}>
                <h1 className='text-3xl text-center capitalize font-gelasio mb-16'>Welcome Back</h1>
                <InputBox name="fullname" type="text" id="" value="" icon = "fi-rr-user"  placeholder="Full Name"/>
                <InputBox name="email" type="email" id="" value="" icon = "fi-rr-at"  placeholder="Email"/>
                <InputBox name="password" type="password" id="" value="" icon = "fi-rr-key"  placeholder="Password"/>

                <button className='btn-dark center mt-14'>
                  Sign Up
                </button>

                <div className='uppercase w-full text-black font-bold opacity-10 my-10 flex items-center'>
                  <hr className='border-black w-1/2'/>
                  <p>or</p>
                  <hr className='border-black w-1/2'/>
                </div>

                <button className='btn-dark flex items-center justify-center gap-5 w-[90%] center'>
                  <img src={googleIcon} alt="" srcset="" className='w-5'/>
                  continue with google
                </button>

                <p className='flex items-center pt-4 text-dark-grey justify-center text-center'>
                  Already a member ? 
                  <Link to={'/login'} className='underline ml-1 text-xl text-center'>Sign in here</Link>
                </p>
        </form>
        <ToastContainer />
    </div>
   </PageAnimation>
  )
}

export default Signup