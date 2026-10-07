"use client";

import { useState } from "react";

// Standard university grade points mapping
const GRADE_OPTIONS = [
  { label: "A+ (4.00)", point: 4.0 },
  { label: "A (3.75)", point: 3.75 },
  { label: "A- (3.50)", point: 3.5 },
  { label: "B+ (3.25)", point: 3.25 },
  { label: "B (3.00)", point: 3.0 },
  { label: "B- (2.75)", point: 2.75 },
  { label: "C+ (2.50)", point: 2.5 },
  { label: "C (2.25)", point: 2.25 },
  { label: "D (2.00)", point: 2.0 },
  { label: "F (0.00)", point: 0.0 },
];

export default function CgpaCalculator() {
  // Mode: "semester" (by courses) or "cumulative" (by semesters)
  const [mode, setMode] = useState("semester");

  // State for Course-wise Semester GPA (Default: 3 courses, 3 credits, 4.0 grade)
  const [courses, setCourses] = useState([
    { id: 1, name: "Course 1", credits: "3.0", gradePoint: "4.0" },
    { id: 2, name: "Course 2", credits: "3.0", gradePoint: "4.0" },
    { id: 3, name: "Course 3", credits: "3.0", gradePoint: "4.0" },
  ]);

  // State for Semester-wise Cumulative CGPA
  const [semesters, setSemesters] = useState([
    { id: 1, name: "Semester 1", credits: "15", gpa: "3.80" },
    { id: 2, name: "Semester 2", credits: "18", gpa: "3.65" },
    { id: 3, name: "Semester 3", credits: "16", gpa: "3.90" },
  ]);

  // --- Course handlers ---
  const addCourse = () => {
    const nextId = courses.length ? Math.max(...courses.map((c) => c.id)) + 1 : 1;
    setCourses([
      ...courses,
      { id: nextId, name: `Course ${nextId}`, credits: "3.0", gradePoint: "4.0" },
    ]);
  };

  const updateCourse = (id, field, value) => {
    setCourses(
      courses.map((course) => (course.id === id ? { ...course, [field]: value } : course))
    );
  };

  const removeCourse = (id) => {
    if (courses.length <= 1) return;
    setCourses(courses.filter((course) => course.id !== id));
  };

  const resetCourses = () => {
    setCourses([
      { id: 1, name: "Course 1", credits: "3.0", gradePoint: "4.0" },
      { id: 2, name: "Course 2", credits: "3.0", gradePoint: "4.0" },
      { id: 3, name: "Course 3", credits: "3.0", gradePoint: "4.0" },
    ]);
  };

  // --- Semester handlers ---
  const addSemester = () => {
    const nextId = semesters.length ? Math.max(...semesters.map((s) => s.id)) + 1 : 1;
    setSemesters([
      ...semesters,
      { id: nextId, name: `Semester ${nextId}`, credits: "15", gpa: "3.75" },
    ]);
  };

  const updateSemester = (id, field, value) => {
    setSemesters(
      semesters.map((sem) => (sem.id === id ? { ...sem, [field]: value } : sem))
    );
  };

  const removeSemester = (id) => {
    if (semesters.length <= 1) return;
    setSemesters(semesters.filter((sem) => sem.id !== id));
  };

  const resetSemesters = () => {
    setSemesters([
      { id: 1, name: "Semester 1", credits: "15", gpa: "3.75" },
      { id: 2, name: "Semester 2", credits: "15", gpa: "3.75" },
    ]);
  };

  // --- Calculation Logic ---
  // Calculate Semester GPA
  const courseCalculations = courses.reduce(
    (acc, c) => {
      const cred = parseFloat(c.credits) || 0;
      const gp = parseFloat(c.gradePoint) || 0;
      acc.totalCredits += cred;
      acc.totalQualityPoints += cred * gp;
      return acc;
    },
    { totalCredits: 0, totalQualityPoints: 0 }
  );

  const semesterGpa =
    courseCalculations.totalCredits > 0
      ? (courseCalculations.totalQualityPoints / courseCalculations.totalCredits).toFixed(2)
      : "0.00";

  // Calculate Cumulative CGPA
  const semesterCalculations = semesters.reduce(
    (acc, s) => {
      const cred = parseFloat(s.credits) || 0;
      const gpaVal = parseFloat(s.gpa) || 0;
      acc.totalCredits += cred;
      acc.totalPoints += cred * gpaVal;
      return acc;
    },
    { totalCredits: 0, totalPoints: 0 }
  );

  const cumulativeCgpa =
    semesterCalculations.totalCredits > 0
      ? (semesterCalculations.totalPoints / semesterCalculations.totalCredits).toFixed(2)
      : "0.00";

  // Active result values based on selected mode
  const currentResult = mode === "semester" ? semesterGpa : cumulativeCgpa;
  const currentTotalCredits =
    mode === "semester"
      ? courseCalculations.totalCredits
      : semesterCalculations.totalCredits;

  // Grade performance badge status
  const getPerformanceRemark = (val) => {
    const num = parseFloat(val);
    if (num >= 3.8) return { label: "Excellent / Dean's List", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400" };
    if (num >= 3.5) return { label: "Very Good Standing", color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400" };
    if (num >= 3.0) return { label: "Good Standing", color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400" };
    if (num >= 2.5) return { label: "Satisfactory", color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400" };
    return { label: "Needs Improvement", color: "text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400" };
  };

  const remark = getPerformanceRemark(currentResult);

  return (
    <div className="w-full max-w-4xl space-y-8">
      {/* Mode Switcher Tabs */}
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="inline-flex rounded-xl bg-zinc-200/70 p-1 dark:bg-zinc-800/80">
          <button
            onClick={() => setMode("semester")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              mode === "semester"
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-zinc-100"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            Semester GPA (Courses)
          </button>
          <button
            onClick={() => setMode("cumulative")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              mode === "cumulative"
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-zinc-100"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            Cumulative CGPA (Semesters)
          </button>
        </div>

        <button
          onClick={mode === "semester" ? resetCourses : resetSemesters}
          className="text-xs font-medium text-zinc-500 hover:text-rose-600 dark:text-zinc-400 dark:hover:text-rose-400"
        >
          Reset All
        </button>
      </div>

      {/* Live Result Score Card */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-white to-cyan-50/40 p-6 shadow-sm dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:px-4">
          <div className="text-center sm:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {mode === "semester" ? "Calculated Semester GPA" : "Overall Cumulative CGPA"}
            </span>
            <div className="mt-1 flex items-baseline justify-center gap-2 sm:justify-start">
              <span className="text-5xl font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                {currentResult}
              </span>
              <span className="text-lg font-medium text-zinc-400">/ 4.00</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 sm:items-end">
            <span className={`inline-flex items-center rounded-full px-3.5 py-1 text-xs font-semibold ${remark.color}`}>
              {remark.label}
            </span>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Total Credits: <span className="font-semibold text-zinc-800 dark:text-zinc-200">{currentTotalCredits}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mode 1: Semester GPA By Courses */}
      {mode === "semester" && (
        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Course Details
            </h2>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {courses.length} {courses.length === 1 ? "Course" : "Courses"}
            </span>
          </div>

          {/* Table Header */}
          <div className="hidden grid-cols-12 gap-3 pb-2 text-xs font-semibold text-zinc-500 sm:grid dark:text-zinc-400">
            <div className="col-span-5">Course Title / Code</div>
            <div className="col-span-3">Credits</div>
            <div className="col-span-3">Grade Point</div>
            <div className="col-span-1 text-center">Action</div>
          </div>

          {/* Course Rows */}
          <div className="space-y-3">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="grid grid-cols-1 gap-2 rounded-2xl border border-zinc-100 bg-zinc-50/50 p-3 sm:grid-cols-12 sm:items-center sm:gap-3 sm:border-0 sm:bg-transparent sm:p-0 dark:border-zinc-800/80 dark:bg-zinc-900/40 sm:dark:bg-transparent"
              >
                {/* Course Name */}
                <div className="sm:col-span-5">
                  <input
                    type="text"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                    placeholder={`e.g. Course ${index + 1}`}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                </div>

                {/* Credit Hours */}
                <div className="sm:col-span-3">
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                    placeholder="Credits (e.g. 3)"
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                </div>

                {/* Grade Point Select */}
                <div className="sm:col-span-3">
                  <select
                    value={course.gradePoint}
                    onChange={(e) => updateCourse(course.id, "gradePoint", e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  >
                    {GRADE_OPTIONS.map((opt) => (
                      <option key={opt.label} value={opt.point}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Delete Row Button */}
                <div className="flex justify-end sm:col-span-1 sm:justify-center">
                  <button
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length <= 1}
                    className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-rose-50 hover:text-rose-600 disabled:opacity-30 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
                    title="Remove course"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Course Button */}
          <div className="mt-6 flex justify-center sm:justify-start">
            <button
              onClick={addCourse}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-100 active:scale-95 dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-900/60"
            >
              + Add Another Course
            </button>
          </div>
        </div>
      )}

      {/* Mode 2: Cumulative CGPA By Semesters */}
      {mode === "cumulative" && (
        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Semester Records
            </h2>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {semesters.length} {semesters.length === 1 ? "Semester" : "Semesters"}
            </span>
          </div>

          {/* Table Header */}
          <div className="hidden grid-cols-12 gap-3 pb-2 text-xs font-semibold text-zinc-500 sm:grid dark:text-zinc-400">
            <div className="col-span-5">Semester Name</div>
            <div className="col-span-3">Credits Completed</div>
            <div className="col-span-3">Semester GPA (0.00 - 4.00)</div>
            <div className="col-span-1 text-center">Action</div>
          </div>

          {/* Semester Rows */}
          <div className="space-y-3">
            {semesters.map((sem, index) => (
              <div
                key={sem.id}
                className="grid grid-cols-1 gap-2 rounded-2xl border border-zinc-100 bg-zinc-50/50 p-3 sm:grid-cols-12 sm:items-center sm:gap-3 sm:border-0 sm:bg-transparent sm:p-0 dark:border-zinc-800/80 dark:bg-zinc-900/40 sm:dark:bg-transparent"
              >
                {/* Semester Name */}
                <div className="sm:col-span-5">
                  <input
                    type="text"
                    value={sem.name}
                    onChange={(e) => updateSemester(sem.id, "name", e.target.value)}
                    placeholder={`e.g. Semester ${index + 1}`}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                </div>

                {/* Total Credits in this semester */}
                <div className="sm:col-span-3">
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={sem.credits}
                    onChange={(e) => updateSemester(sem.id, "credits", e.target.value)}
                    placeholder="Credits (e.g. 15)"
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                </div>

                {/* GPA of this semester */}
                <div className="sm:col-span-3">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4"
                    value={sem.gpa}
                    onChange={(e) => updateSemester(sem.id, "gpa", e.target.value)}
                    placeholder="GPA (e.g. 3.75)"
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                </div>

                {/* Delete Row Button */}
                <div className="flex justify-end sm:col-span-1 sm:justify-center">
                  <button
                    onClick={() => removeSemester(sem.id)}
                    disabled={semesters.length <= 1}
                    className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-rose-50 hover:text-rose-600 disabled:opacity-30 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
                    title="Remove semester"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Semester Button */}
          <div className="mt-6 flex justify-center sm:justify-start">
            <button
              onClick={addSemester}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-100 active:scale-95 dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-900/60"
            >
              + Add Another Semester
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
