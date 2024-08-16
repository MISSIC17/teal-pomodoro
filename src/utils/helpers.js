export function formatter(digit) {
  if (digit.toString().length === 1) {
    return "0" + digit.toString();
  }
  return digit.toString();
}
export function secToHHMMSS(time) {
  const hr = parseInt(time / 3600) || 0;
  const min = parseInt((time - hr * 3600) / 60);
  const sec = parseInt(time - (hr * 3600 + min * 60));
  console.log(time);
  return `${formatter(hr)}:${formatter(min)}:${formatter(sec)}`;
}

export const secondsToHrMinSec = (totalSeconds) => {
  let hr = formatter(parseInt(totalSeconds / 3600));
  let min = formatter(parseInt((totalSeconds - hr * 3600) / 60));
  let sec = formatter(parseInt(totalSeconds - hr * 3600 - min * 60));
  const timeObj = {
    hr: {
      0: hr[0],
      1: hr[1],
    },
    min: {
      0: min[0],
      1: min[1],
    },
    sec: {
      0: sec[0],
      1: sec[1],
    },
  };
  return timeObj;
};

export const timeObjToSeconds = (timeObj) => {
  let hr = parseInt(timeObj.hr[0].toString() + timeObj.hr[1].toString());
  let min = parseInt(timeObj.min[0].toString() + timeObj.min[1].toString());
  let sec = parseInt(timeObj.sec[0].toString() + timeObj.sec[1].toString());
  let totalSeconds = parseInt(hr) * 3600 + parseInt(min) * 60 + parseInt(sec);
  return totalSeconds;
};
