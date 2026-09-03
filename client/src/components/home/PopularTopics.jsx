import { ArrowRight, Hash } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../common/Container";
import  articles  from "../../data/articles";

const PopularTopics = ({
  title = "Popular Topics",
  description = "Explore topics that readers are currently interested in.",
  limit = 8,
}) => {
  const topicMap = new Map();

  articles.forEach((article) => {
    article.tags?.forEach((tag) => {
      const normalizedTag = tag.trim();

      if (!normalizedTag) return;

      const existing = topicMap.get(normalizedTag);

      topicMap.set(normalizedTag, {
        name: normalizedTag,
        count: (existing?.count || 0) + 1,
      });
    });
  });

  const topics = [...topicMap.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);

  if (!topics.length) return null;

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-[rgb(var(--primary))]">
            Discover
          </span>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[rgb(var(--foreground))] sm:text-3xl">
            {title}
          </h2>

          <p className="mt-3 text-sm leading-6 text-[rgb(var(--muted-foreground))] sm:text-base">
            {description}
          </p>
        </div>

        {/* Topics */}
        <div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-3">
          {topics.map((topic) => (
            <Link
              key={topic.name}
              to={`/search?q=${encodeURIComponent(topic.name)}`}
              className="group inline-flex items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-2.5 text-sm font-medium text-[rgb(var(--foreground))] transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgb(var(--primary))]/40 hover:bg-[rgb(var(--primary))]/5 hover:text-[rgb(var(--primary))] hover:shadow-sm"
            >
              <Hash
                size={16}
                strokeWidth={1.8}
                className="text-[rgb(var(--muted-foreground))] transition-colors group-hover:text-[rgb(var(--primary))]"
              />

              <span>{topic.name}</span>

              <span className="rounded-full bg-[rgb(var(--secondary))] px-2 py-0.5 text-xs text-[rgb(var(--muted-foreground))] group-hover:bg-[rgb(var(--primary))]/10 group-hover:text-[rgb(var(--primary))]">
                {topic.count}
              </span>

              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PopularTopics;
