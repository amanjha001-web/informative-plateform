const formatDate = (date, options = {}) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-IN", {
    ...defaultOptions,
    ...options,
  }).format(parsedDate);
};

export default formatDate;
