import Link from "next/link";
import CharacterCounter from "@/components/CharecterCounter";

export const metadata = {
  title: "Character-Count-Calculator",
  description: "Count your character of any text you paste on the box",
};

export default function CharacterCounterPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100">
          Home
        </Link>
        <span>/</span>
        <span className="font-medium text-zinc-900 dark:text-zinc-100">Character Counter</span>
      </nav>

      {/* Character Counter Component */}
      <div className="mt-2 flex flex-1 items-center justify-center py-4">
        <CharacterCounter />
      </div>
    </div>
  );
}
