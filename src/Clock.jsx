import React, { useEffect } from "react";
import Sketch from "react-p5";

let elaspedTime = window.sessionStorage.getItem("elaspedTime") || 0;

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
  setError,
}) {
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
  let currentTimeObj = !isBreak ? time : breakTime;

  let currentHr = parseInt(
    currentTimeObj.hr[0].toString() + currentTimeObj.hr[1].toString()
  );
  let currentMin = parseInt(
    currentTimeObj.min[0].toString() + currentTimeObj.min[1].toString()
  );
  let currentSec = parseInt(
    currentTimeObj.sec[0].toString() + currentTimeObj.sec[1].toString()
  );
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
  let minSeconds = !isBreak ? 900 : 300;
  useEffect(() => {
    let interval = setInterval(() => {
      if (!isPause && sessionSeconds > minSeconds) {
        elaspedTime++;
        sessionStorage.setItem("elaspedTime", elaspedTime);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPause, isBreak]);
  useEffect(() => {
    elaspedTime = 0;
  }, [isBreak]);

  useEffect(() => {
    if (isBreak) {
      elaspedTime = 0;
      setIsPause(true);
    }
  }, [breakTime]);
  useEffect(() => {}, [isPause, isBreak]);
  useEffect(() => {
    if (timeObjToSeconds(time) < 1200) {
      showAlert(
        true,
        "warning",
        "Session duration cannot be less than 20 minutes"
      );
      setError(true);
      // setError(true, "Session duration cannot be less than 20 minutes")
      // setIsLazyTime(true);
      // setAlertMessage("Session duration cannot be less than 20 minutes");
    }
    if (timeObjToSeconds(breakTime) < 300) {
      showAlert(
        true,
        "warning",
        "Break duration cannot be less than 5 minutes"
      );
      setError(true);
      // setIsLazyTime(true);
      // setAlertMessage("Break duration cannot be less than 5 minutes");
    }
    if (timeObjToSeconds(time) >= 1200 && timeObjToSeconds(breakTime) >= 300) {
      setError(false);
    }
  }, [time, breakTime]);

  useEffect(() => {
    if (!isBreak) {
      if (sessionSeconds !== 0 && sessionSeconds === elaspedTime) {
        setIsBreak(!isBreak);
      }
      elaspedTime = 0;
      setIsPause(true);
    }
  }, [time]);

  const draw = (p5) => {
    p5.background(68, 137, 148);
    p5.translate(p5.width / 2, p5.height / 2);
    let remainingTime = parseInt(sessionSeconds - elaspedTime);
    p5.rotate(-90);
    let elaspedHr = parseInt(elaspedTime / 3600);
    let elaspedMin = parseInt((elaspedTime - elaspedHr * 3600) / 60);
    let elaspedSec = parseInt(elaspedTime - elaspedMin * 60 - elaspedHr * 3600);
    let remainingHr = parseInt(remainingTime / 3600);
    let remainingMin = parseInt((remainingTime - remainingHr * 3600) / 60);
    let remainingSec = parseInt(
      remainingTime - remainingHr * 3600 - remainingMin * 60
    );
    if (sessionSeconds !== 0 && sessionSeconds === elaspedTime) {
      remainingSec = 0;
      setIsPause(true);
      setIsBreak(!isBreak);
    }
    p5.noFill();

    document.querySelector(".hr").textContent = formatter(remainingHr);
    document.querySelector(".min").textContent = formatter(remainingMin);
    document.querySelector(".sec").textContent = formatter(remainingSec);

    let end = p5.map(elaspedTime, 0, sessionSeconds, 0, 360);
    let x = p5.width - 100 >= 600 ? 600 : p5.width - 50;

    p5.stroke(68, 71, 71, 100);
    p5.arc(0, 0, x, x, 0, 360);
    p5.stroke(255);
    p5.strokeWeight(x / 40);
    p5.arc(0, 0, x, x, 0, end);
    p5.stroke(255);
    p5.fill(255);
    p5.noStroke();
    p5.circle((x / 2) * p5.cos(end), (x / 2) * p5.sin(end), x / 15);
  };

  return <Sketch setup={setup} draw={draw} />;
}
