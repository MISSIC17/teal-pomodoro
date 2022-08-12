import React, { useState } from "react";
import { MdLiveHelp } from "react-icons/md";
import { IconContext } from "react-icons";
import { AiFillCloseCircle } from "react-icons/ai";
export default function Help({ showHelp, setShowHelp }) {
  const helpObj = [
    ["s", "skip the session"],
    ["p", "pause/resume the session"],
    ["shift", "open the settings"],
    ["h", "Open help"],
    ["m", "stop music/start music"],
  ];

  return (
    <>
      {/* <IconContext.Provider value={{ color: "white" }}>
        <MdLiveHelp className="h-10 w-10" onClick={() => setShowHelp(true)} />
      </IconContext.Provider> */}
      {showHelp && (
        <section id="help-section-wrapper" className="bg-black bg-opacity-40">
          <div id="help-section">
            <button id="close-help" onClick={() => setShowHelp(false)}>
              <IconContext.Provider value={{ color: "#ff0000" }}>
                <AiFillCloseCircle className="h-10 w-10" />
              </IconContext.Provider>
            </button>
            <header>
              <p>Basic Hacks</p>
            </header>
            <div id="hacks">
              {helpObj.map((hack, index) => {
                return (
                  <li key={`hack-${index}`} className="grid grid-cols-[10%_auto] gap-4 p-5 bg-teal-1 mx-4 ">
                    <span className="pr-10 border-r-2">{hack[0]}</span>
                    <span className="pl-3">{hack[1]}</span>
                  </li>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
