const formatNumber = (value, options = {}) => {
  if (value === null || value === undefined || value === "") {
    return "0";
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return "0";
  }

  const defaultOptions = {
    notation: "compact",
    maximumFractionDigits: 1,
  };

  return new Intl.NumberFormat("en-IN", {
    ...defaultOptions,
    ...options,
  }).format(number);
};

export default formatNumber;
