import React, { useEffect } from "react";
import Sketch from "react-p5";

let elaspedTime = window.localStorage.getItem("elaspedTime") || 0;

export default function CanvasCreator({
  time,
  breakTime,
  isBreak,
  isPause,
  setIsPause,
  setIsBreak,
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
  let sessionSeconds =
    parseInt(currentHr) * 3600 +
    parseInt(currentMin) * 60 +
    parseInt(currentSec);
  useEffect(() => {
    let interval = setInterval(() => {
      if (!isPause) {
        elaspedTime++;
        localStorage.setItem("elaspedTime", elaspedTime);
        console.log(elaspedTime);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPause, isBreak]);

  useEffect(() => {
    if (isBreak) {
      elaspedTime = 0;
      setIsPause(true);
    }
  }, [breakTime]);

  useEffect(() => {
    if (!isBreak) {
      if (sessionSeconds === elaspedTime) {
        setIsBreak(!isBreak);
      }
      elaspedTime = 0;
      setIsPause(true);
    }
  }, [time]);

  // useEffect(() => {
  //   setIsPause(false);
  //   elaspedTime = 0;
  // }, [isBreak]);

  function formatter(digit) {
    if (digit.toString().length === 1) {
      return "0" + digit.toString();
    }
    return digit;
  }

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
    // let remainingHr = parseInt((sessionSeconds - elaspedTime) / 3600);
    // let remainingMin = parseInt(
    //   (sessionSeconds - elaspedTime - elaspedHr * 3600) / 60
    // );

    // let remainingSec = parseInt(
    //   sessionSeconds -
    //     elaspedTime -
    //     remainingMin * 60 -
    //     remainingHr * 3600 -
    //     elaspedSec
    // );
    // let remainingSec = sessionSeconds - elaspedHr * 3600 - elaspedMin * 60;
    console.log(
      elaspedHr,
      elaspedMin,
      elaspedSec,
      remainingHr,
      remainingMin,
      remainingSec
    );
    if (sessionSeconds === elaspedTime) {
      setIsPause(true);
      setIsBreak(!isBreak);
      console.log("h");
    }
    p5.noFill();

    document.querySelector(".hr").textContent = formatter(remainingHr);
    document.querySelector(".min").textContent = formatter(remainingMin);
    document.querySelector(".sec").textContent = formatter(remainingSec);

    console.log(document.querySelector('.hr'))
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
