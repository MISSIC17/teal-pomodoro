import React, { useState, useEffect, useContext } from "react";
import Sketch from "react-p5";
import sound from "./assets/bell.mp3";
import { timeObjToSeconds, formatter } from "./utils/helpers";
import { TimeContext } from "./App";
let elaspedTime = window.localStorage.getItem("elaspedTime") || 0;
let elaspedTyam = window.localStorage.getItem("elaspedTyam") || 0;

export default function CanvasCreator({
  time,
  breakTime,
  isBreak,
  isPause,
  setIsPause,
  setIsBreak,
  showAlert,
  isError,
  setIsError,
}) {
  // let currentTimeObj = !isBreak ? time : breakTime;

  const {
    tyam,
    breakTyam,
    isBreakTyam,
    setBreakTyam,
    setTyam,
    setIsBreakTyam,
    isPaws,
    setIsPaws,
    isErr,
    setIsErr,
    remainingSec,
    setRemainingSec,
  } = useContext(TimeContext);

  let sessionSeconds = !isBreak
    ? timeObjToSeconds(time)
    : timeObjToSeconds(breakTime);
  const minSeconds = !isBreak ? 1200 : 300;
  const [remainingTime, setRemainingTime] = useState(sessionSeconds);

  let sessionSexs = !isBreakTyam ? tyam : breakTyam;
  const minSexs = !isBreakTyam ? 1200 : 300; // minimum about of time for a session

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

  useEffect(() => {
    let interval = setInterval(() => {
      if (!isPaws && sessionSexs >= minSexs) {
        elaspedTyam++;

        setRemainingSec(parseInt(sessionSexs - elaspedTime));
        localStorage.setItem("elaspedTyam", elaspedTyam);
      }
      console.log("hi");

      let elaspedHr = parseInt(elaspedTime / 3600);
      let elaspedMin = parseInt((elaspedTime - elaspedHr * 3600) / 60);
      let elaspedSec = parseInt(
        elaspedTime - elaspedMin * 60 - elaspedHr * 3600,
      );
      // setRemainingSec(parseInt(sessionSexs - elaspedTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaws, isBreakTyam]);
  useEffect(() => {
    setRemainingSec(parseInt(sessionSexs - elaspedTime));
  }, []);

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

  useEffect(() => {
    let remainingHr = parseInt(remainingTime / 3600);
    let remainingMin = parseInt((remainingTime - remainingHr * 3600) / 60);
    let remainingSeconds = parseInt(
      remainingTime - remainingHr * 3600 - remainingMin * 60,
    );

    console.log("hi");
    document.title = `${formatter(remainingHr)}:${formatter(
      remainingMin,
    )}:${formatter(remainingSeconds)} | ${isBreak ? "Break" : "Pomodoro"}`;
    // document.querySelector(".hr").textContent = formatter(remainingHr);
    // document.querySelector(".min").textContent = formatter(remainingMin);
    // document.querySelector(".sec").textContent = formatter(remainingSec);
    if (!isErr && sessionSexs === elaspedTyam) {
      setIsBreakTyam(!isBreakTyam);
      setIsPaws(false);
      setRemainingSec(0);
      elaspedTyam = 0;
      localStorage.setItem("elaspedTyam", 0);
      let bell = new Audio(sound);
      bell.volume = 0.2;
      bell.play();
    }
  }, [remainingSec]);
  // useEffect(() => {
  //   elaspedTime = 0;
  //   setIsPause(false);
  // }, [isBreak]);
  useEffect(() => {
    elaspedTime = 0;
    setIsPaws(false);

    console.log("hi");
  }, [isBreakTyam]);
  // useEffect(() => {
  //   if (isBreak) {
  //     elaspedTime = 0;
  //     setIsPause(true);
  //   }
  // }, [breakTime]);
  useEffect(() => {
    if (isBreakTyam) {
      elaspedTime = 0;
      setIsPaws(true);

      console.log("hi");
    }
  }, [breakTyam]);
  // useEffect(() => {
  //   if (!isBreak) {
  //     elaspedTime = 0;
  //     setIsPause(true);
  //   }
  // }, [time]);
  // During pomodoro, whenever session time changes, pause and setRemaningTime to 0
  useEffect(() => {
    if (!isBreakTyam) {
      elaspedTime = 0;
      setIsPaws(true);
      setRemainingSec(0);
    }
  }, [tyam]);
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
        " Session duration cannot be less than 20 minutes",
      );
      setIsErr(true);
    }
    if (breakTyam < 300) {
      showAlert(
        true,
        "warning",
        " Break duration cannot be less than 5 minutes",
      );
      setIsErr(true);
    }
    if (tyam >= 1200 && breakTyam >= 300) {
      setIsErr(false);
      showAlert(false, "", "");
    }
  }, [tyam, breakTyam]);
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
    setRemainingSec(parseInt(sessionSexs - elaspedTyam));
    p5.rotate(-90);
    p5.noFill();

    let end = p5.map(elaspedTyam, 0, sessionSexs, 0, 360);
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
      x / 15 > 25 ? x / 15 : 25,
    );
  };

  return <Sketch setup={setup} draw={draw} />;
}
