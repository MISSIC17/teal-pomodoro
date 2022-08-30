import React, { useState, useEffect, useRef } from "react";
import { IconContext } from "react-icons";
import { FiSettings } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoIosTimer } from "react-icons/io";
import Field from "./Field";
import DefaultSession from "./DefaultSession";

export default function Settings({
  time,
  setTime,
  breakTime,
  setBreakTime,
  setIsBreak,
  showSettings,
  setShowSettings,
  isBreak,
}) {
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowSettings(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };
  const settingsWrapper = useRef(null);
  useOutsideAlerter(settingsWrapper);
  const [settingsPos, setSettingsPos] = useState({ right: "0", top: "0" });
  const types = ["hr", "min", "sec"];
  const defaultSessions = [
    [20, 5],
    [35, 7],
    [55, 10],
  ];
  let screenWidth = window.clientWidth;
  useEffect(() => {
    let target = document.querySelector("#settings-wrapper svg");
    const settingBtn = target.getBoundingClientRect();
    setSettingsPos((prevPos) => ({
      ...prevPos,
      right: window.innerWidth - settingBtn.left - target.clientWidth,
      top: settingBtn.top,
    }));
  }, [screenWidth]);
  const handleSettingsClick = (e) => {
    setShowSettings(!showSettings);
    console.log(document.activeElement)
    if(showSettings){
      document.getElementById("time-hr-0").focus()
    }
  };

  const changeFocus = (e, direction) => {
    // direction == 0 -> focus on previous input
    // direction == 1 -> focus on next input

    let currentInputBox = e.target;
    let currentInputWrapper = e.target.parentNode;
    let childIndex = Array.prototype.indexOf.call(
      currentInputWrapper.children,
      currentInputBox
    );
    let wrapperIndex = Array.prototype.indexOf.call(
      currentInputWrapper.parentElement.children,
      currentInputWrapper
    );
    if (direction === "forwards") {
      if (childIndex === 0) {
        currentInputWrapper.childNodes[childIndex + 1].focus();
      } else if (
        currentInputWrapper.childNodes[childIndex] ===
          currentInputWrapper.lastChild &&
        currentInputWrapper.parentNode.childNodes[wrapperIndex] !==
          currentInputWrapper.parentNode.lastChild
      ) {
        currentInputWrapper.parentNode.childNodes[
          wrapperIndex + 1
        ].childNodes[0].focus();
      } else if (
        currentInputWrapper.childNodes[childIndex] ===
          currentInputWrapper.lastChild &&
        currentInputWrapper.parentNode.childNodes[wrapperIndex] ===
          currentInputWrapper.parentNode.lastChild &&
        currentInputBox !== document.querySelector("#break-sec-1")
      ) {
        document.querySelector("input#break-hr-0").focus();
      } else if (
        currentInputWrapper.childNodes[childIndex] ===
          currentInputWrapper.lastChild &&
        currentInputWrapper.parentNode.childNodes[wrapperIndex] ===
          currentInputWrapper.parentNode.lastChild &&
        currentInputBox === document.querySelector("#break-sec-1")
      ) {
        document.querySelector("input#time-hr-0").focus();
      }
    } else if (direction === "backwards") {
      if (childIndex === 1) {
        currentInputWrapper.childNodes[childIndex - 1].focus();
      } else if (
        currentInputWrapper.childNodes[childIndex] ===
          currentInputWrapper.firstChild &&
        currentInputWrapper.parentNode.childNodes[wrapperIndex] !==
          currentInputWrapper.parentNode.firstChild
      ) {
        currentInputWrapper.parentNode.childNodes[
          wrapperIndex - 1
        ].childNodes[1].focus();
        // console.log(document.activeElement);
      } else if (
        currentInputWrapper.childNodes[childIndex] ===
          currentInputWrapper.firstChild &&
        currentInputWrapper.parentNode.childNodes[wrapperIndex] ===
          currentInputWrapper.parentNode.firstChild &&
        currentInputBox !== document.querySelector("#time-hr-0")
      ) {
        document.querySelector("input#time-sec-1").focus();
      } else if (
        currentInputWrapper.childNodes[childIndex] ===
          currentInputWrapper.firstChild &&
        currentInputWrapper.parentNode.childNodes[wrapperIndex] ===
          currentInputWrapper.parentNode.firstChild &&
        currentInputBox === document.querySelector("#time-hr-0")
      ) {
        document.querySelector("input#break-sec-1").focus();
      }
    }
  };

  const handleInput = (e, typeIndex, posIndex, setType) => {
    // e.target.addEventListener("keydown", (event) => {
    //   if (event.key > -1 || event.key < 10) {
    //     console.log(typeof event.key)
    //     e.target.value = event.key;
    //   }
    // });
    let key = Object.keys(time)[typeIndex];

    if (e.target.value.length > 1) {
      e.target.value = parseInt(e.target.value.slice(1));
      setType((prevState) => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          [posIndex]: parseInt(e.target.value),
        },
      }));
      changeFocus(e, "forwards");
    } else {
      setType((prevState) => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          [posIndex]: parseInt(e.target.value),
        },
      }));
    }
  };

  const handleFocus = (e) => {
    e.target.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        changeFocus(e, "forwards");
      } else if (event.key === "ArrowLeft") {
        changeFocus(e, "backwards");
      }
      if (event.key > -1 || event.key < 10) {
        console.log(typeof event.key);
        e.target.value = event.key;
      }
    });
  };
  return (
    <>
      <div
        id="settings-wrapper"
        className="settings-wrapper h-fit w-fit"
        onClick={() => handleSettingsClick}
      >
        {!showSettings ? (
          <IconContext.Provider value={{ color: "white" }}>
            <FiSettings
              id="settings-icon"
              className="w-10 h-10"
              onClick={handleSettingsClick}
            />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider value={{ color: "red" }}>
            <AiFillCloseCircle
              id="settings-close-icon"
              className="w-10 h-10 relative z-50 transition-all duration-75 ease-linear"
              onClick={handleSettingsClick}
            />
          </IconContext.Provider>
        )}
      </div>
      <section
        ref={settingsWrapper}
        id="settings-options-wrapper"
        className={`settings-options-wrapper  grid justify-items-center
      absolute right-[${settingsPos.right}px] top-[${settingsPos.top}px] ${
          showSettings ? "" : "hidden"
        } p-3 z-10 `}
        style={{ right: `${settingsPos.right}px` }}
      >
        <div className="settings-title relative grid place-items-center lg:w-fit h-fit w-1/2 px-6 py-2 shadow-[0px_4px_11px_0px_black]">
          <p className="lg:text-2xl lg:px-8 lg:py-2 text-xl px-6 py-1">
            Settings
          </p>
        </div>
        <form
          className="time relative w-[90%]"
          onSubmit={(e) => e.preventDefault()}
        >
          <label>
            <IoIosTimer className="h-8 w-8" />
            Session duration
          </label>
          <div className="flex gap-4">
            {types.map((type, index) => {
              return (
                <Field
                  key={`${type}-${index}`}
                  type="time"
                  time={time}
                  keyName={type}
                  keyIndex={index}
                  setType={setTime}
                  handleFocus={handleFocus}
                  handleInput={handleInput}
                />
              );
            })}
          </div>
        </form>
        <form className="break" onSubmit={(e) => e.preventDefault()}>
          <label>
            <IoIosTimer className="h-8 w-8" />
            Break duration
          </label>
          <div className="flex gap-4">
            {types.map((type, index) => {
              return (
                <Field
                  key={`${type}-${index}`}
                  type="break"
                  time={breakTime}
                  keyName={type}
                  keyIndex={index}
                  setType={setBreakTime}
                  handleFocus={handleFocus}
                  handleInput={handleInput}
                />
              );
            })}
          </div>
        </form>
        <div
          className={`settings-separator relative z-10 my-4 ${
            !isBreak ? "bg-teal" : "bg-brickred"
          } w-2/3 h-1 items-center  self-center`}
        ></div>
        <section
          id="default-sessions-wrapper"
          className="relative grid gap-5 place-items-center justify-center align-middle flex-col w-full mt-3"
        >
          <div
            id="default-sessions-title"
            className={`grid relative text-center w-[90%] justify-self-center md:px-4 md:py-4 px-2 py-2 ${
              !isBreak ? "bg-teal-3" : "bg-brickred"
            } shadow-[0px_4px_11px_0px_black]`}
          >
            <p
              className={`grid place-items-center ${
                !isBreak ? "text-black" : "text-white"
              } text-xl`}
            >
              {" "}
              Default sessions
            </p>
          </div>
          <div id="default-sessions" className="relative gap-4 ">
            {defaultSessions.map((defaultSession, index) => {
              return (
                <DefaultSession
                  key={index}
                  id={`default-session-${index}`}
                  time={defaultSession[0]}
                  breakTime={defaultSession[1]}
                  setTime={setTime}
                  setBreakTime={setBreakTime}
                  isBreak={isBreak}
                  setIsBreak={setIsBreak}
                />
              );
            })}
          </div>
        </section>
      </section>
    </>
  );
}
// }
