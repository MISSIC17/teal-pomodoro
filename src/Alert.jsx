import React,{useEffect} from "react";
export default function Alert({type,msg, removeAlert,error}) {
  // useEffect(()=>{
  //   const timeout = setTimeout(()=>{
  //     removeAlert();
  //   },3000)
  //   return () => clearTimeout(timeout);
  // })

  return (
    <div className={`alert ${error?'entry-animation':`exit-animation`}  ${type}`}>
        {msg}
    </div>
  );
}
