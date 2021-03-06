import React, { useState } from "react";
import { IconContext } from "react-icons";
import { FiSettings } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoIosTimer } from "react-icons/io";
import Field from "./Field";

export default function Settings({ time, setTime, breakTime, setBreakTime }) {
  const [showSettings, setShowSettings] = useState(true);
  const [settingsPos, setSettingsPos] = useState({ right: "0", top: "0" });

  const types = ["hr", "min", "sec"];

  const handleSettingsClick = (e) => {
    setShowSettings(!showSettings);
    const settingBtn = e.target.getBoundingClientRect();
    setSettingsPos((prevPos) => ({
      ...prevPos,
      right: window.innerWidth - settingBtn.left - e.target.clientWidth,
      top: settingBtn.top,
    }));
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
      }
    }
  };

  const handleInput = (e, typeIndex, posIndex, setType) => {
    let key = Object.keys(time)[typeIndex];
    if (e.target.value.length > 1) {
      e.target.value = parseInt(e.target.value.slice(1));
      // console.log(typeof e.target.value, e.target.value);
      // console.log(e.target.value, e.target.value.length);
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
    e.target.type = "text";
    e.target.setSelectionRange(e.target.value.length, e.target.value.length);
    e.target.type = "number";
    e.target.addEventListener("keydown", (event) => {
      console.log(e.target.value);
      // if (event.key === "ArrowUp") {
      //   if (parseInt(e.target.value === 8)) {
      //     e.target.value = 0;
      //   }
      // }

      if (e.target.value === "8") {
        console.log("I am 9");
      }
      if (event.key === "ArrowRight") {
        console.log("hi");
      }
      if (event.key === "ArrowRight") {
        changeFocus(e, "forwards");
      } else if (event.key === "ArrowLeft") {
        changeFocus(e, "backwards");
      }
    });
  };
  return (
    <>
      <div className="settings-wrapper">
        {!showSettings ? (
          <IconContext.Provider value={{ color: "white" }}>
            <FiSettings className="w-10 h-10 " onClick={handleSettingsClick} />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider value={{ color: "red" }}>
            <AiFillCloseCircle
              className="w-10 h-10 relative z-50"
              onClick={handleSettingsClick}
            />
          </IconContext.Provider>
        )}
      </div>
      <section
        className={`settings-options-wrapper grid justify-items-center gap-3
      absolute right-[${settingsPos.right}px] top-[${settingsPos.top}px] ${
          showSettings ? "" : "hidden"
        } p-3 z-10 `}
        style={{ right: `${settingsPos.right}px` }}
      >
        <div className="settings-title relative w-fit px-4 shadow-[0px_4px_11px_0px_black]">
          <p className="text-2xl px-8 py-2">Settings</p>
        </div>
        <form className="time" onSubmit={(e) => e.preventDefault()}>
          <label>
            <IoIosTimer className="h-8 w-8" />
            Session duration
          </label>

          {types.map((type, index) => {
            console.log("hi");
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

          {/* <input
              type="number"
              name="time-sec-0"
              id="time-sec-0"
              value={time.sec[0]}
              min="0"
              onFocus={handleFocus}
              onChange={(e) => handleInput(e, 2, 0)}
              />
              <input
              type="number"
              name="time-sec-1"
              id="time-sec-1"
              value={time.sec[1]}
              min="0"
              onFocus={handleFocus}
              onChange={(e) => handleInput(e, 2, 1)}
            /> */}
        </form>
        <form className="break" onSubmit={(e) => e.preventDefault()}>
          <label>
            <IoIosTimer className="h-8 w-8" />
            Break duration
          </label>
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
        </form>
      </section>
    </>
  );
}
