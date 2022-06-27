import "./App.css";
import "./styles.css";
import React, { useRef, useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { MdLiveHelp } from "react-icons/md";
import canvasCreator from "./Clock";
function App() {
  const [time, setTime] = useState({ hr: "00", min: "25", sec: "00" });
  const [breakTime, setBreakTime] = useState({
    hr: "00",
    min: "15",
    sec: "00",
  });
  const [isBreak, setIsBreak] = useState(false);
  const [isPause, setIsPause] = useState(false);
  // const handleChange = (e, setMethod, method, element) => {
  //   setMethod((prevValue) => ({
  //     ...prevValue,
  //     hr: e.target.value,
  //   }));
  // };
  return (
    <>
      <main className="relative bg-teal h-[100vh] w-full grid grid-rows-[10%_auto_10%]">
        <nav className="flex justify-end">
          <div className="settings-wrapper">
            <FiSettings />
            <section className="settings-options-wrapper absolute left-0">
              <form action="" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="number"
                  name="hr"
                  id="id"
                  value={time.hr}
                  // onChange={(e) => handleChange(e, setTime, time, "hr")}
                  onChange={(e) => {
                    setTime((prevTime) => ({
                      ...prevTime,
                      hr: e.target.value,
                    }));
                  }}
                />
                <input
                  type="number"
                  name="min"
                  id="min"
                  value={time.min}
                  onChange={(e) => {
                    setTime((prevTime) => ({
                      ...prevTime,
                      min: e.target.value,
                    }));
                  }}
                />
                <input
                  type="number"
                  name="sec"
                  id="sec"
                  value={time.sec}
                  onChange={(e) => {
                    setTime((prevTime) => ({
                      ...prevTime,
                      sec: e.target.value,
                    }));
                  }}
                />
              </form>
              <form action="" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="number"
                  name="break-hr"
                  id="break-hr"
                  value={breakTime.hr}
                  onChange={(e) => {
                    setBreakTime((prevBreak) => ({
                      ...prevBreak,
                      hr: e.target.value,
                    }));
                  }}
                />
                <input
                  type="number"
                  name="break-min"
                  id="break-min"
                  value={breakTime.min}
                  onChange={(e) => {
                    setBreakTime((prevBreak) => ({
                      ...prevBreak,
                      min: e.target.value,
                    }));
                  }}
                />
                <input
                  type="number"
                  name="break-sec"
                  id="break-sec"
                  value={breakTime.sec}
                  onChange={(e) => {
                    setBreakTime((prevBreak) => ({
                      ...prevBreak,
                      sec: e.target.value,
                    }));
                  }}
                />
              </form>
            </section>
          </div>
          <div className="help-wrapper">
            <MdLiveHelp />
          </div>
        </nav>
        <div className="clock-section relative grid place-items-center overflow-hidden">
          <div className="clock-circle-wrapper grid place-items-center">
            {canvasCreator(time,breakTime,isBreak,isPause)}
          </div>
          <div className="clock-info-wrapper absolute left-1/2 top-1/2 h-1/2 grid place-items-center transform -translate-x-1/2 -translate-y-1/2">
            <div className="title-section">
              <p>Pomodoro</p>
            </div>
            <section className="time-display flex flex-row">
              <span className="hr">00</span>:<span className="min">17</span>:
              <span className="sec">17</span>
            </section>
            <section className="button-display">
              <button className="pause" onClick={()=>setIsPause(!isPause)}>Pause</button>
              <button className="skip" onClick={()=>setIsBreak(!isBreak)}>Skip</button>
            </section>
          </div>
        </div>
        <div className="spotify-section"></div>
      </main>
    </>
  );
}

export default App;
