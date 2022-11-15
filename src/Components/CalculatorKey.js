import React from "react";
import "../Calculator.css";

function CalculatorKey(props) {
  return (
    <button
      className={`${props.className}`} // for those passing in a class Name for css
      onClick={() => props.onClick(props.keyValue)} //using props for component reusability. We can pass custom values here
    >
      {props.keyValue}{" "}
    </button>
  );
}
// export to be used in Calculator.js
export default CalculatorKey;
