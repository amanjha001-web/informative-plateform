import { Fragment } from "react";

const ArticleContent = ({ content = "", className = "" }) => {
  if (!content) {
    return (
      <div className="rounded-xl border border-dashed border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 text-sm text-[rgb(var(--muted-foreground))] sm:p-6">
        No article content available.
      </div>
    );
  }

  const paragraphs = content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <article
      className={[
        "prose prose-neutral max-w-none",
        "dark:prose-invert",
        "text-[rgb(var(--foreground))]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {paragraphs.map((paragraph, index) => (
        <Fragment key={`${index}-${paragraph.slice(0, 20)}`}>
          <p className="mb-5 text-[15px] leading-7 text-[rgb(var(--foreground))] sm:mb-6 sm:text-base sm:leading-8 last:mb-0">
            {paragraph}
          </p>
        </Fragment>
      ))}
    </article>
  );
};

export default ArticleContent;
