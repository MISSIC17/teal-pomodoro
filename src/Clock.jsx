import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import sound from './assets/bell.mp3';

let elaspedTime = window.localStorage.getItem("elaspedTime") || 0;

export function formatter(digit) {
  if (digit.toString().length === 1) {
    return "0" + digit.toString();
  }
  return digit.toString();
}

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
  const timeObjToSeconds = (timeObj) => {
    let hr = parseInt(timeObj.hr[0].toString() + timeObj.hr[1].toString());
    let min = parseInt(timeObj.min[0].toString() + timeObj.min[1].toString());
    let sec = parseInt(timeObj.sec[0].toString() + timeObj.sec[1].toString());
    let totalSeconds = parseInt(hr) * 3600 + parseInt(min) * 60 + parseInt(sec);
    return totalSeconds;
  };

  let sessionSeconds = !isBreak
    ? timeObjToSeconds(time)
    : timeObjToSeconds(breakTime);
  const minSeconds = !isBreak ? 12 : 3;
  const [remainingTime, setRemainingTime] = useState(sessionSeconds);

  useEffect(() => {
    let interval = setInterval(() => {
      if (!isPause && sessionSeconds >= minSeconds) {
        elaspedTime++;
        localStorage.setItem("elaspedTime", elaspedTime);
      }
      let elaspedHr = parseInt(elaspedTime / 3600);
      let elaspedMin = parseInt((elaspedTime - elaspedHr * 3600) / 60);
      let elaspedSec = parseInt(
        elaspedTime - elaspedMin * 60 - elaspedHr * 3600
      );
      setRemainingTime(parseInt(sessionSeconds - elaspedTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPause, isBreak]);

  useEffect(() => {
    let remainingHr = parseInt(remainingTime / 3600);
    let remainingMin = parseInt((remainingTime - remainingHr * 3600) / 60);
    let remainingSec = parseInt(
      remainingTime - remainingHr * 3600 - remainingMin * 60
    );
    document.title = `${formatter(remainingHr)}:${formatter(
      remainingMin
    )}:${formatter(remainingSec)} | ${isBreak ? "Break" : "Pomodoro"}`;
    document.querySelector(".hr").textContent = formatter(remainingHr);
    document.querySelector(".min").textContent = formatter(remainingMin);
    document.querySelector(".sec").textContent = formatter(remainingSec);
    if (!isError && sessionSeconds === elaspedTime) {
      setIsBreak(!isBreak);
      setIsPause(false);
      setRemainingTime(0);
      console.log(isBreak);
      elaspedTime = 0;
      localStorage.setItem("elaspedTime", 0);
      let bell = new Audio(sound);
      bell.volume = 0.2;
      bell.play();
    }
  }, [remainingTime]);

  useEffect(() => {
    elaspedTime = 0;
    setIsPause(false);
  }, [isBreak]);

  useEffect(() => {
    if (isBreak) {
      elaspedTime = 0;
      setIsPause(true);
    }
  }, [breakTime]);

  useEffect(() => {
    if (!isBreak) {
      elaspedTime = 0;
      setIsPause(true);
    }
  }, [time]);

  useEffect(() => {
    if (timeObjToSeconds(time) < 9) {
      showAlert(
        true,
        "warning",
        " Session duration cannot be less than 20 minutes"
      );
      setIsError(true);
    }
    if (timeObjToSeconds(breakTime) < 3) {
      showAlert(
        true,
        "warning",
        " Break duration cannot be less than 5 minutes"
      );
      setIsError(true);
    }
    if (timeObjToSeconds(time) >= 8 && timeObjToSeconds(breakTime) >= 3) {
      setIsError(false);
    }
  }, [time, breakTime]);

  // useEffect(() => {
  //   let interval = setInterval(() => {
  //     if (!isError && remainingTime === 0) {
  //       setIsBreak(!isBreak);
  //       setIsPause(false);
  //       setRemainingTime(0);
  //       elaspedTime = 0;
  //       localStorage.setItem("elaspedTime", 0);
  //       console.log("Work done");
  //     }
  //    console.log("hello") ;
  //     let elaspedHr = parseInt(elaspedTime / 3600);
  //     let elaspedMin = parseInt((elaspedTime - elaspedHr * 3600) / 60);
  //     let elaspedSec = parseInt(
  //       elaspedTime - elaspedMin * 60 - elaspedHr * 3600
  //     );
  //     let remainingHr = parseInt(remainingTime / 3600);
  //     let remainingMin = parseInt((remainingTime - remainingHr * 3600) / 60);
  //     let remainingSec = parseInt(
  //       remainingTime - remainingHr * 3600 - remainingMin * 60
  //     );
  //     console.log(remainingTime);
  //     // document.title = remainingTime;
  //     document.querySelector(".hr").textContent = formatter(remainingHr);
  //     document.querySelector(".min").textContent = formatter(remainingMin);
  //     document.querySelector(".sec").textContent = formatter(remainingSec);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // },[isPause,isBreak]);

  // useEffect(() => {
  //   // let remainingTime = parseInt(sessionSeconds - elaspedTime);
  //   // let remainingHr = parseInt(remainingTime / 3600);
  //   // let remainingMin = parseInt((remainingTime - remainingHr * 3600) / 60);
  //   // let remainingSec = parseInt(
  //   //   remainingTime - remainingHr * 3600 - remainingMin * 60
  //   // );
  // if (!isError && sessionSeconds === elaspedTime) {
  //   setRemainingTime(0);
  //   setIsPause(true);
  //   setIsBreak(!isBreak);
  // }
  // }, [remainingTime]);
  // });

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
    if (!isBreak) {
      p5.background(68, 137, 148);
    } else {
      p5.background(128, 46, 35);
    }
    p5.translate(p5.width / 2, p5.height / 2);
    setRemainingTime(parseInt(sessionSeconds - elaspedTime));
    p5.rotate(-90);
    // let elaspedHr = parseInt(elaspedTime / 3600);
    // let elaspedMin = parseInt((elaspedTime - elaspedHr * 3600) / 60);
    // let elaspedSec = parseInt(elaspedTime - elaspedMin * 60 - elaspedHr * 3600);
    // let remainingHr = parseInt(remainingTime / 3600);
    // let remainingMin = parseInt((remainingTime - remainingHr * 3600) / 60);
    // let remainingSec = parseInt(
    //   remainingTime - remainingHr * 3600 - remainingMin * 60
    // );
    // if (remainingTime === 0) {
    //   console.log("Ho yetai");
    //   // setIsBreak(!isBreak);
    // }
    // if (sessionSeconds !== 0 && sessionSeconds === elaspedTime) {
    //   remainingSec = 0;
    //   setIsPause(true);
    //   setIsBreak(!isBreak);
    // }
    p5.noFill();

    // document.querySelector(".hr").textContent = formatter(remainingHr);
    // document.querySelector(".min").textContent = formatter(remainingMin);
    // document.querySelector(".sec").textContent = formatter(remainingSec);

    let end = p5.map(elaspedTime, 0, sessionSeconds, 0, 360);
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
