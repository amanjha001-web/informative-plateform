import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../common/Container";
import ArticleCard from "./ArticleCard";

const RelatedArticles = ({
  article,
  articles = [],
  limit = 3,
  title = "Related Articles",
  description = "You may also find these articles useful.",
}) => {
  if (!article || !articles.length) return null;

  const relatedArticles = articles
    .filter((item) => item.id !== article.id)
    .map((item) => {
      let score = 0;

      if (item.category === article.category) {
        score += 3;
      }

      const currentTags = article.tags || [];
      const itemTags = item.tags || [];

      const commonTags = itemTags.filter((tag) =>
        currentTags.some(
          (currentTag) => currentTag.toLowerCase() === tag.toLowerCase(),
        ),
      );

      score += commonTags.length * 2;

      if (item.popular) {
        score += 1;
      }

      return {
        article: item,
        score,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.article);

  if (!relatedArticles.length) return null;

  return (
    <section className="border-t border-[rgb(var(--border))] py-16 md:py-20">
      <Container>
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-[rgb(var(--primary))]">
              Keep Reading
            </span>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[rgb(var(--foreground))] sm:text-3xl">
              {title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-[rgb(var(--muted-foreground))] sm:text-base">
              {description}
            </p>
          </div>

          <Link
            to="/articles"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-[rgb(var(--primary))] transition-opacity hover:opacity-80"
          >
            All articles
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Related Articles */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {relatedArticles.map((relatedArticle) => (
            <ArticleCard key={relatedArticle.id} article={relatedArticle} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default RelatedArticles;
