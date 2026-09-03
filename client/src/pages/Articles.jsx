import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import Container from "../components/common/Container";
import Header from "../components/layout/Header";
import ArticleGrid from "../components/articles/ArticleGrid";
import Pagination from "../components/common/Pagination";
import SearchInput from "../components/common/SearchInput";

import articles  from "../data/articles";
import  categories  from "../data/categories";
import SEO from "../components/common/SEO";

const ARTICLES_PER_PAGE = 9;

const Articles = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === "all" || article.category?.slug === activeCategory;

      const matchesSearch =
        !query ||
        article.title?.toLowerCase().includes(query) ||
        article.excerpt?.toLowerCase().includes(query) ||
        article.author?.name?.toLowerCase().includes(query) ||
        article.tags?.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);

  const visibleArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;

    return filteredArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <>
      <SEO
        title="Articles"
        description="Explore useful articles, guides, insights, and practical information across different topics."
        canonical="/articles"
      />
      <main>
        <Header
          title="Articles"
          description="Explore useful articles, guides, insights, and practical information across different topics."
          breadcrumbs={[{ label: "Home", path: "/" }, { label: "Articles" }]}
        />

        <section className="section">
          <Container>
            {/* Filters */}
            <div className="mb-8 space-y-5">
              <div className="mx-auto max-w-2xl">
                <SearchInput
                  value={search}
                  onChange={handleSearch}
                  placeholder="Search articles..."
                />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
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
            </div>

            {/* Result count */}
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-[rgb(var(--muted-foreground))]">
                  Showing{" "}
                  <span className="font-semibold text-[rgb(var(--foreground))]">
                    {visibleArticles.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-[rgb(var(--foreground))]">
                    {filteredArticles.length}
                  </span>{" "}
                  articles
                </p>
              </div>

              {search && (
                <div className="hidden items-center gap-2 text-sm text-[rgb(var(--muted-foreground))] sm:flex">
                  <Search size={15} aria-hidden="true" />
                  <span>
                    Results for{" "}
                    <strong className="text-[rgb(var(--foreground))]">
                      "{search}"
                    </strong>
                  </span>
                </div>
              )}
            </div>

            {/* Articles */}
            {visibleArticles.length > 0 ? (
              <>
                <ArticleGrid articles={visibleArticles} columns={3} />

                {totalPages > 1 && (
                  <div className="mt-10 flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-6 py-16 text-center">
                <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                  No articles found
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                  Try a different search term or select another category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("all");
                    setCurrentPage(1);
                  }}
                  className="mt-5 text-sm font-semibold text-[rgb(var(--primary))] hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </Container>
        </section>
      </main>
    </>
  );
};

export default Articles;
