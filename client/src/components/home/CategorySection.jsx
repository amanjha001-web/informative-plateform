import {
  ArrowRight,
  BriefcaseBusiness,
  Cpu,
  GraduationCap,
  HeartPulse,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../common/Container";
import { CATEGORY_LIST } from "../../constants/categories";
import categoryData  from "../../data/categories";

const ICONS = {
  Cpu,
  BriefcaseBusiness,
  GraduationCap,
  HeartPulse,
  Sparkles,
  WalletCards,
};

const CategorySection = ({
  title = "Explore Categories",
  description = "Explore our categories and discover useful information across different topics.",
  limit = 6,
}) => {
  const categories = categoryData
    .filter((category) =>
      CATEGORY_LIST.some((config) => config.slug === category.slug),
    )
    .slice(0, limit);

  return (
    <section className="border-y border-[rgb(var(--border))] py-12 sm:py-16 md:py-20">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-[rgb(var(--primary))]">
              Categories
            </span>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[rgb(var(--foreground))] sm:text-3xl">
              {title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-[rgb(var(--muted-foreground))] sm:text-base">
              {description}
            </p>
          </div>

          <Link
            to="/categories"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-[rgb(var(--primary))] transition-opacity hover:opacity-80"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const config = CATEGORY_LIST.find(
              (item) => item.slug === category.slug,
            );

            const Icon = ICONS[config?.icon] || Cpu;

            return (
              <Link
                key={category.id}
                to={`/categories/${category.slug}`}
                className="group rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 transition-all duration-200 hover:-translate-y-1 hover:border-[rgb(var(--primary))]/40 hover:shadow-lg sm:p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]">
                    <Icon size={21} strokeWidth={1.8} />
                  </div>

                  <ArrowRight
                    size={18}
                    className="text-[rgb(var(--muted-foreground))] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[rgb(var(--primary))]"
                  />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-[rgb(var(--foreground))]">
                  {category.name}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                  {category.shortDescription}
                </p>

                <div className="mt-4 text-xs font-medium text-[rgb(var(--muted-foreground))]">
                  {category.articleCount} articles
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default CategorySection;
