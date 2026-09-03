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

const ICONS = {
  Cpu,
  BriefcaseBusiness,
  GraduationCap,
  HeartPulse,
  Sparkles,
  WalletCards,
};

const CategoryCard = ({
  category,
  icon,
  showArticleCount = true,
  className = "",
}) => {
  if (!category) return null;

  const Icon = icon
    ? typeof icon === "string"
      ? ICONS[icon] || Cpu
      : icon
    : ICONS[category.icon] || Cpu;

  return (
    <Link
      to={`/categories/${category.slug}`}
      className={[
        "group block overflow-hidden rounded-2xl border",
        "border-[rgb(var(--border))]",
        "bg-[rgb(var(--card))]",
        "p-5 sm:p-6",
        "transition-all duration-300",
        "hover:-translate-y-1",
        "hover:border-[rgb(var(--primary))]/40",
        "hover:shadow-xl",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] transition-transform duration-300 group-hover:scale-105">
          <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgb(var(--secondary))] text-[rgb(var(--muted-foreground))] transition-all duration-300 group-hover:bg-[rgb(var(--primary))]/10 group-hover:text-[rgb(var(--primary))]">
          <ArrowRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-[rgb(var(--foreground))] transition-colors group-hover:text-[rgb(var(--primary))]">
          {category.name}
        </h3>

        {category.shortDescription && (
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[rgb(var(--muted-foreground))]">
            {category.shortDescription}
          </p>
        )}

        {showArticleCount && category.articleCount !== undefined && (
          <div className="mt-5 flex items-center justify-between border-t border-[rgb(var(--border))] pt-4">
            <span className="text-xs font-medium text-[rgb(var(--muted-foreground))]">
              {category.articleCount}{" "}
              {category.articleCount === 1 ? "Article" : "Articles"}
            </span>

            <span className="text-xs font-medium text-[rgb(var(--primary))]">
              Explore
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CategoryCard;
