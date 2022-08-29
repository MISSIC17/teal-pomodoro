import React, { useEffect } from "react";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";
import { AiFillWarning } from "react-icons/ai";
export default function Alert({ type, msg, setAlert, showAlert, isError }) {
  // useEffect(()=>{
  //   // const timeout = setTimeout(()=>{
  //     showAlert();
  //   },3000)
  //   return () => clearTimeout(timeout);
  // })

  return (
    <div
      className={`alert transition-all duration-75${
        isError ? " grid entry-animation" : `exit-animation hidden`
      }  ${type} grid-cols-[5%_85%_10%] gap-3 justify-center`}
    >
      <IconContext.Provider value={{ color: "yellow" }}>
        <AiFillWarning className="w-6 h-6 justify-self-center" />
      </IconContext.Provider>
      <p>{msg}</p>
      {/* <button
        id="close-alert"
        onClick={setAlert((prevState) => ({
          ...prevState,
          show: false,
        }))} 
      ></button> */}
      <button id="alert-close" className="justify-self-center"
      onClick={()=>{
        setAlert((prevState)=>({
          ...prevState,
            show:false
        }))
      }}>
        <AiOutlineClose className="w-8 h-8" />
      </button>
    </div>
  );
}
