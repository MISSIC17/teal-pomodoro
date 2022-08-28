import React from "react";
export default function Field({
  type,
  time,
  keyName,
  keyIndex,
  setType,
  handleFocus,
  handleInput,
}) {
  return (
    <div
      className={`${type}-${keyName} relative flex flex-nowrap  after:absolute after:-bottom-1/2 after:left-1/2 after:transform after:-translate-x-1/2`}
    >
      {[0, 1].map((index) => {
        return (
          <input
            key={`${keyName}-${index}`}
            type="number"
            id={`${type}-${keyName}-${index}`}
            name={`${type}-${keyName}-${index}`}
            value={time[keyName][index]}
            min="0"
            max="9"
            onFocus={handleFocus}
            onChange={(e) => handleInput(e, keyIndex, index, setType)}
          />
        );
      })}
    </div>
  );
}
