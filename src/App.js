import "./App.css";
import "./styles.css";
import "./responsive.css";
import React, { useState, useEffect } from "react";
import CanvasCreator from "./Clock";
import Settings from "./Settings";
import Help from "./Help";
import Alert from "./Alert";
import { BsFillPauseCircleFill } from "react-icons/bs";
import { IoPlaySkipForwardSharp } from "react-icons/io5";
import { AiFillPlayCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { MdLiveHelp } from "react-icons/md";
function App() {
  const [time, setTime] = useState({
    hr: {
      0: 0,
      1: 0,
    },
    min: {
      0: 0,
      1: 0,
    },
    sec: {
      0: 1,
      1: 2,
    },
  });
  const [breakTime, setBreakTime] = useState({
    hr: {
      0: 0,
      1: 0,
    },
    min: {
      0: 0,
      1: 0,
    },
    sec: {
      0: 1,
      1: 0,
    },
  });
  // useEffect(()=>{
  //  let interval =  setInterval(()=>{
  //     document.title = new Date().getTime();
  //   })
  // return () => clearInterval(interval) ;
  // })
  window.mobileCheck = function () {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };
  console.log(window.mobileCheck());
  const [onMobile, setOnMobile] = useState(window.mobileCheck());
  const [isBreak, setIsBreak] = useState(false);
  const [isPause, setIsPause] = useState(true);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [isError, setIsError] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const handleBreakChange = () => {
    if (!isError)
      if (window.confirm("You sure you want to skip the session?")) {
        setIsBreak(!isBreak);
        localStorage.setItem("elaspedTime", 0);
        setIsPause(false);
      }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const handleKeyPress = (e) => {
    console.log(e.key)
    if (e.key === "s") {
      handleBreakChange();
    } else if (e.key === " ") {
      setIsPause(!isPause);
    } else if (e.shiftKey) {
      setShowSettings(!showSettings);
    } else if (e.key === "h") {
      setShowHelp(!showHelp);
    } else if (e.key === "m") {
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  });
  return (
    <>
      {alert.show && (
        <Alert {...alert} setAlert={setAlert} showAlert={showAlert} isError={isError} />
      )}
      {showHelp && (
        <Help showHelp={showHelp} setShowHelp={setShowHelp} isBreak={isBreak} onMobile={onMobile} />
      )}
      <main
        className={`relative ${
          !isBreak ? "bg-teal" : "bg-brickred"
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
          {
            !onMobile &&

            <IconContext.Provider value={{ color: "white" }}>
            <MdLiveHelp
            id="help-icon"
              className="h-10 w-10"
              onClick={() => setShowHelp(true)}
              />
          </IconContext.Provider>
            }
          {/* <Help /> */}
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
              isError={isError}
              setIsError={setIsError}
            />
          </div>
          <div className="clock-info-wrapper absolute left-1/2 top-1/2 h-1/2 flex justify-around items-center flex-col transform -translate-x-1/2 -translate-y-1/2">
            <div className="title-section transform -translate-y-1/2">
              <p>{!isBreak ? `Pomodoro` : `Break`}</p>
            </div>
            <section className="time-display absolute top-[50%] transform -translate-y-1/2 flex flex-row">
              <span className="hr">{/* Remaining hours*/}</span>:
              <span className="min">{/* Remaining minutes*/}</span>:
              <span className="sec">{/* Remaining seconds*/}</span>
              <br />
            </section>
            <section className="button-display flex gap-5 transform translate-y-1/2">
              <button
                className="pause"
                onClick={() => {
                  if (!isError) {
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
        <div className="spotify-section justify-center align-middle hidden"></div>
      </main>
    </>
  );
}

export default App;
