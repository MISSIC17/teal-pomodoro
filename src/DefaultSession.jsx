import React, { useContext } from "react";
import { formatter } from "./Clock";
import { TimeContext } from "./App";
import { secondsToHrMinSec } from "./utils/helpers";
export default function DefaultSession({
  id,
  time,
  breakTime,
  setTime,
  setBreakTime,
  isBreak,
  setIsBreak,
}) {
  const {
    tyam,
    breakTyam,
    isBreakTyam,
    setBreakTyam,
    setTyam,
    setIsBreakTyam,
  } = useContext(TimeContext);
  const handleClick = () => {
    //change the time there on the clock
    setIsBreak(false);
    setIsBreakTyam(false);
    setTime(secondsToHrMinSec(time * 60));
    setTyam(time * 60);
    setBreakTime(secondsToHrMinSec(breakTime * 60));
    setBreakTyam(breakTime * 60);
  };
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
      {/* <p */}
      {/*   className={` bottom-2 ${!isBreak ? "text-teal-2" : "text-white/50" */}
      {/*     } shadow-inner `} */}
      {/* > */}
      {/*   session */}
      {/* </p> */}
    </section>
  );
}
