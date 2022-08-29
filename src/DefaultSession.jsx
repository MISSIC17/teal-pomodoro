import React, { useState, useEffect } from "react";
import { formatter } from "./Clock";
export default function DefaultSession({
  id,
  time,
  breakTime,
  setTime,
  setBreakTime,
  isBreak,
  setIsBreak,
}) {
  const [currentSession, setCurrentSession] = useState();
  // document.querySelectorAll(".default-session").forEach((item) => {
  //   item.addEventListener("click", () => {
  //     let currSession = document.getElementById(item.id);
  //     currSession.classList.add("default-session-focus");
  //     document.getElementById(
  //       "display"
  //     ).innerHTML = `<img src="/assets/${item.id}.png">`;
  //     document.addEventListener("click", (event) => {
  //       var isClickInsideElement = currSession.contains(event.target);
  //       if (!isClickInsideElement) {
  //         currSession.classList.remove("default-session-focus");
  //       }
  //     });
  //   });
  // });
  const handleClick = () => {
    //change the time there on the clock
    setCurrentSession(id);
    setIsBreak(false);
    setTime(secondsToHrMinSec(time * 60));
    setBreakTime(secondsToHrMinSec(breakTime * 60));
  };
  const secondsToHrMinSec = (totalSeconds) => {
    let hr = formatter(parseInt(totalSeconds / 3600));
    let min = formatter(parseInt((totalSeconds - hr * 3600) / 60));
    let sec = formatter(parseInt(totalSeconds - hr * 3600 - min * 60));
    const timeObj = {
      hr: {
        0: hr[0],
        1: hr[1],
      },
      min: {
        0: min[0],
        1: min[1],
      },
      sec: {
        0: sec[0],
        1: sec[1],
      },
    };
    return timeObj;
  };
  console.log(id);
  // useEffect(() => {
  //   if (currentSession === id) {
  //     document.querySelector(`#${id}`).classList.add("default-session-focus");
  //   } else {
  //     console.log("HI")
  //     document
  //       .querySelector(`#${id}`)
  //       .classList.remove("default-session-focus");
  //   }
  // },[currentSession]);
  // document.querySelectorAll(".default-session").forEach((item) => {
  //   item.addEventListener("click", () => {
  //     let currentSession = document.getElementById(item.id);
  //     currentSession.classList.add('default-session-focus');
  //     document.addEventListener("click", (e) => {
  //       var isClickInsideElement = currentSession.contains(e.target);
  //       if (!isClickInsideElement) {
  //         currentSession.classList.remove('default-session-focus')
  //       }
  //     });
  //   });
  // });
  return (
    <section
      id={id}
      className={`default-session relative py-6 px-3 grid justify-items-center justify-self-center rounded-lg ${
        !isBreak ? "bg-teal" : "bg-brickred"
      } text-white cursor-pointer'} `}
      onClick={handleClick}
    >
      <p>
        <span className="lg:text-4xl sm:text-3xl "> {time}</span>min
        <span>&nbsp;+&nbsp;</span>
        <span className="lg:text-3xl sm:text-2xl ">{breakTime}</span>min
      </p>
      <p
        className={` bottom-2 ${
          !isBreak ? "text-teal-2" : "text-brickred-1"
        } shadow-inner `}
      >
        session
      </p>
    </section>
  );
}
