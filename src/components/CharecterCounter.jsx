"use client";
import React, { useState } from "react";

export default function CharecterCounter() {
  // 1. Text input state
  const [text, setText] = useState("");

  // 2. State to show temporary "Copied!" message
  const [copied, setCopied] = useState(false);

  // Maximum character limit
  const MAX_LIMIT = 300;

  // Real-time calculations
  const charCount = text.length;
  const remaining = MAX_LIMIT - charCount;

  // Count words: split by whitespace and ignore empty strings
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  // Handle Clear button
  const handleClear = () => {
    setText("");
  };

  // Handle Copy to Clipboard button
  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    // Reset back to "Copy to Clipboard" after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
      {/* Header Title */}
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Character Counter
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Max limit: &nbsp;
          <span className="font-semibold text-cyan-600 dark:text-cyan-400">
            {MAX_LIMIT} characters
          </span>
        </p>
      </div>

      {/* 2. Stat Cards Row (Words | Chars | Remaining) */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {/* Words Card */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Words
          </span>
          <span className="mt-1 text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
            {wordCount}
          </span>
        </div>
        {/* Chars Card */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Chars
          </span>
          <span className="mt-1 text-3xl font-extrabold text-cyan-600 dark:text-cyan-400">
            {charCount}
          </span>
        </div>
        {/* Remaining Card */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Remaining
          </span>
          <span
            className={`mt-1 text-3xl font-extrabold ${
              remaining === 0
                ? "text-rose-500"
                : remaining <= 30
                  ? "text-amber-500"
                  : "text-zinc-900 dark:text-zinc-100"
            }`}
          >
            {remaining}
          </span>
        </div>
      </div>
      

      {/* 3. Text Input Field */}
      <div className="mb-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={MAX_LIMIT}
          rows={6}
          placeholder="Type or paste your text here..."
          className="w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50/50 p-4 text-base text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-cyan-500 dark:focus:bg-zinc-900"
        />
      </div>


      {/* 4. Bottom Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Clear Button */}
        <button
          onClick={handleClear}
          disabled={!text}
          className="rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-rose-400"
        >
          Clear Text
        </button>
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          disabled={!text}
          className={`rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-md transition disabled:cursor-not-allowed disabled:opacity-40 ${
            copied
              ? "bg-emerald-600 shadow-emerald-500/20"
              : "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-cyan-500/25 hover:opacity-95"
          }`}
        >
          {copied ? "✓ Copied to Clipboard!" : "Copy to Clipboard"}
        </button>
      </div>
    </div>
  );
}
