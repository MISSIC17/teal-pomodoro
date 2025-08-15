import React, { useState, useEffect, useContext } from "react";

import { BsFillPauseCircleFill as PauseIcon } from "react-icons/bs";
import { IoPlaySkipForwardSharp as NextIcon } from "react-icons/io5";
import { AiFillPlayCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import Sketch from "react-p5";
import sound from "./assets/bell.mp3";
import { timeObjToSeconds, formatter, secToHHMMSS } from "./utils/helpers";
import { AppContext } from "./App";
let elaspedTime = () =>
  Number(window?.localStorage?.getItem("elaspedTime")) || 0;
let elaspedTyamCount = () =>
  Number(window?.localStorage?.getItem("elaspedTyam")) || 0;
export function ClockSection() {
  const {
    tyam,
    breakTyam,
    isBreakTyam,
    setIsBreakTyam,
    isPaws,
    setIsPaws,
    isErr,
    setIsErr,
    remainingSec,
    setRemainingSec,
    showAlert,
  } = useContext(AppContext);

  const formattedSeconds = secToHHMMSS(remainingSec);

  const handleBreakChange = () => {
    if (!isErr)
      if (window.confirm("You sure you want to skip the session?")) {
        setIsBreakTyam(!isBreakTyam);
        // localStorage.setItem("elaspedTime", 0);
        localStorage.setItem("elaspedTyam", 0);
        setIsPaws(false);
      }
  };

  return (
    <div
      id="clock-section"
      className="clock-section text-white relative grid place-items-center overflow-hidden"
    >
      <div className="clock-circle-wrapper grid place-items-center">
        <CanvasCreator />
      </div>
      <div className="clock-info-wrapper absolute left-1/2 top-1/2 h-1/2 flex justify-around items-center flex-col transform -translate-x-1/2 -translate-y-1/2">
        <div className="title-section font-sec transform -translate-y-1/2">
          <p>{!isBreakTyam ? `Pomodoro` : `Break`}</p>
        </div>
        <section className="time-display hidden absolute top-[50%] transform -translate-y-1/2 flex-row">
          <span className="hr">{/* Remaining hours*/}</span>:
          <span className="min">{/* Remaining minutes*/}</span>:
          <span className="sec">{/* Remaining seconds*/}</span>
          <br />
        </section>
        <section className="tyam-display absolute top-[50%] transform -translate-y-1/2 flex flex-row">
          {formattedSeconds}
          <br />
        </section>
        <section className="button-display flex gap-5 transform translate-y-1/2">
          <button
            className="pause"
            onClick={() => {
              if (!isErr) {
                // setIsPause(!isPause);
                setIsPaws(!isPaws);
              }
            }}
          >
            {isPaws ? (
              <IconContext.Provider value={{ color: "#283f54" }}>
                <AiFillPlayCircle className="control-icon" />
              </IconContext.Provider>
            ) : (
              <IconContext.Provider value={{ color: "#283f54" }}>
                <PauseIcon className="control-icon" />
              </IconContext.Provider>
            )}
          </button>
          <button className="skip" onClick={handleBreakChange}>
            <IconContext.Provider value={{ color: "#283f54" }}>
              <NextIcon className="control-icon " />
            </IconContext.Provider>
          </button>
        </section>
      </div>
    </div>
  );
}

function CanvasCreator() {
  const {
    tyam,
    breakTyam,
    isBreakTyam,
    setIsBreakTyam,
    isPaws,
    setIsPaws,
    isErr,
    setIsErr,
    remainingSec,
    setRemainingSec,
    showAlert,
  } = useContext(AppContext);

  let sessionDuration = !isBreakTyam ? tyam : breakTyam;
  const minimumSessionDuration = !isBreakTyam ? 1200 : 300; // minimum about of time for a session i.e. a user can't set pomdoro to be less than 1200s
  const [elaspedTyam, setElaspedTyam] = useState(elaspedTyamCount());

  useEffect(() => {
    let interval = setInterval(() => {
      if (!isPaws && sessionDuration >= minimumSessionDuration) {
        setElaspedTyam((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaws, minimumSessionDuration, sessionDuration]);
  useEffect(() => {
    localStorage.setItem("elaspedTyam", elaspedTyam);
    setRemainingSec(parseInt(sessionDuration - elaspedTyam));

    // let elaspedHr = parseInt(elaspedTime / 3600);
    // let elaspedMin = parseInt((elaspedTime - elaspedHr * 3600) / 60);
    // let elaspedSec = parseInt(elaspedTime - elaspedMin * 60 - elaspedHr * 3600);
  }, [elaspedTyam, sessionDuration, setRemainingSec]);

  useEffect(() => {
    let remainingHr = parseInt(remainingSec / 3600);
    let remainingMin = parseInt((remainingSec - remainingHr * 3600) / 60);
    let remainingSeconds = parseInt(
      remainingSec - remainingHr * 3600 - remainingMin * 60
    );
    document.title = `${formatter(remainingHr)}:${formatter(
      remainingMin
    )}:${formatter(remainingSeconds)} | ${!isBreakTyam ? "Pomodoro" : "Break"}`;
  }, [remainingSec, isBreakTyam]);
  useEffect(() => {
    if (sessionDuration === elaspedTyam && !isErr) {
      setIsBreakTyam((prev) => !prev);
      setIsPaws(false);
      setRemainingSec(0);
      localStorage.setItem("elaspedTyam", 0);
      let bell = new Audio(sound);
      bell.volume = 0.2;
      bell.play();
    }
  }, [
    isErr,
    sessionDuration,
    elaspedTyam,
    setIsBreakTyam,
    setIsPaws,
    setRemainingSec,
  ]);
  useEffect(() => {
    setElaspedTyam(0);
    window.localStorage.setItem("elaspedTyam", 0);
    if (isBreakTyam) {
      setIsPaws(true);
    } else {
      setIsPaws(false);
    }
  }, [isBreakTyam]);

  useEffect(() => {
    if (!isBreakTyam) {
      setElaspedTyam(0);
      setIsPaws(true);
      window.localStorage.setItem("elaspedTyam", 0);
    }
  }, [tyam, isBreakTyam, setIsPaws]);

  // useEffect(() => {
  //   elaspedTime = 0;
  //   setElaspedTyam(0);
  //   setIsPaws(false);
  //   window.localStorage.setItem("elaspedTyam", 0);
  // }, [isBreakTyam, setIsPaws]);
  // useEffect(() => {
  //   if (isBreak) {
  //     elaspedTime = 0;
  //     setIsPause(true);
  //   }
  // }, [breakTime]);
  // useEffect(() => {
  //   if (isBreakTyam) {
  //     elaspedTime = 0;
  //     setIsPaws(true);
  //   }
  // }, [isBreakTyam, setIsPaws]);
  // useEffect(() => {
  //   if (!isBreak) {
  //     elaspedTime = 0;
  //     setIsPause(true);
  //   }
  // }, [time]);
  // During pomodoro, whenever session time changes, pause and setRemaningTime to 0

  // useEffect(() => {
  //   setRemainingSec(parseInt(sessionDuration - elaspedTime));
  // }, [sessionDuration, setRemainingSec]);

  // let sessionSeconds = !isBreak
  //   ? timeObjToSeconds(time)
  //   : timeObjToSeconds(breakTime);
  // const minSeconds = !isBreak ? 1200 : 300;
  // const [remainingTime, setRemainingTime] = useState(sessionSeconds);

  // useEffect(() => {
  //   let interval = setInterval(() => {
  //     if (!isPause && sessionSeconds >= minSeconds) {
  //       elaspedTime++;
  //       localStorage.setItem("elaspedTime", elaspedTime);
  //     }
  //
  //     let elaspedHr = parseInt(elaspedTime / 3600);
  //     let elaspedMin = parseInt((elaspedTime - elaspedHr * 3600) / 60);
  //     let elaspedSec = parseInt(
  //       elaspedTime - elaspedMin * 60 - elaspedHr * 3600,
  //     );
  //     setRemainingTime(parseInt(sessionSeconds - elaspedTime));
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [isPause, isBreak]);

  // useEffect(() => {
  //   let remainingHr = parseInt(remainingTime / 3600);
  //   let remainingMin = parseInt((remainingTime - remainingHr * 3600) / 60);
  //   let remainingSec = parseInt(
  //     remainingTime - remainingHr * 3600 - remainingMin * 60,
  //   );
  //   document.title = `${formatter(remainingHr)}:${formatter(
  //     remainingMin,
  //   )}:${formatter(remainingSec)} | ${isBreak ? "Break" : "Pomodoro"}`;
  //   document.querySelector(".hr").textContent = formatter(remainingHr);
  //   document.querySelector(".min").textContent = formatter(remainingMin);
  //   document.querySelector(".sec").textContent = formatter(remainingSec);
  //   if (!isError && sessionSeconds === elaspedTime) {
  //     setIsBreak(!isBreak);
  //     setIsPause(false);
  //     setRemainingTime(0);
  //     elaspedTime = 0;
  //     localStorage.setItem("elaspedTime", 0);
  //     let bell = new Audio(sound);
  //     bell.volume = 0.2;
  //     bell.play();
  //   }
  // }, [remainingTime]);

  // useEffect(() => {
  //   elaspedTime = 0;
  //   setIsPause(false);
  // }, [isBreak]);
  // useEffect(() => {
  //
  //     console.log("hi")
  //   if (timeObjToSeconds(time) < 1200) {
  //     showAlert(
  //       true,
  //       "warning",
  //       " Session duration cannot be less than 20 minutes",
  //     );
  //     setIsError(true);
  //   }
  //   if (timeObjToSeconds(breakTime) < 300) {
  //     showAlert(
  //       true,
  //       "warning",
  //       " Break duration cannot be less than 5 minutes",
  //     );
  //     setIsError(true);
  //   }
  //   if (timeObjToSeconds(time) >= 1200 && timeObjToSeconds(breakTime) >= 300) {
  //     setIsError(false);
  //     showAlert(false, "", "");
  //   }
  // }, [time, breakTime]);

  useEffect(() => {
    if (tyam < 1200) {
      showAlert(
        true,
        "warning",
        " Session duration cannot be less than 20 minutes"
      );
      setIsErr(true);
    }
    if (breakTyam < 300) {
      showAlert(
        true,
        "warning",
        " Break duration cannot be less than 5 minutes"
      );
      setIsErr(true);
    }
    if (tyam >= 1200 && breakTyam >= 300) {
      setIsErr(false);
      showAlert(false, "", "");
    }
  }, [tyam, breakTyam, setIsErr, showAlert]);

  const setup = (p5, canvasParentRef) => {
    if (p5.windowWidth >= 600) {
      let canvasHeight = (p5.windowHeight / 100) * 69;
      let canvasWidth = canvasHeight;
      p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    } else {
      let canvasHeight = p5.windowWidth;
      let canvasWidth = p5.windowWidth;
      p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    }
    p5.angleMode(p5.DEGREES);
  };

  const draw = (p5) => {
    if (!isBreakTyam) {
      p5.background(68, 137, 148);
    } else {
      p5.background(128, 46, 35);
    }
    p5.translate(p5.width / 2, p5.height / 2);
    // setRemainingSec(parseInt(sessionDuration - elaspedTyam));
    p5.rotate(-90);
    p5.noFill();

    let end = p5.map(elaspedTyam, 0, sessionDuration, 0, 360);
    let x = p5.width - 100 >= 600 ? 600 : p5.width - 50;

    p5.stroke(68, 71, 71, 100);
    p5.arc(0, 0, x, x, 0, 360);
    p5.stroke(255);
    p5.strokeWeight(x / 40 > 10 ? x / 40 : 10);
    p5.arc(0, 0, x, x, 0, end);
    p5.stroke(255);
    p5.fill(255);
    p5.noStroke();
    p5.circle(
      (x / 2) * p5.cos(end),
      (x / 2) * p5.sin(end),
      x / 15 > 25 ? x / 15 : 25
    );
  };

  return <Sketch setup={setup} draw={draw} />;
}
