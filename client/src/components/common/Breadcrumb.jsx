import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items = [], showHome = true, className = "" }) => {
  const breadcrumbItems = showHome
    ? [{ label: "Home", path: "/" }, ...items]
    : items;

  return (
    <nav aria-label="Breadcrumb" className={`w-full ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-1.5"
            >
              {index > 0 && (
                <ChevronRight
                  size={15}
                  strokeWidth={1.8}
                  className="text-[rgb(var(--muted-foreground))]"
                  aria-hidden="true"
                />
              )}

              {isLast ? (
                <span
                  aria-current="page"
                  className="font-medium text-[rgb(var(--foreground))]"
                >
                  {index === 0 && showHome && (
                    <Home
                      size={15}
                      className="mr-1 inline-block"
                      aria-hidden="true"
                    />
                  )}

                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path || "#"}
                  className="text-[rgb(var(--muted-foreground))] transition-colors hover:text-[rgb(var(--primary))]"
                >
                  {index === 0 && showHome && (
                    <Home
                      size={15}
                      className="mr-1 inline-block"
                      aria-hidden="true"
                    />
                  )}

                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
