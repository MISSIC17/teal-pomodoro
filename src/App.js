import "./App.css";
import "./styles.css";
import React, { useState } from "react";
import CanvasCreator from "./Clock";
import Settings from "./Settings";
import Help from "./Help";
function App() {
  const [time, setTime] = useState({ hr: "00", min: "25", sec: "00" });
  const [breakTime, setBreakTime] = useState({
    hr: "00",
    min: "15",
    sec: "00",
  });
  const [test, setTest] = useState({
    hr0: 0,
    hr1: 0,
    min0: 1,
    min1: 5,
    sec0: 0,
    sec1: 0,
  });
  const [isBreak, setIsBreak] = useState(false);
  const [isPause, setIsPause] = useState(true);
  const handleBreakChange = () => {
    if (window.confirm("You sure you want to skip the session?")) {
      setIsBreak(!isBreak);
      localStorage.setItem("elaspedTime", 0);
    }
  };
  // const handleChange = (e, setMethod, method, element) => {
  //   setMethod((prevValue) => ({
  //     ...prevValue,
  //     hr: e.target.value,
  //   }));
  // };
  return (
    <>
      <main className="relative bg-teal h-[100vh] w-full grid grid-rows-[10%_auto_10%]">
        <nav className="flex justify-end pr-4 pt-3 gap-4">
          <Settings
            time={time}
            setTime={setTime}
            breakTime={breakTime}
            setBreakTime={setBreakTime}
            test={test}
            setTest={setTest}
          />
          <Help />
        </nav>
        <div className="clock-section relative grid place-items-center overflow-hidden">
          <div className="clock-circle-wrapper grid place-items-center">
            <CanvasCreator
              time={time}
              breakTime={breakTime}
              isBreak={isBreak}
              isPause={isPause}
              setIsPause={setIsPause}
            />
          </div>
          <div className="clock-info-wrapper absolute left-1/2 top-1/2 h-1/2 grid place-items-center transform -translate-x-1/2 -translate-y-1/2">
            <div className="title-section">
              <p>Pomodoro</p>
            </div>
            <section className="time-display flex flex-row">
              <span className="hr">00</span>:<span className="min">17</span>:
              <span className="sec">17</span>
            </section>
            <section className="button-display flex gap-5">
              <button className="pause" onClick={() => setIsPause(!isPause)}>
                {isPause ? `Resume` : "Pause"}
              </button>
              <button className="skip" onClick={handleBreakChange}>
                Skip
              </button>
            </section>
          </div>
        </div>
        <div className="spotify-section flex justify-center align-middle"></div>
      </main>
    </>
  );
}

export default App;
