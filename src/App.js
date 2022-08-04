import "./App.css";
import "./styles.css";
import "./responsive.css";
import React, { useState } from "react";
import CanvasCreator from "./Clock";
import Settings from "./Settings";
import Help from "./Help";
import Alert from "./Alert";
import { BsFillPauseCircleFill } from "react-icons/bs";
import { IoPlaySkipForwardSharp } from "react-icons/io5";
import { AiFillPlayCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
function App() {
  const [time, setTime] = useState({
    hr: {
      0: 0,
      1: 0,
    },
    min: {
      0: 2,
      1: 0,
    },
    sec: {
      0: 0,
      1: 0,
    },
  });
  const [breakTime, setBreakTime] = useState({
    hr: {
      0: 0,
      1: 0,
    },
    min: {
      0: 0,
      1: 5,
    },
    sec: {
      0: 0,
      1: 0,
    },
  });
  const [isBreak, setIsBreak] = useState(false);
  const [isPause, setIsPause] = useState(true);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [error, setError] = useState(false);
  const handleBreakChange = () => {
    if(!error)
    if (window.confirm("You sure you want to skip the session?")) {
      setIsBreak(!isBreak);
      sessionStorage.setItem("elaspedTime", 0);
      setIsPause(false);
    }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  // const reportError = (exists = false, msg = ""){
  //   setE }

  return (
    <>
      {alert.show && error && <Alert {...alert} removeAlert={showAlert} error={error} />}
      <main className="relative bg-teal h-[100vh] w-full grid grid-rows-[10%_auto_10%]">
        <nav className="flex justify-end pr-4 pt-3 gap-4">
          <Settings
            time={time}
            setTime={setTime}
            breakTime={breakTime}
            setBreakTime={setBreakTime}
            setIsBreak = {setIsBreak}
          />
          <Help />
        </nav>
        <div className="clock-section text-white relative grid place-items-center overflow-hidden">
          <div className="clock-circle-wrapper grid place-items-center">
            <CanvasCreator
              time={time}
              breakTime={breakTime}
              isBreak={isBreak}
              isPause={isPause}
              setIsPause={setIsPause}
              setIsBreak={setIsBreak}
              showAlert={showAlert}
              setError = {setError}
            />
          </div>
          <div className="clock-info-wrapper absolute left-1/2 top-1/2 h-1/2 grid place-items-center transform -translate-x-1/2 -translate-y-1/2">
            <div className="title-section">
              <p>{!isBreak ? `Pomodoro` : `Break`}</p>
            </div>
            <section className="time-display flex flex-row">
              <span className="hr">{/* Remaining hours*/}</span>:
              <span className="min">{/* Remaining minutes*/}</span>:
              <span className="sec">{/* Remaining seconds*/}</span>
              <br />
            </section>
            <section className="button-display flex gap-5">
              <button
                className="pause"
                onClick={() => {
                  if (!error) {
                    setIsPause(!isPause);
                  }
                }}
              >
                {isPause ? (
                  <IconContext.Provider value={{ color: "#283f54" }}>
                    <AiFillPlayCircle className="control-icon" />
                  </IconContext.Provider>
                ) : (
                  <IconContext.Provider value={{ color: "#283f54" }}>
                    <BsFillPauseCircleFill className="control-icon" />
                  </IconContext.Provider>
                )}
              </button>
              <button className="skip" onClick={handleBreakChange}>
                <IconContext.Provider value={{ color: "#283f54" }}>
                  <IoPlaySkipForwardSharp className="control-icon " />
                </IconContext.Provider>
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
