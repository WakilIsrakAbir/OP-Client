import Link from "next/link";

export const metadata = {
  title: "Normal Calculator - CalcHub",
  description: "Perform standard calculations with ease.",
};

export default function CalculatorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100">
          Home
        </Link>
        <span>/</span>
        <span className="font-medium text-zinc-900 dark:text-zinc-100">Normal Calculator</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 p-2 ring-1 ring-cyan-500/20 dark:bg-cyan-950/60 dark:ring-cyan-500/30">
            <img
              src="/icons/calculator.svg"
              alt="Normal Calculator"
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-100">
              Normal Calculator
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Standard arithmetic operations and keypad layout
            </p>
          </div>
        </div>

        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 ring-1 ring-inset ring-cyan-700/20 dark:bg-cyan-950/50 dark:text-cyan-300">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
          Ready for Development
        </span>
      </div>

      {/* Main Workspace Area (To be developed by user) */}
      <div className="mt-8 flex flex-1 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-white/50 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900/30">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 p-3.5 dark:bg-zinc-800">
          <img
            src="/icons/calculator.svg"
            alt="Calculator Workspace"
            className="h-full w-full object-contain opacity-80"
          />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Normal Calculator Workspace
        </h3>
        <p className="mt-1 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
          This route is ready for you. You can build your display screen, number buttons, operation keys (+, -, ×, ÷), and evaluation logic right here.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            &larr; Back to Home
          </Link>
          <Link
            href="/cgpa-calculator"
            className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-cyan-500 shadow-sm"
          >
            View CGPA Calculator &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
