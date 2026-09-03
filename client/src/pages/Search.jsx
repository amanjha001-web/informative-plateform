import { useMemo } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import Container from "../components/common/Container";
import Header from "../components/layout/Header";
import SearchInput from "../components/common/SearchInput";
import ArticleGrid from "../components/articles/ArticleGrid";
import Pagination from "../components/common/Pagination";
import SEO from "../components/common/SEO";

import  articles  from "../data/articles";
import categories  from "../data/categories";

const RESULTS_PER_PAGE = 9;

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const activeCategory = searchParams.get("category") || "all";
  const currentPage = Math.max(Number(searchParams.get("page")) || 1, 1);

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === "all" || article.category === activeCategory;

      if (!normalizedQuery) {
        return matchesCategory;
      }

      const searchableText = [
        article.title,
        article.excerpt,
        article.content,
        article.author,
        article.category,
        ...(article.tags || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(normalizedQuery);
    });
  }, [query, activeCategory]);

  const totalPages = Math.max(
    Math.ceil(filteredArticles.length / RESULTS_PER_PAGE),
    1,
  );

  const safePage = Math.min(currentPage, totalPages);

  const visibleArticles = useMemo(() => {
    const startIndex = (safePage - 1) * RESULTS_PER_PAGE;

    return filteredArticles.slice(startIndex, startIndex + RESULTS_PER_PAGE);
  }, [filteredArticles, safePage]);

  const updateParams = ({
    nextQuery = query,
    nextCategory = activeCategory,
    nextPage = 1,
  } = {}) => {
    const params = {};

    const trimmedQuery = nextQuery.trim();

    if (trimmedQuery) {
      params.q = trimmedQuery;
    }

    if (nextCategory !== "all") {
      params.category = nextCategory;
    }

    if (nextPage > 1) {
      params.page = String(nextPage);
    }

    setSearchParams(params);
  };

  const handleSearch = (value) => {
    updateParams({
      nextQuery: value,
      nextCategory: activeCategory,
      nextPage: 1,
    });
  };

  const handleCategoryChange = (category) => {
    updateParams({
      nextQuery: query,
      nextCategory: category,
      nextPage: 1,
    });
  };

  const handlePageChange = (page) => {
    updateParams({
      nextQuery: query,
      nextCategory: activeCategory,
      nextPage: page,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clearSearch = () => {
    setSearchParams({});
  };

  const seoTitle = query.trim()
    ? `Search Results for "${query.trim()}"`
    : "Search Articles";

  const seoDescription = query.trim()
    ? `Search results for "${query.trim()}" across our articles and useful information.`
    : "Search useful articles, guides, and information across our platform.";

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical="/search"
        noIndex
      />

      <main>
        <Header
          title="Search"
          description="Find useful articles, guides, and information across our platform."
          breadcrumbs={[{ label: "Home", path: "/" }, { label: "Search" }]}
        />

        <section className="section">
          <Container>
            {/* Search Input */}
            <div className="mx-auto max-w-2xl">
              <SearchInput
                value={query}
                onChange={handleSearch}
                placeholder="Search articles, topics, or keywords..."
              />
            </div>

            {/* Category Filters */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => handleCategoryChange("all")}
                className={[
                  "rounded-full px-4 py-2 text-sm font-medium",
                  "transition-all duration-200",
                  activeCategory === "all"
                    ? "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]"
                    : "bg-[rgb(var(--secondary))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]",
                ].join(" ")}
              >
                All
              </button>

              {categories.map((category) => (
                <button
                  key={category.id || category.slug}
                  type="button"
                  onClick={() => handleCategoryChange(category.slug)}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-medium",
                    "transition-all duration-200",
                    activeCategory === category.slug
                      ? "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]"
                      : "bg-[rgb(var(--secondary))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]",
                  ].join(" ")}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Results Header */}
            <div className="mt-10 mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                  {query.trim()
                    ? `Search results for "${query.trim()}"`
                    : "All Articles"}
                </h2>

                <p className="mt-1 text-sm text-[rgb(var(--muted-foreground))]">
                  {filteredArticles.length}{" "}
                  {filteredArticles.length === 1 ? "result" : "results"} found
                </p>
              </div>

              {query.trim() && (
                <div className="flex items-center gap-2 text-sm text-[rgb(var(--muted-foreground))]">
                  <SearchIcon size={16} aria-hidden="true" />
                  <span>{query.trim()}</span>
                </div>
              )}
            </div>

            {/* Results */}
            {visibleArticles.length > 0 ? (
              <>
                <ArticleGrid articles={visibleArticles} columns={3} />

                {totalPages > 1 && (
                  <div className="mt-10 flex justify-center">
                    <Pagination
                      currentPage={safePage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-6 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(var(--secondary))] text-[rgb(var(--muted-foreground))]">
                  <SearchIcon size={24} aria-hidden="true" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-[rgb(var(--foreground))]">
                  No results found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                  Try different keywords or select another category to find what
                  you're looking for.
                </p>

                <button
                  type="button"
                  onClick={clearSearch}
                  className="mt-5 text-sm font-semibold text-[rgb(var(--primary))] hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </Container>
        </section>
      </main>
    </>
  );
};

export default Search;
