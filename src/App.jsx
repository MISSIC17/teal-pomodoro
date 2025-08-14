import "./styles/styles.css";
import "./styles/responsive.css";
import "./styles/App.css";
import "./styles/clock.css";
import React, { useState, useEffect, createContext, useMemo } from "react";
import CanvasCreator, { formatter } from "./ClockCanvas";
import Settings from "./Settings";
import Help from "./Help";
import Alert from "./Alert";
import { BsFillPauseCircleFill } from "react-icons/bs";
import { IoPlaySkipForwardSharp } from "react-icons/io5";
import { AiFillPlayCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { MdLiveHelp } from "react-icons/md";
import { useContext } from "react";
import { mobileChecker, secToHHMMSS } from "./utils/helpers";
export const TimeContext = createContext(null);
function App() {
  const [time, setTime] = useState(() => {
    return {
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
    };
  });
  // const [time, setTime] = useState({});
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

  const [tyam, setTyam] = useState(1200);
  const [breakTyam, setBreakTyam] = useState(300);
  const [isBreakTyam, setIsBreakTyam] = useState(false);

  const [formattedSeconds, setFormattedSeconds] = useState(
    secToHHMMSS(!isBreakTyam ? tyam : breakTyam)
  );
  const [isPaws, setIsPaws] = useState(true);
  const [isErr, setIsErr] = useState(false);
  const [remainingSec, setRemainingSec] = useState(
    !isBreakTyam ? tyam : breakTyam
  );

  window.mobileCheck = mobileChecker;

  const onMobile = useMemo(() => window.mobileCheck(), []);
  const [isBreak, setIsBreak] = useState(false);
  const [isPause, setIsPause] = useState(true);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [isError, setIsError] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const handleBreakChange = () => {
    if (!isErr)
      if (window.confirm("You sure you want to skip the session?")) {
        setIsBreakTyam(!isBreakTyam);
        // localStorage.setItem("elaspedTime", 0);
        localStorage.setItem("elaspedTyam", 0);
        setIsPaws(false);
      }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const handleKeyPress = (e) => {
    if (e.key === "s") {
      handleBreakChange();
    } else if (e.key === " ") {
      setIsPause(!isPause);
    } else if (e.shiftKey) {
      setShowSettings(!showSettings);
      document.getElementById("time-hr-0").focus();
    } else if (e.key === "h") {
      setShowHelp(!showHelp);
    } else if (e.key === "m") {
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  });
  useEffect(() => {
    console.log(breakTime, time);
  }, [breakTime, time]);
  useEffect(() => {
    setFormattedSeconds(secToHHMMSS(remainingSec));
  }, [remainingSec]);
  useEffect(() => {
    console.log(formattedSeconds);
  }, [formattedSeconds]);
  return (
    <TimeContext.Provider
      value={{
        tyam,
        breakTyam,
        isBreakTyam,
        setTyam,
        setBreakTyam,
        setIsBreakTyam,
        isPaws,
        setIsPaws,
        isErr,
        setIsErr,
        remainingSec,
        setRemainingSec,
        showAlert,
        showSettings,
        setShowSettings,
        showHelp,
        setShowHelp,
      }}
    >
      {alert.show && (
        <Alert
          {...alert}
          setAlert={setAlert}
          showAlert={showAlert}
          isError={isError}
        />
      )}
      {showHelp && (
        <Help
          showHelp={showHelp}
          setShowHelp={setShowHelp}
          isBreak={isBreak}
          onMobile={onMobile}
        />
      )}
      <main
        className={`relative ${
          !isBreakTyam ? "bg-teal" : "bg-brickred"
        } h-[100vh] max-h-[100vh] sm:h-[100vh] w-full grid grid-rows-[10%_auto_10%] transition-all ease-linear duration-75`}
      >
        <nav className="flex justify-end pr-4 pt-3 gap-4">
          <Settings
            time={time}
            setTime={setTime}
            breakTime={breakTime}
            setBreakTime={setBreakTime}
            setIsBreak={setIsBreak}
            showSettings={showSettings}
            setShowSettings={setShowSettings}
            isBreak={isBreak}
          />
          {!onMobile && (
            <IconContext.Provider value={{ color: "white" }}>
              <MdLiveHelp
                id="help-icon"
                className="h-10 w-10"
                onClick={() => setShowHelp(true)}
              />
            </IconContext.Provider>
          )}
          {/* <Help /> */}
        </nav>
        <div className="clock-section text-white relative grid place-items-center overflow-hidden">
          <div className="clock-circle-wrapper grid place-items-center">
            <CanvasCreator />
          </div>
          <div className="clock-info-wrapper absolute left-1/2 top-1/2 h-1/2 flex justify-around items-center flex-col transform -translate-x-1/2 -translate-y-1/2">
            <div className="title-section transform -translate-y-1/2">
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
        <div className="spotify-section justify-center align-middle hidden"></div>
      </main>
    </TimeContext.Provider>
  );
}

export default App;
