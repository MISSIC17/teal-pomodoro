import React from "react";
import { MdLiveHelp } from "react-icons/md";
import { IconContext } from "react-icons";
export default function Help(){
    return(
        <>
        <IconContext.Provider value={{color:'white'}}>
            <MdLiveHelp className="h-10 w-10"/>
        </IconContext.Provider>
        </>
    ) 
}