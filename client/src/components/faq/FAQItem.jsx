import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQItem = ({ question, answer, defaultOpen = false, className = "" }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (!question || !answer) return null;

  return (
    <div
      className={[
        "overflow-hidden rounded-xl border",
        "border-[rgb(var(--border))]",
        "bg-[rgb(var(--card))]",
        "transition-colors duration-200",
        isOpen
          ? "border-[rgb(var(--primary))]/30"
          : "hover:border-[rgb(var(--primary))]/20",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <span className="text-sm font-semibold leading-6 text-[rgb(var(--foreground))] sm:text-base">
          {question}
        </span>

        <ChevronDown
          size={20}
          aria-hidden="true"
          className={[
            "shrink-0 text-[rgb(var(--muted-foreground))]",
            "transition-transform duration-300",
            isOpen ? "rotate-180 text-[rgb(var(--primary))]" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </button>

      <div
        className={[
          "grid transition-all duration-300",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[rgb(var(--border))] px-5 py-4 sm:px-6 sm:py-5">
            <p className="text-sm leading-7 text-[rgb(var(--muted-foreground))]">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
