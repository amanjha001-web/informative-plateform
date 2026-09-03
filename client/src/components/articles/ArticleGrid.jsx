import ArticleCard from "./ArticleCard";

const ArticleGrid = ({
  articles = [],
  columns = 3,
  featured = false,
  className = "",
}) => {
  const gridColumns = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  if (!articles.length) {
    return null;
  }

  return (
    <div
      className={[
        "grid gap-5 md:gap-6",
        gridColumns[columns] || gridColumns[3],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} featured={featured} />
      ))}
    </div>
  );
};

export default ArticleGrid;
