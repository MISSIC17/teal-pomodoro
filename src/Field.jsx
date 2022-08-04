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
      <input
        key={`${keyName}-0`}
        type="number"
        id={`${type}-${keyName}-0`}
        name={`${type}-${keyName}-0`}
        value={time[keyName][0]}
        min="0"
        max="9"
        onFocus={handleFocus}
        onChange={(e) => handleInput(e, keyIndex, 0, setType)}
      />
      <input
        key={`${keyName}-1`}
        type="number"
        id={`${type}-${keyName}-1`}
        name={`${type}-${keyName}-1`}
        value={time[keyName][1]}
        min="0"
        max="9"
        onFocus={handleFocus}
        onChange={(e) => handleInput(e, keyIndex, 1, setType)}
      />
    </div>
  );
}
