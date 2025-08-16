import "./styles/styles.css";
import "./styles/responsive.css";
import "./styles/App.css";
import "./styles/clock.css";
import React, {
  useState,
  useEffect,
  createContext,
  useMemo,
  useCallback,
} from "react";
import { ClockSection, formatter } from "./Clock";
import Settings from "./Settings";
import Help from "./Help";
import Alert from "./Alert";
import { IconContext } from "react-icons";
import { MdLiveHelp } from "react-icons/md";
import { mobileChecker, secToHHMMSS } from "./utils/helpers";
export const AppContext = createContext(null);
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
  const showAlert = useCallback((show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  }, []);
  // const handleKeyPress = (e) => {
  //   if (e.key === "s") {
  //     handleBreakChange();
  //   } else if (e.key === " ") {
  //     setIsPause(!isPause);
  //   } else if (e.shiftKey) {
  //     setShowSettings(!showSettings);
  //     document.getElementById("time-hr-0").focus();
  //   } else if (e.key === "h") {
  //     setShowHelp(!showHelp);
  //   } else if (e.key === "m") {
  //   }
  // };
  // useEffect(() => {
  //   document.addEventListener("keydown", handleKeyPress);
  //   return () => document.removeEventListener("keydown", handleKeyPress);
  // });
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
    <AppContext.Provider
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
        } h-[100dvh] max-h-[100dvh] sm:h-[100dvh] w-full grid grid-rows-[10%_auto_10%] transition-all ease-linear duration-75`}
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
        <ClockSection />
        <div className="spotify-section justify-center align-middle hidden"></div>
      </main>
    </AppContext.Provider>
  );
}

export default App;
