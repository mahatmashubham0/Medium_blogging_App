import React, { useState } from "react";
import { Link } from "react-router-dom";

const InputBox = ({ name, type, id, value, icon, placeholder }) => {
  const [showPassword , setShowPassowrd] = useState(false)

  return (
    <div className="relative w-[100%] mb-4">
      <input
        className="input-box text-black"
        name={name}
        type={type == "password" ? showPassword ? "text"  : "password" : "type"}
        //   id={id}
        //   value={valeue}
        placeholder={placeholder}
      />
      <i className={`fi  ${icon} input-icon`}></i>
      {type == "password" ? (
          <i className={"fi fi-rr-eye" + (!showPassword ? "-crossed"  : "")+  " absolute top-4 cursor-pointer left-[auto] right-4"}
          onClick={()=>setShowPassowrd(value => !value)}
          ></i>
      ) : (
        ""
      )}
    </div>
  );
};

export default InputBox;
