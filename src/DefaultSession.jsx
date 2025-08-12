import React, { useContext } from "react";
import { formatter } from "./ClockCanvas";
import { TimeContext } from "./App";
import { secondsToHrMinSec } from "./utils/helpers";
export default function DefaultSession({ id, session }) {
  const {
    isBreakTyam,
    setBreakTyam,
    setTyam,
    setIsBreakTyam,
    setRemainingSec,
  } = useContext(TimeContext);
  console.log(session);
  const sessionTime = session[0];
  const sessionBreakTime = session[1];
  const handleClick = () => {
    setIsBreakTyam(false);
    setTyam(session[0] * 60);
    setBreakTyam(session[1] * 60);
    let elaspedTyam = window.localStorage.setItem("elaspedTyam", 0);
    setRemainingSec(session[0] * 60);
  };
  return (
    <section
      id={id}
      className={`default-session relative py-6 px-3 grid justify-items-center justify-self-center rounded-lg ${!isBreakTyam ? "bg-teal" : "bg-brickred"
        } text-white cursor-pointer'} `}
      onClick={handleClick}
    >
      <p>
        <span className="lg:text-4xl sm:text-3xl "> {sessionTime}</span>min
        <span>&nbsp;+&nbsp;</span>
        <span className="lg:text-3xl sm:text-2xl ">{sessionBreakTime}</span>min
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
