import React, { createContext, useContext, useRef, useState } from "react";
import InputBox from "../components/InputBox";
import googleIcon from "../imgs/google.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import PageAnimation from "../common/page-animation";
import { apiConnector } from "../services/apiConnector";
import { auth } from "../services/api";
import { ToastContainer ,toast } from "react-toastify";
import { storeInSession } from "../common/session";
import { UserContext } from "../App";


const Login = ({ type }) => {  
  
  // const authForm = useRef();
  let fornData = {};

  const navigate = useNavigate()

  const {userAuth, setuserAuth} = useContext(UserContext);

  // console.log(userAuth)
  // console.log(userAuth.data.token)

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // fetch data from GUI
    let form = new FormData(elementData);
    for(let [key , value] of form.entries()){
      fornData[key] = value;
      console.log("===>",fornData)
    }

     // calling api with database
     loginProcess();
  }

  const loginProcess = async () => {
    try {
      console.log("run from here")
      const result =await apiConnector("POST", auth.login_api , fornData);
      console.log("User Logged Successfully", result);
      console.log(result.data.successResponse.data);
      storeInSession("user" , JSON.stringify(result.data.successResponse))
      console.log(sessionStorage)
      setuserAuth(result.data.successResponse)
      toast.success(result.data.successResponse.message)
      toast.success(result.data.successResponse.data.user.
        personal_info.fullname
      )
    } catch (error) {
      console.log("error",error.AxiosError);
      console.log("==>",error);
      toast.error(error.response.data.errorResponse.message)
      console.log("Cloud not login the User Profile");
    }
   };

  return (
    <>
      {userAuth?.data?.token ? navigate('/') :
        <PageAnimation keyValue={type}>
       <div className="flex justify-center items-center h-cover">
         <ToastContainer />
         <form id='elementData' className="w-[80%] shadow-2xl  max-w-[400px] p-10" onSubmit={handleOnSubmit}>
           <h1 className="text-3xl text-center capitalize font-gelasio mb-16">
             Welcome Back
           </h1>
           <InputBox
             name="email"
             type="email"
             id=""
             // value={email}
             icon="fi-rr-at"
             placeholder="Email"
             // handleOnChage = {handleOnChage}
           />
           <InputBox
             name="password"
             type="password"
             id=""
             // value={password}
             icon="fi-rr-key"
             placeholder="Password"
           />

           <button className="btn-dark center mt-10" >Sign Up</button>

           <div className="uppercase w-full text-black font-bold opacity-10 my-4 flex items-center">
             <hr className="border-black w-1/2" />
             <p>or</p>
             <hr className="border-black w-1/2" />
           </div>

           <button type="submit" className="btn-dark flex items-center justify-center gap-5 w-[90%] center">
             <img src={googleIcon} alt="" srcset="" className="w-5" />
             continue with google
           </button>

           <p className="flex items-center pt-4 text-dark-grey justify-center text-center">
             Dont't have an account ?
             <Link
               to={"/signup"}
               className="underline text-dark-grey  ml-1 text-xl text-center"
             >
               create account
             </Link>
           </p>
         </form>
        </div>
        </PageAnimation>
      }
    </>
  );
};

export default Login;

/**
 * there is some point which i want share with you
 * if we used the form tag and form tag has the button tag and if we click on button so form has onsubmit function click 
 * form tag connected with the button tag 
 * if we have multiple button so agar hum kisi bi button ko click krenge to form tag vala function ececute hoga 
 */
