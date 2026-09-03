import { Search, X } from "lucide-react";

const SearchInput = ({
  value = "",
  onChange,
  onClear,
  onSubmit,
  placeholder = "Search...",
  disabled = false,
  loading = false,
  className = "",
  inputClassName = "",
  ...props
}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubmit?.(value);
    }
  };

  const handleClear = () => {
    onClear?.();
  };

  return (
    <div className={`relative w-full ${className}`}>
      <Search
        size={19}
        strokeWidth={1.8}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-foreground))]"
        aria-hidden="true"
      />

      <input
        type="search"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || loading}
        aria-label="Search"
        className={[
          "h-11 w-full rounded-lg border",
          "border-[rgb(var(--border))]",
          "bg-[rgb(var(--background))]",
          "pl-10 pr-10",
          "text-sm text-[rgb(var(--foreground))]",
          "placeholder:text-[rgb(var(--muted-foreground))]",
          "outline-none transition-all duration-200",
          "focus:border-[rgb(var(--primary))]",
          "focus:ring-2 focus:ring-[rgb(var(--primary))]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "[&::-webkit-search-cancel-button]:appearance-none",
          inputClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />

      {value && !loading && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[rgb(var(--muted-foreground))] transition-colors hover:bg-[rgb(var(--secondary))] hover:text-[rgb(var(--foreground))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))]"
        >
          <X size={17} />
        </button>
      )}

      {loading && (
        <div
          className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-[rgb(var(--border))] border-t-[rgb(var(--primary))]"
          aria-label="Searching"
          role="status"
        />
      )}
    </div>
  );
};

export default SearchInput;
