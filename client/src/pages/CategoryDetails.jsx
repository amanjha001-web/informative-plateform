import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Container from "../components/common/Container";
import ArticleGrid from "../components/articles/ArticleGrid";
import CategoryHeader from "../components/categories/CategoryHeader";
import Pagination from "../components/common/Pagination";
import SEO from "../components/common/SEO";

import categories  from "../data/categories";
import  articles  from "../data/articles";

const ARTICLES_PER_PAGE = 9;

const CategoryDetails = () => {
  const { slug } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const category = categories.find((item) => item.slug === slug);

  const categoryArticles = useMemo(() => {
    return articles.filter((article) => article.category === slug);
  }, [slug]);

  const totalPages = Math.ceil(categoryArticles.length / ARTICLES_PER_PAGE);

  const visibleArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;

    return categoryArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);
  }, [categoryArticles, currentPage]);

  if (!category) {
    return (
      <>
        <SEO
          title="Category Not Found"
          description="The requested category could not be found."
          noIndex
        />

        <main>
          <Container>
            <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
              <h1 className="text-3xl font-bold text-[rgb(var(--foreground))]">
                Category Not Found
              </h1>

              <p className="mt-3 max-w-md text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                The category you are looking for does not exist or may have been
                removed.
              </p>

              <Link
                to="/categories"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[rgb(var(--primary))] px-5 py-3 text-sm font-semibold text-[rgb(var(--primary-foreground))] transition-opacity hover:opacity-90"
              >
                <ArrowLeft size={17} aria-hidden="true" />
                Back to Categories
              </Link>
            </div>
          </Container>
        </main>
      </>
    );
  }

  return (
    <>
      <SEO
        title={category.name}
        description={
          category.description ||
          category.shortDescription ||
          `Explore useful articles and information about ${category.name}.`
        }
        canonical={`/categories/${category.slug}`}
        image={category.image}
      />

      <main>
        <CategoryHeader
          category={category}
          showBackLink
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: "Categories", path: "/categories" },
            { label: category.name },
          ]}
        />

        <section className="section">
          <Container>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[rgb(var(--foreground))] md:text-3xl">
                {category.name} Articles
              </h2>

              <p className="mt-2 text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                Explore our latest articles and useful information about{" "}
                {category.name.toLowerCase()}.
              </p>
            </div>

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
                <h3 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                  No articles available
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                  There are currently no articles in this category. Check back
                  later for new content.
                </p>

                <Link
                  to="/articles"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--primary))] hover:underline"
                >
                  Explore all articles
                  <ArrowLeft
                    size={15}
                    className="rotate-180"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            )}
          </Container>
        </section>
      </main>
    </>
  );
};

export default CategoryDetails;
