import Container from "../components/common/Container";
import Header from "../components/layout/Header";
import CategoryGrid from "../components/categories/CategoryGrid";
import SEO from "../components/common/SEO";

import categories  from "../data/categories";

const Categories = () => {
  return (
    <>
      <SEO
        title="Categories"
        description="Explore our categories and discover useful articles, guides, and information on topics that matter."
        canonical="/categories"
      />

      <main>
        <Header
          title="Categories"
          description="Explore our categories and discover useful articles, guides, and information on topics that matter."
          breadcrumbs={[{ label: "Home", path: "/" }, { label: "Categories" }]}
        />

        <section className="section">
          <Container>
            {categories.length > 0 ? (
              <CategoryGrid
                categories={categories}
                columns={3}
                showArticleCount
              />
            ) : (
              <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-6 py-16 text-center">
                <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                  No categories available
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                  Categories will appear here once they are available.
                </p>
              </div>
            )}
          </Container>
        </section>
      </main>
    </>
  );
};

export default Categories;
