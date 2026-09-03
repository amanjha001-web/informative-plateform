import { useMemo, useState } from "react";

import FAQItem from "./FAQItem";

const FAQList = ({
  faqs = [],
  showCategoryFilter = false,
  defaultCategory = "all",
  className = "",
}) => {
  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(faqs.map((faq) => faq.category).filter(Boolean)),
    ];

    return ["all", ...uniqueCategories];
  }, [faqs]);

  const filteredFAQs = useMemo(() => {
    if (activeCategory === "all") return faqs;

    return faqs.filter((faq) => faq.category === activeCategory);
  }, [faqs, activeCategory]);

  if (!faqs.length) return null;

  return (
    <div className={className}>
      {showCategoryFilter && categories.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={[
                  "rounded-full px-4 py-2 text-sm font-medium capitalize",
                  "transition-all duration-200",
                  isActive
                    ? "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]"
                    : "bg-[rgb(var(--secondary))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]",
                ].join(" ")}
              >
                {category === "all" ? "All" : category}
              </button>
            );
          })}
        </div>
      )}

      <div className="space-y-3">
        {filteredFAQs.map((faq) => (
          <FAQItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            defaultOpen={faq.defaultOpen}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQList;
