import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Container from "../components/common/Container";
import Breadcrumb from "../components/common/Breadcrumb";

import ArticleHeader from "../components/articles/ArticleHeader";
import ArticleContent from "../components/articles/ArticleContent";
import ArticleSidebar from "../components/articles/ArticleSidebar";
import RelatedArticles from "../components/articles/RelatedArticles";
import ShareArticle from "../components/articles/ShareArticle";

import articles from "../data/articles";
import SEO from "../components/common/SEO";

const ArticleDetails = () => {
  const { slug } = useParams();

  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <>
        <SEO
          title={article.title}
          description={article.excerpt}
          canonical={`/articles/${article.slug}`}
          image={article.image}
          type="article"
        />
        <main>
          <Container>
            <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
              <h1 className="text-3xl font-bold text-[rgb(var(--foreground))]">
                Article Not Found
              </h1>

              <p className="mt-3 max-w-md text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                The article you are looking for may have been removed or the
                link may be incorrect.
              </p>

              <Link
                to="/articles"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[rgb(var(--primary))] px-5 py-3 text-sm font-semibold text-[rgb(var(--primary-foreground))] transition-opacity hover:opacity-90"
              >
                <ArrowLeft size={17} aria-hidden="true" />
                Back to Articles
              </Link>
            </div>
          </Container>
        </main>
      </>
    );
  }

  const relatedArticles = articles
    .filter((item) => item.id !== article.id)
    .filter((item) => item.category === article.category)
    .slice(0, 3);

  return (
    <main>
      {/* Article Header */}
      <section className="border-b border-[rgb(var(--border))] bg-[rgb(var(--secondary))]/30">
        <Container>
          <div className="py-8 md:py-12">
            <Breadcrumb
              items={[
                { label: "Home", path: "/" },
                { label: "Articles", path: "/articles" },
                { label: article.title },
              ]}
            />

            <div className="mt-6">
              <ArticleHeader article={article} />
            </div>
          </div>
        </Container>
      </section>

      {/* Article Body */}
      <section className="section">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-12">
            <article className="min-w-0">
              {article.image && (
                <div className="mb-8 overflow-hidden rounded-2xl">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="aspect-video w-full object-cover"
                  />
                </div>
              )}

              <ArticleContent content={article.content} />

              <div className="mt-10 border-t border-[rgb(var(--border))] pt-6">
                <ShareArticle article={article} />
              </div>
            </article>

            <aside>
              <ArticleSidebar article={article} articles={relatedArticles} />
            </aside>
          </div>
        </Container>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="section border-t border-[rgb(var(--border))] bg-[rgb(var(--secondary))]/30">
          <Container>
            <RelatedArticles article={article} articles={articles} />
          </Container>
        </section>
      )}
    </main>
  );
};

export default ArticleDetails;
