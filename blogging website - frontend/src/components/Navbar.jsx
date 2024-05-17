// images
import logo from "../imgs/logo.png";

import React, { useContext, useState } from "react";
import { Link ,Outlet } from "react-router-dom";
import { UserContext } from "../App";
import UserNavigationPanel from "./user-navigation.component";
import { removeFromSession } from "../common/session";

const Navbar = () => {
  const [searchBoxVisiable, setSearchBoxVisiable] = useState(false);
  const [checkLogin, setcheckLogin] = useState(true);

  const {userAuth , setuserAuth} = useContext(UserContext)
  // console.log("==>",userAuth.success)

  const [showUserPanel , setShowUserPanel] = useState(false)

  const handleIfClickOutSideOfPanel = () => {
    console.log("ff")
  }

  const handleSignOut = () => {
    removeFromSession('user')
    setuserAuth({token: null})
  }

  return (
    <>
      <div>
      <div className="navbar justify-between flex items-center md:justify-start">
        
        {/* Logo */}
        <div className="w-28 flex-none">
          <Link to="/" className="">
            <img
              src={
                "https://logos-world.net/wp-content/uploads/2023/07/Medium-Logo.png"
              }
              alt="logo"
            />
          </Link>
        </div>

        {/* Search-bar */}
        <div
          className={`w-full absolute bg-white left-0 top-full  px-[5vw] py-4 border-grey md:relative md:inset-0 md:block md:p-0 md:w-auto md:show ${
            searchBoxVisiable ? "show" : "hide"
          }`}
        >
          <input
            placeholder="Search "
            type="text"
            className="bg-grey text-black pl-6 p-4 pr-[12%] md:pr-6 md:w-auto  rounded-full w-full md:pl-14"
          />
          <i className="fi fi-rr-search text-dark-grey text-2xl absolute md:pointer-events-none right-[10%] md:left-5 top-[53%] -translate-y-1/2"></i>
        </div>
 
          {/* Search Icon for small size */}
        <div className="gap-3 md:gap-6 ml-auto flex items-center">
            <button
              className="w-12 h-12 bg-grey rounded-full pt-2 md:hidden justify-center"
              onClick={() =>
                setSearchBoxVisiable((currentValue) => !currentValue)
              }
            >
              <i className="fi fi-rr-search text-dark-grey text-2xl md:pointer-events-none right-[10%] md:left-5 top-[53%] -translate-y-1/2"></i>
            </button>

          {/* login and signup and profile section */}

          <Link
            to={checkLogin ? "/editor" : "/login"}
            className="hidden md:flex link items-center justify-end rounded-2xl gap-2"
          >
            <i className="fi fi-rr-file-edit text-2xl"></i>
            <p>Write</p>
          </Link>

          { //userAuth.data.token
            userAuth?.data?.token ?
            <Link
            to={"/login"}
            onClick={handleSignOut}
            className="hidden md:flex bg-black text-white link items-center justify-end rounded-2xl gap-2">
            <p>Sign Out</p>
           </Link>
            : 
            <Link
            to={"/login"}
            className="hidden md:flex bg-black text-white link items-center justify-end rounded-2xl gap-2">
            <p>Login</p>
           </Link>
          }

          <Link
            to={"/signup"}
            className="hidden md:flex link items-center justify-end rounded-2xl gap-2"
          >    <p>Signup</p>
          </Link>

          <Link>
              <div onClick={()=>setShowUserPanel((prev)=> !prev)} onBlur={handleIfClickOutSideOfPanel} >
              <img src={ //userAuth.data.user.personal_info.profile_img
                userAuth?.data?.user?.personal_info?.profile_img ? userAuth?.data?.user?.personal_info?.profile_img
                : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg" 
              }alt="" srcset=""  className="w-14 rounded-full"/>
              </div>

              {
                showUserPanel ? <UserNavigationPanel /> : ""
              }
          </Link>
        </div>
      </div>
    </div>
    <Outlet />
    </>
  );
};

export default Navbar;

/** LINK TAGE
 * If we use the <a> tag and click on it so page will be render and referece but we dont want that behavior so we use the <Link /> tag
 * that remove the reloaded behaviour.
 *
 *
 */
