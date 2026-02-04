import { useState } from "react";
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { copyToClipBoard } from "@/lib/utils";

export default function Mnemonic({ phrase }: { phrase: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const phraseArray = phrase.trim().split(" ");

  const handleCopy = async () => {
    await copyToClipBoard(phrase);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-xl border border-stone-800 bg-black">
      {/* Accordion Header */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          w-full flex items-center justify-between
          px-6 py-4
          text-stone-100 font-medium
          rounded-xl
          transition-colors
          hover:bg-stone-900
          focus:outline-none focus-visible:ring-1 focus-visible:ring-stone-700
        "
      >
        <span>Recovery Phrase</span>
        <span className="text-stone-400">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      {/* Accordion Content */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-6 pb-6 pt-2 space-y-5">
          {/* Words */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {phraseArray.map((word, index) => (
              <div
                key={index}
                className="
                  flex items-center gap-3
                  rounded-lg
                  bg-stone-900
                  border border-stone-800
                  px-4 py-3
                  text-sm
                  transition-colors
                  hover:bg-stone-800
                "
              >
                <span className="w-6 text-stone-400 select-none">
                  {index + 1}.
                </span>
                <span className="font-mono text-stone-100 tracking-wide">
                  {word}
                </span>
              </div>
            ))}
          </div>

          {/* Copy All Button */}
          <div className="flex pt-4 justify-end">
            <button
              type="button"
              onClick={handleCopy}
              className="
                flex items-center gap-2
                rounded-lg
                border border-stone-800
                bg-stone-900
                px-4 py-2
                text-sm text-stone-200
                transition-colors
                hover:bg-stone-800
                focus:outline-none focus-visible:ring-1 focus-visible:ring-stone-700
              "
            >
              {copied ? (
                <>
                  <Check size={16} className="text-green-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy all
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
