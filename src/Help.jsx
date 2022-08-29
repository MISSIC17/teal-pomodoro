import React, { useState } from "react";
import { MdLiveHelp } from "react-icons/md";
import { IconContext } from "react-icons";
import { AiFillCloseCircle } from "react-icons/ai";
export default function Help({ showHelp, setShowHelp, isBreak, onMobile }) {
  const helpObj = [
    ["s", "Skip the session"],
    ["space", "Pause/Resume the session"],
    ["shift", "Open/Close the settings"],
    ["h", "Open/Close help"],
    ["m", "Stop/Start music"],
  ];

  return (
    <>
      {showHelp && (
        <section
          id="help-section-wrapper"
          className={`${onMobile ? "hidden" : "grid"} bg-black bg-opacity-40`}
        >
          <div
            id="help-section"
            className={`${!isBreak ? "bg-teal" : "bg-brickred"} bg-opacity-30`}
          >
            <div id="pseudo-section"></div>
            <header className="relative grid place-items-center">
              <p className="lg:text-[1.25em] sm:text-[1em]">
                {" "}
                {"> Basic Hacks"}
              </p>
              <div
                className={`relative bg-white
                } w-1/2 h-[0.3em] rounded-lg border-white border-2`}
              ></div>
              <button id="close-help" onClick={() => setShowHelp(false)}>
                <IconContext.Provider value={{ color: "#ff0000" }}>
                  <AiFillCloseCircle className="h-12 w-12" />
                </IconContext.Provider>
              </button>
            </header>
            <div id="hacks">
              {helpObj.map((hack, index) => {
                return (
                  <li
                    key={`hack-${index}`}
                    className={`grid grid-cols-[20%_1%_auto] items-center py-3 
                    bg-teal
                    ${!isBreak ? "bg-teal" : "bg-brickred"} mx-8 `}
                  >
                    <span className="whitespace-nowrap w-full text-sm text-center grid justify-center">
                      <p className="key text-white bg-black p-3 w-fit self-center rounded-md">
                        {hack[0]}
                      </p>
                    </span>
                    <span className="bg-black w-[0.1em] h-3/4"></span>
                    <span
                      className={`${
                        !isBreak ? "text-black" : "text-white"
                      } pr-10 pl-4 whitespace-nowrap text-left grid items-center`}
                    >
                      {hack[1]}
                    </span>
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
