import React, { useEffect, useRef } from "react";
export default function Field({
  type,
  time,
  keyName,
  keyIndex,
  setType,
  // handleFocus,
  // handleInput,
}) {
  const changeFocus = (e, direction) => {
    // direction == 0 -> focus on previous input
    // direction == 1 -> focus on next input

    let currInputBox = e.target;
    let currInputWrapper = e.target.parentNode;
    let childIndex = Array.prototype.indexOf.call(
      currInputWrapper.children,
      currInputBox
    );
    let wrapperIndex = Array.prototype.indexOf.call(
      currInputWrapper.parentElement.children,
      currInputWrapper
    );
    if (direction === "forwards") {
      if (childIndex === 0) {
        currInputWrapper.childNodes[childIndex + 1].focus();
      } else if (
        currInputWrapper.childNodes[childIndex] ===
          currInputWrapper.lastChild &&
        currInputWrapper.parentNode.childNodes[wrapperIndex] !==
          currInputWrapper.parentNode.lastChild
      ) {
        currInputWrapper.parentNode.childNodes[
          wrapperIndex + 1
        ].childNodes[0].focus();
      } else if (
        currInputWrapper.childNodes[childIndex] ===
          currInputWrapper.lastChild &&
        currInputWrapper.parentNode.childNodes[wrapperIndex] ===
          currInputWrapper.parentNode.lastChild &&
        currInputBox !== document.querySelector("#break-sec-1")
      ) {
        document.querySelector("input#break-hr-0").focus();
      } else if (
        currInputWrapper.childNodes[childIndex] ===
          currInputWrapper.lastChild &&
        currInputWrapper.parentNode.childNodes[wrapperIndex] ===
          currInputWrapper.parentNode.lastChild &&
        currInputBox === document.querySelector("#break-sec-1")
      ) {
        document.querySelector("input#time-hr-0").focus();
      }
    } else if (direction === "backwards") {
      if (childIndex === 1) {
        currInputWrapper.childNodes[childIndex - 1].focus();
      } else if (
        currInputWrapper.childNodes[childIndex] ===
          currInputWrapper.firstChild &&
        currInputWrapper.parentNode.childNodes[wrapperIndex] !==
          currInputWrapper.parentNode.firstChild
      ) {
        currInputWrapper.parentNode.childNodes[
          wrapperIndex - 1
        ].childNodes[1].focus();
        // console.log(document.activeElement);
      } else if (
        currInputWrapper.childNodes[childIndex] ===
          currInputWrapper.firstChild &&
        currInputWrapper.parentNode.childNodes[wrapperIndex] ===
          currInputWrapper.parentNode.firstChild &&
        currInputBox !== document.querySelector("#time-hr-0")
      ) {
        document.querySelector("input#time-sec-1").focus();
      } else if (
        currInputWrapper.childNodes[childIndex] ===
          currInputWrapper.firstChild &&
        currInputWrapper.parentNode.childNodes[wrapperIndex] ===
          currInputWrapper.parentNode.firstChild &&
        currInputBox === document.querySelector("#time-hr-0")
      ) {
        document.querySelector("input#break-sec-1").focus();
      }
    }
  };
  const HandleFocus = (e) => {
    function navKeysFocus(event) {
      if (event.key === "ArrowRight") {
        changeFocus(e, "forwards");
      } else if (event.key === "ArrowLeft") {
        changeFocus(e, "backwards");
      }
      if (event.key > -1 || event.key < 10) {
        console.log(typeof event.key);
        e.target.value = event.key;
      }
    }
    e.target.addEventListener("keydown", navKeysFocus);
    return () => {
      document.removeEventListener("mousedown", navKeysFocus);
    };
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
  // const field = useRef(null);
  return (
    <div
      className={`${type}-${keyName} relative flex flex-nowrap  after:absolute after:-bottom-1/2 after:left-1/2 after:transform after:-translate-x-1/2`}
    >
      {[0, 1].map((index) => {
        return (
          <input
            key={`${keyName}-${index}`}
            type="number"
            id={`${type}-${keyName}-${index}`}
            name={`${type}-${keyName}-${index}`}
            value={time[keyName][index]}
            min="0"
            max="9"
            onFocus={(e)=>HandleFocus(e)}
            onChange={(e) => handleInput(e, keyIndex, index, setType)}
          />
        );
      })}
    </div>
  );
}
