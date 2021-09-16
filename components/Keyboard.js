import React from "react";

export default function Keyboard({ pressedChar, isMistype }) {
  return (
    <div className="Keyboard">
      <div className="KeysRow">
        {"qwertyuiop".split("").map((key) => (
          <div
            key={key}
            id={
              key === pressedChar
                ? isMistype
                  ? "PressedKeyFalse"
                  : "PressedKeyTrue"
                : ""
            }
            className={"Key"}
          >
            {key}
          </div>
        ))}
      </div>

      <div className="KeysRow">
        {"asdfghjkl".split("").map((key) => (
          <div
            key={key}
            id={
              key === pressedChar
                ? isMistype
                  ? "PressedKeyFalse"
                  : "PressedKeyTrue"
                : ""
            }
            className={"Key"}
          >
            {key}
          </div>
        ))}
      </div>

      <div className="KeysRow">
        {"zxcvbnm".split("").map((key) => (
          <div
            key={key}
            id={
              key === pressedChar
                ? isMistype
                  ? "PressedKeyFalse"
                  : "PressedKeyTrue"
                : ""
            }
            className={"Key"}
          >
            {key}
          </div>
        ))}
      </div>
    </div>
  );
}
