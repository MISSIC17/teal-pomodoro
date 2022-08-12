import React from "react";
import { formatter } from "./Clock";
export default function DefaultSession({
  time,
  breakTime,
  setTime,
  setBreakTime,
  setIsBreak
}) {
  const handleClick = () => {
    //change the time there on the clock
    setIsBreak(false) ;
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

  return (
    <section
      id="default-sesction"
      className="relative py-6 px-3 grid justify-items-center justify-self-center rounded-lg bg-teal text-white"
      onClick={handleClick}
    >
      <p>
        <span className="text-4xl"> {time}</span>min +{" "}
        <span className="text-3xl">{breakTime}</span>min
      </p>
      <p className=" bottom-2 text-teal-2 shadow-inner ">session</p>
    </section>
  );
}
