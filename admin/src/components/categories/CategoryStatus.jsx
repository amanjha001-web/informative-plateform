import Badge from "../common/Badge";

const CategoryStatus = ({ status = "active" }) => {
  const normalizedStatus = status.toLowerCase();

  const statusConfig = {
    active: {
      label: "Active",
      variant: "success",
    },
    inactive: {
      label: "Inactive",
      variant: "default",
    },
    archived: {
      label: "Archived",
      variant: "warning",
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

export default CategoryStatus;
