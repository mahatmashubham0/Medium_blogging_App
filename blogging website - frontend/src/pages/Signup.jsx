import React from 'react'
import InputBox from '../components/input.component'
import googleIcon from '../imgs/google.png'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='flex justify-center items-center h-cover'>
        <form className='w-[80%] shadow-2xl  max-w-[400px] p-10'>
                <h1 className='text-3xl text-center capitalize font-gelasio mb-16'>Welcome Back</h1>
                <InputBox name="full name" type="text" id="" value="" icon = "fi-rr-user" placeholder="Full Name"/>
                <InputBox name="email" type="email" id="" value="" icon = "fi-rr-at" placeholder="Email"/>
                <InputBox name="password" type="password" id="" value="" icon = "fi-rr-key" placeholder="Password"/>

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
    </div>
  )
}

export default Signup