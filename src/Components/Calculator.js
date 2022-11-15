import "../Calculator.css";
import React, { useState, useEffect } from "react";
import CalculatorKey from "./CalculatorKey";

function Calculator() {
  // return everything from original web application index.html
  // REMEMBER: class is className in React!

  // using state hooks to keep track of values
  // new state variables = prevValue, nextValue, op
  const [prevValue, setPrevValue] = useState(null); // initializing prevValue to null
  const [nextValue, setNextValue] = useState("0"); // initializing nextValue to 0
  const [operation, setOp] = useState(null); //operation prevValue to null

  // useEffect hook to control outside behaviors
  useEffect(() => {}, [operation, nextValue, prevValue]);

  // Declaring what to do for each operator
  const CalculatorOperations = {
    "/": (firstValue, secondValue) => firstValue / secondValue,
    "*": (firstValue, secondValue) => firstValue * secondValue,
    "+": (firstValue, secondValue) => firstValue + secondValue,
    "-": (firstValue, secondValue) => firstValue - secondValue,
    "=": (firstValue, secondValue) => secondValue,
  };

  //   Functions for operators
  const performOperation = () => {
    let temp = CalculatorOperations[operation](
      parseFloat(prevValue),
      parseFloat(nextValue)
    );
    setOp(null);
    setNextValue(String(temp)); // transform it back to a string
    setPrevValue(null); //reset prevValue to null
  };

  //   Function for number keys
  const handleNum = (number) => {
    setNextValue(nextValue === "0" ? String(number) : nextValue + number); // transform it back to a string for result display
  };

  //   Function for decimal key
  const insertDecimal = () => {
    if (!/\./.test(nextValue)) {
      setNextValue(nextValue + ".");
    }
  };

  //   Function for AC key
  const clearData = () => {
    setNextValue("0");
    setPrevValue(0);
  };

  //   Function to handle operations. This is called when the event listener receives a click
  const handleOperation = (value) => {
    if (Number.isInteger(value)) {
      // Number key
      handleNum(parseInt(value, 10));
    } else if (value in CalculatorOperations) {
      if (operation === null) {
        setOp(value);
        setPrevValue(nextValue);
        setNextValue("");
      }
      if (operation) {
        setOp(value);
      }
      //   when there is number operator and another number, perform the operation
      if (prevValue && operation && nextValue) {
        performOperation();
      }
    } else if (value === "AC") {
      clearData(); // user selects the AC button
    } else if (value === ".") {
      insertDecimal(); // user clicks the decimal button
    }
  };

  return (
    // wrapper container
    <div className="calculator">
      {/* this is the result screen */}
      <div className="calculator-screen">{nextValue}</div>
      {/* Calculator keys */}
      <div className="calculator-keys">
        <CalculatorKey keyValue={"+"} onClick={handleOperation} />
        <CalculatorKey keyValue={"-"} onClick={handleOperation} />
        <CalculatorKey keyValue={"*"} onClick={handleOperation} />
        <CalculatorKey keyValue={"/"} onClick={handleOperation} />

        <CalculatorKey keyValue={7} onClick={handleOperation} />
        <CalculatorKey keyValue={8} onClick={handleOperation} />
        <CalculatorKey keyValue={9} onClick={handleOperation} />
        <CalculatorKey keyValue={4} onClick={handleOperation} />
        <CalculatorKey keyValue={5} onClick={handleOperation} />
        <CalculatorKey keyValue={6} onClick={handleOperation} />
        <CalculatorKey keyValue={1} onClick={handleOperation} />
        <CalculatorKey keyValue={2} onClick={handleOperation} />
        <CalculatorKey keyValue={3} onClick={handleOperation} />
        <CalculatorKey keyValue={0} onClick={handleOperation} />

        <CalculatorKey
          className="decimal"
          keyValue={"."}
          onClick={handleOperation}
        />
        <CalculatorKey
          className="all-clear"
          keyValue={"AC"}
          onClick={handleOperation}
        />

        <CalculatorKey
          className="equal"
          keyValue={"="}
          onClick={handleOperation}
        />
      </div>
    </div>
  );
}

export default Calculator;
