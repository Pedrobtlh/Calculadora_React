import { useState } from "react";
import styles from "./Calculadora.module.css";

function Calculadora() {
  const [currentValue, setCurrentValue] = useState("0");
  const [pedingOperation, setPedingOperation] = useState(null);
  const [pedingValue, setPedingValue] = useState(null);
  const [completeOperation, setCompleteOperation] = useState("");

  const keypadNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const operations = ["+", "-", "*", "/"];

  const handleClick = (val) => {
    setCurrentValue((prevValue) => {
      if (prevValue === "0") {
        return val;
      } else {
        return prevValue + val;
      }
    });
    setCompleteOperation((prevOperation) => prevOperation + val);
  };

  const handleClear = () => {
    setCurrentValue("0");
    setPedingOperation(null);
    setPedingValue(null);
    setCompleteOperation("");
  };

  const handleOperation = (operation) => {
    setCompleteOperation(currentValue + " " + operation);
    setPedingOperation(operation);
    setPedingValue(currentValue);
    setCurrentValue("0");
  };

  const handleCalculate = () => {
    if (!pedingOperation || !pedingValue) {
      return;
    }
    const num1 = parseFloat(pedingValue);
    const num2 = parseFloat(currentValue);

    let result;

    switch (pedingOperation) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        if (num2 !== 0) {
          result = num1 / num2;
        } else {
          setCurrentValue("Error");
          setCompleteOperation("Error");
          setPedingValue(null);
          setPedingOperation(null);
          return;
        }
        break;

      default:
        break;
    }

    setCompleteOperation(
      pedingValue + " " + pedingOperation + " " + currentValue + "= " + result
    );

    setCurrentValue(result.toString());
    setPedingOperation(null);
    setPedingValue(null);
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.completeOperation}>{completeOperation}</div>
      <div className={styles.display}>{currentValue}</div>
      <div className={styles.buttons}>
        <button onClick={handleClear}>AC</button>
        {keypadNumbers.map((num) => (
          <button key={num} onClick={() => handleClick(num)}>
            {num}{" "}
          </button>
        ))}
        {operations.map((operation) => (
          <button key={operation} onClick={() => handleOperation(operation)}>
            {operation}{" "}
          </button>
        ))}
        <button onClick={handleCalculate}>=</button>
      </div>
    </div>
  );
}

export default Calculadora;
