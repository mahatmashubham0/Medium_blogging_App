import React, { useContext } from "react";
import PageAnimation from "../common/page-animation";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const UserNavigationPanel = () => {
  const { userAuth } = useContext(UserContext);
  console.log("==>",userAuth);
  let username = userAuth?.data?.user?.personal_info?.username;

  return (
    <div>
      <PageAnimation className={`right-0 absolute z-40`}>
        <div className="bg-white absolute w-60 duration-200 border rounded-lg border-grey overflow-hidden right-0">
          <Link to={"editor"} className="flex gap-2 py-4 justify-center items-center">
            <i className="fi fi-rr-file-edit"></i>
            <p>Editor</p>
          </Link>
          <Link to={`/user/${username}`} className="flex gap-2 py-4 justify-center items-center">
            <i className="fi fi-rr-user"></i>
            <p>Profile</p>
          </Link>
          <Link to={`/dashboard/blogs`} className="flex gap-2 py-4 justify-center items-center">
            <i className="fi fi-rr-file-edit"></i>
            <p>My Blogs</p>
          </Link>
          <Link to={`/`} className="flex gap-2 py-4 text-3xl bg-grey justify-center items-center">
            {username ? (
                
              <i className="italic font-bold font-serif">@{username}</i>
            ) : (
              <>
                
              </>
            )}
          </Link>
        </div>
      </PageAnimation>
    </div>
  );
};

export default UserNavigationPanel;
