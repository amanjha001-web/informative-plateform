import Badge from "../common/Badge";

const ArticleStatus = ({ status = "draft" }) => {
  const normalizedStatus = status.toLowerCase();

  const statusConfig = {
    published: {
      label: "Published",
      variant: "success",
    },
    draft: {
      label: "Draft",
      variant: "warning",
    },
    archived: {
      label: "Archived",
      variant: "default",
    },
    pending: {
      label: "Pending",
      variant: "info",
    },
    rejected: {
      label: "Rejected",
      variant: "danger",
    },
  };

  const config = statusConfig[normalizedStatus] || {
    label: status || "Unknown",
    variant: "default",
  };

  return (
    <Badge variant={config.variant} size="sm" dot>
      {config.label}
    </Badge>
  );
};

export default ArticleStatus;
