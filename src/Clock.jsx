import React, { useEffect } from "react";
import Sketch from "react-p5";

let elaspedTime = window.localStorage.getItem("elaspedTime") || 0;

export default function CanvasCreator({
  time,
  breakTime,
  isBreak,
  isPause,
  setIsPause,
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

  let sessionSeconds = !isBreak
    ? parseInt(time.hr) * 3600 + parseInt(time.min) * 60 + parseInt(time.sec)
    : parseInt(breakTime.hr) * 3600 +
      parseInt(breakTime.min) * 60 +
      parseInt(breakTime.sec);

  useEffect(() => {
    let interval = setInterval(() => {
      if (!isPause) {
        elaspedTime++;
        localStorage.setItem("elaspedTime", elaspedTime);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPause, isBreak]);

  useEffect(() => {
    if (isBreak) {
      elaspedTime = 0;
      setIsPause(true);
    }
  }, [isBreak, breakTime]);

  useEffect(() => {
    if (!isBreak) {
      elaspedTime = 0;
      setIsPause(true);
    }
  }, [isBreak, time]);

  function formatter(digit) {
    if (digit.toString().length === 1) {
      return "0" + digit.toString();
    }
    return digit;
  }

  const draw = (p5) => {
    p5.background(68, 137, 148);
    p5.translate(p5.width / 2, p5.height / 2);
    p5.rotate(-90);
    // let date = new Date();
    // let hr = date.getHours();
    // let min = date.getMinutes();
    // let sec = date.getSeconds();
    // let mil = date.getMilliseconds();
    // hr = hr + min / 60;
    // min = min + sec / 60;
    // sec = sec + mil / 1000;

    let setHr = parseInt(sessionSeconds / 3600);
    let setMin = parseInt((sessionSeconds - setHr * 3600) / 60);
    let setSec = sessionSeconds - setMin * 60 - setHr * 3600;
    let elaspedHr = parseInt(elaspedTime / 3600);
    let elaspedMin = parseInt((elaspedTime - elaspedHr * 3600) / 60);
    let elaspedSec = elaspedTime - elaspedMin * 60 - elaspedHr * 3600;
    let remainingHr = parseInt((sessionSeconds - elaspedTime) / 3600);
    let remainingMin = parseInt(
      (sessionSeconds - elaspedTime - elaspedHr * 3600) / 60
    );
    let remainingSec =
      sessionSeconds - elaspedTime - remainingMin * 60 - remainingHr * 3600;

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
