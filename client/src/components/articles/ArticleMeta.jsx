import { Calendar, Clock, Eye, User } from "lucide-react";

const ArticleMeta = ({
  article,
  showAuthor = true,
  showDate = true,
  showReadTime = true,
  showViews = true,
  className = "",
}) => {
  if (!article) return null;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const items = [];

  if (showAuthor && article.author) {
    items.push({
      key: "author",
      icon: User,
      value: article.author,
    });
  }

  if (showDate && article.publishedAt) {
    items.push({
      key: "date",
      icon: Calendar,
      value: formatDate(article.publishedAt),
    });
  }

  if (showReadTime && article.readTime) {
    items.push({
      key: "read-time",
      icon: Clock,
      value: article.readTime,
    });
  }

  if (showViews && article.views !== undefined) {
    items.push({
      key: "views",
      icon: Eye,
      value: `${article.views} views`,
    });
  }

  if (!items.length) return null;

  return (
    <div
      className={[
        "flex flex-wrap items-center gap-x-5 gap-y-3",
        "text-sm text-[rgb(var(--muted-foreground))]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map(({ key, icon: Icon, value }) => (
        <span key={key} className="inline-flex items-center gap-1.5">
          <Icon size={15} strokeWidth={1.8} aria-hidden="true" />

          <span>{value}</span>
        </span>
      ))}
    </div>
  );
};

export default ArticleMeta;
