"use client";

import { useState, useEffect } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  // Handle number input (0 - 9)
  const handleNumber = (digit) => {
    if (waitingForNewValue) {
      setDisplay(digit);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  // Handle decimal point (.)
  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  // Handle operations (+, -, ×, ÷)
  const handleOperator = (nextOperator) => {
    const currentNumber = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(currentNumber);
    } else if (operation && !waitingForNewValue) {
      const result = calculate(prevValue, currentNumber, operation);
      setDisplay(String(result));
      setPrevValue(result);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperator);
  };

  // Calculation logic
  const calculate = (first, second, op) => {
    let result = 0;
    switch (op) {
      case "+":
        result = first + second;
        break;
      case "-":
        result = first - second;
        break;
      case "×":
        result = first * second;
        break;
      case "÷":
        result = second === 0 ? "Error" : first / second;
        break;
      default:
        return second;
    }

    if (result === "Error") return "Error";
    // Avoid floating point inaccuracies like 0.1 + 0.2 = 0.30000000000000004
    return Math.round(result * 100000000) / 100000000;
  };

  // Handle equals (=)
  const handleEquals = () => {
    if (operation === null || prevValue === null) return;

    const currentNumber = parseFloat(display);
    const result = calculate(prevValue, currentNumber, operation);

    setDisplay(String(result));
    setPrevValue(null);
    setOperation(null);
    setWaitingForNewValue(true);
  };

  // Clear all (AC)
  const handleClear = () => {
    setDisplay("0");
    setPrevValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  // Toggle plus/minus (+/-)
  const handleToggleSign = () => {
    if (display === "0" || display === "Error") return;
    const toggled = parseFloat(display) * -1;
    setDisplay(String(toggled));
  };

  // Percentage (%)
  const handlePercentage = () => {
    const currentNumber = parseFloat(display);
    if (isNaN(currentNumber)) return;
    const result = currentNumber / 100;
    setDisplay(String(result));
  };

  // Backspace (delete last character)
  const handleBackspace = () => {
    if (waitingForNewValue || display === "Error") {
      setDisplay("0");
      return;
    }
    if (display.length === 1 || (display.length === 2 && display.startsWith("-"))) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  // Listen to physical keyboard presses
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= "0" && e.key <= "9") handleNumber(e.key);
      else if (e.key === ".") handleDecimal();
      else if (e.key === "+") handleOperator("+");
      else if (e.key === "-") handleOperator("-");
      else if (e.key === "*") handleOperator("×");
      else if (e.key === "/") {
        e.preventDefault();
        handleOperator("÷");
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        handleEquals();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === "Escape") {
        handleClear();
      } else if (e.key === "%") {
        handlePercentage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-xl shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
      {/* Display Screen */}
      <div className="mb-6 rounded-2xl bg-zinc-50 p-4 text-right border border-zinc-100 dark:border-zinc-800/80 dark:bg-zinc-950/80">
        <div className="h-6 text-sm font-medium text-zinc-400">
          {prevValue !== null && `${prevValue} ${operation || ""}`}
        </div>
        <div className="overflow-x-auto text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {display}
        </div>
      </div>

      {/* Calculator Buttons Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <button
          onClick={handleClear}
          className="rounded-xl bg-zinc-100 py-3.5 text-base font-semibold text-rose-600 transition-colors hover:bg-zinc-200 active:scale-95 dark:bg-zinc-800 dark:text-rose-400 dark:hover:bg-zinc-700"
        >
          AC
        </button>
        <button
          onClick={handleToggleSign}
          className="rounded-xl bg-zinc-100 py-3.5 text-base font-semibold text-zinc-700 transition-colors hover:bg-zinc-200 active:scale-95 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          +/-
        </button>
        <button
          onClick={handlePercentage}
          className="rounded-xl bg-zinc-100 py-3.5 text-base font-semibold text-zinc-700 transition-colors hover:bg-zinc-200 active:scale-95 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          %
        </button>
        <button
          onClick={() => handleOperator("÷")}
          className={`rounded-xl py-3.5 text-xl font-bold transition-colors active:scale-95 ${
            operation === "÷" && waitingForNewValue
              ? "bg-cyan-600 text-white"
              : "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 dark:bg-cyan-950/60 dark:text-cyan-300 dark:hover:bg-cyan-900/60"
          }`}
        >
          ÷
        </button>

        {/* Row 2 */}
        <button
          onClick={() => handleNumber("7")}
          className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 transition-colors hover:bg-zinc-200 active:scale-95 dark:bg-zinc-800/80 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          7
        </button>
        <button
          onClick={() => handleNumber("8")}
          className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 transition-colors hover:bg-zinc-200 active:scale-95 dark:bg-zinc-800/80 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          8
        </button>
        <button
          onClick={() => handleNumber("9")}
          className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 transition-colors hover:bg-zinc-200 active:scale-95 dark:bg-zinc-800/80 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          9
        </button>
        <button
          onClick={() => handleOperator("×")}
          className={`rounded-xl py-3.5 text-xl font-bold transition-colors active:scale-95 ${
            operation === "×" && waitingForNewValue
              ? "bg-cyan-600 text-white"
              : "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 dark:bg-cyan-950/60 dark:text-cyan-300 dark:hover:bg-cyan-900/60"
          }`}
        >
          ×
        </button>

        {/* Row 3 */}
        <button
          onClick={() => handleNumber("4")}
          className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 transition-colors hover:bg-zinc-200 active:scale-95 dark:bg-zinc-800/80 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          4
        </button>
        <button
          onClick={() => handleNumber("5")}
          className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 transition-colors hover:bg-zinc-200 active:scale-95 dark:bg-zinc-800/80 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          5
        </button>
        <button
          onClick={() => handleNumber("6")}
          className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 transition-colors hover:bg-zinc-200 active:scale-95 dark:bg-zinc-800/80 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          6
        </button>
        <button
          onClick={() => handleOperator("-")}
          className={`rounded-xl py-3.5 text-xl font-bold transition-colors active:scale-95 ${
            operation === "-" && waitingForNewValue
              ? "bg-cyan-600 text-white"
              : "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 dark:bg-cyan-950/60 dark:text-cyan-300 dark:hover:bg-cyan-900/60"
          }`}
        >
          -
        </button>

        {/* Row 4 */}
        <button
          onClick={() => handleNumber("1")}
          className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 transition-colors hover:bg-zinc-200 active:scale-95 dark:bg-zinc-800/80 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          1
        </button>
        <button
          onClick={() => handleNumber("2")}
          className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 transition-colors hover:bg-zinc-200 active:scale-95 dark:bg-zinc-800/80 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          2
        </button>
        <button
          onClick={() => handleNumber("3")}
          className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 transition-colors hover:bg-zinc-200 active:scale-95 dark:bg-zinc-800/80 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          3
        </button>
        <button
          onClick={() => handleOperator("+")}
          className={`rounded-xl py-3.5 text-xl font-bold transition-colors active:scale-95 ${
            operation === "+" && waitingForNewValue
              ? "bg-cyan-600 text-white"
              : "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 dark:bg-cyan-950/60 dark:text-cyan-300 dark:hover:bg-cyan-900/60"
          }`}
        >
          +
        </button>

        {/* Row 5 */}
        <button
          onClick={() => handleNumber("0")}
          className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 transition-colors hover:bg-zinc-200 active:scale-95 dark:bg-zinc-800/80 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          0
        </button>
        <button
          onClick={handleDecimal}
          className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 transition-colors hover:bg-zinc-200 active:scale-95 dark:bg-zinc-800/80 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          .
        </button>
        <button
          onClick={handleBackspace}
          className="rounded-xl bg-zinc-100 py-3.5 text-base font-semibold text-zinc-700 transition-colors hover:bg-zinc-200 active:scale-95 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          ⌫
        </button>
        <button
          onClick={handleEquals}
          className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 text-xl font-bold text-white shadow-md shadow-cyan-500/25 transition-transform hover:opacity-95 active:scale-95"
        >
          =
        </button>
      </div>
    </div>
  );
}
