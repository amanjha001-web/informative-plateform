import CategoryCard from "./CategoryCard";

const CategoryGrid = ({
  categories = [],
  columns = 3,
  showArticleCount = true,
  className = "",
}) => {
  const gridColumns = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  if (!categories.length) return null;

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
      {categories.map((category) => (
        <CategoryCard
          key={category.id || category.slug}
          category={category}
          showArticleCount={showArticleCount}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;
