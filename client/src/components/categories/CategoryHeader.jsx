import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../common/Container";
import Breadcrumb from "../common/Breadcrumb";

const CategoryHeader = ({
  category,
  title,
  description,
  breadcrumbs = [],
  showBackLink = false,
  className = "",
}) => {
  const heading = title || category?.name || "Category";

  const subDescription =
    description || category?.description || category?.shortDescription || "";

  return (
    <section
      className={[
        "border-b border-[rgb(var(--border))]",
        "bg-[rgb(var(--secondary))]/40",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container>
        <div className="py-8 sm:py-10 md:py-14">
          {/* Breadcrumb */}
          {breadcrumbs.length > 0 && (
            <div className="mb-5">
              <Breadcrumb items={breadcrumbs} />
            </div>
          )}

          {/* Content */}
          <div className="max-w-3xl">
            {category?.name && (
              <span className="inline-flex rounded-full bg-[rgb(var(--primary))]/10 px-3 py-1 text-xs font-semibold capitalize text-[rgb(var(--primary))]">
                {category.name}
              </span>
            )}

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-[rgb(var(--foreground))] sm:text-4xl md:text-5xl">
              {heading}
            </h1>

            {subDescription && (
              <p className="mt-4 text-base leading-7 text-[rgb(var(--muted-foreground))] md:text-lg">
                {subDescription}
              </p>
            )}

            {category?.articleCount !== undefined && (
              <p className="mt-4 text-sm font-medium text-[rgb(var(--muted-foreground))]">
                {category.articleCount}{" "}
                {category.articleCount === 1 ? "article" : "articles"} available
              </p>
            )}

            {showBackLink && (
              <Link
                to="/categories"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[rgb(var(--primary))] transition-opacity hover:opacity-80"
              >
                <ArrowRight size={16} className="rotate-180" />
                All Categories
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CategoryHeader;
