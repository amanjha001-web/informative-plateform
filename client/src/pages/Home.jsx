import Container from "../components/common/Container";
import SEO from "../components/common/SEO";

import Hero from "../components/home/Hero";
import SearchSection from "../components/home/SearchSection";
import CategorySection from "../components/home/CategorySection";
import FeaturedArticles from "../components/home/FeaturedArticles";
import LatestArticles from "../components/home/LatestArticles";
import PopularTopics from "../components/home/PopularTopics";
import Newsletter from "../components/home/Newsletter";
import HomeCTA from "../components/home/HomeCTA";

import  categories  from "../data/categories";
import  articles from "../data/articles";

const Home = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Explore useful articles, guides, information, and insights on topics that matter."
        canonical="/"
      />

      <main>
        {/* Hero */}
        <Hero />

        {/* Search */}
        <SearchSection />

        {/* Categories */}
        <section className="section">
          <Container>
            <CategorySection categories={categories} />
          </Container>
        </section>

        {/* Featured Articles */}
        <section className="section">
          <Container>
            <FeaturedArticles articles={articles} />
          </Container>
        </section>

        {/* Latest Articles */}
        <section className="section bg-[rgb(var(--secondary))]/40">
          <Container>
            <LatestArticles articles={articles} />
          </Container>
        </section>

        {/* Popular Topics */}
        <section className="section">
          <Container>
            <PopularTopics articles={articles} />
          </Container>
        </section>

        {/* Newsletter */}
        <section className="section bg-[rgb(var(--secondary))]/40">
          <Container>
            <Newsletter />
          </Container>
        </section>

        {/* CTA */}
        <section className="section">
          <Container>
            <HomeCTA />
          </Container>
        </section>
      </main>
    </>
  );
};

export default Home;
