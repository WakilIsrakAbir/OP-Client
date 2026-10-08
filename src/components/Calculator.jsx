"use client";
import React, { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");

  // The first number you entered before clicking + or -
  const [prevValue, setPrevValue] = useState(null);

  // The operation symbol (+, -, ×, ÷)
  const [operation, setOperation] = useState(null);

  // Tells the calculator: "start a fresh number after clicking an operator"
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
      {/* display */}
      <div className="mb-6 rounded-2xl bg-zinc-50 p-4 text-right border border-zinc-100 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="h-6 text-sm font-medium text-zinc-400">
          {prevValue !== null && `${prevValue} ${operation || ""}`}
        </div>
        <div className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          17
        </div>
      </div>

      {/* Button Grid Container */}
      <div className="grid grid-cols-4 gap-3">
        {/* Buttons go here */}
        {/* Row 1 */}
        <button className="rounded-xl bg-zinc-100 py-3.5 text-base font-semibold text-rose-600 hover:bg-zinc-900 dark:bg-zinc-800 dark:text-rose-400">
          AC
        </button>
        <button className="rounded-xl bg-zinc-100 py-3.5 text-base font-semibold text-zinc-700 hover:bg-zinc-900 dark:bg-zinc-800 dark:text-zinc-300">
          +/-
        </button>
        <button className="rounded-xl bg-zinc-100 py-3.5 text-base font-semibold text-zinc-700 hover:bg-zinc-900 dark:bg-zinc-800 dark:text-zinc-300">
          %
        </button>
        <button className="rounded-xl bg-cyan-50 py-3.5 text-xl font-bold text-cyan-600 hover:bg-cyan-900 dark:bg-cyan-950/60 dark:text-cyan-300">
          ÷
        </button>

        {/* Row 2 */}
        <button className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100">
          7
        </button>
        <button className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100">
          8
        </button>
        <button className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100">
          9
        </button>
        <button className="rounded-xl bg-cyan-50 py-3.5 text-xl font-bold text-cyan-600 hover:bg-cyan-100 dark:bg-cyan-950/60 dark:text-cyan-300">
          ×
        </button>

        {/* Row 3 */}
        <button className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100">
          4
        </button>
        <button className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100">
          5
        </button>
        <button className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100">
          6
        </button>
        <button className="rounded-xl bg-cyan-50 py-3.5 text-xl font-bold text-cyan-600 hover:bg-cyan-100 dark:bg-cyan-950/60 dark:text-cyan-300">
          -
        </button>

        {/* Row 4 */}
        <button className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100">
          1
        </button>
        <button className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100">
          2
        </button>
        <button className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100">
          3
        </button>
        <button className="rounded-xl bg-cyan-50 py-3.5 text-xl font-bold text-cyan-600 hover:bg-cyan-100 dark:bg-cyan-950/60 dark:text-cyan-300">
          +
        </button>

        {/* Row 5 */}
        <button className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100">
          0
        </button>
        <button className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100">
          .
        </button>
        <button className="rounded-xl bg-zinc-100 py-3.5 text-base font-semibold text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
          ⌫
        </button>
        <button className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 text-xl font-bold text-white shadow-md shadow-cyan-500/25 hover:opacity-95">
          =
        </button>
      </div>
    </div>
  );
}
