
import { forwardRef, useId } from "react";
import { Loader2, Search, X } from "lucide-react";

const SearchInput = forwardRef(
  (
    {
      value = "",
      onChange,
      onClear,
      placeholder = "Search...",
      label = "",
      name = "search",
      disabled = false,
      loading = false,
      className = "",
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || name || generatedId;

    const inputClassName = [
      "search-input__control",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const handleClear = () => {
      onClear?.();

      if (!onClear) {
        onChange?.({
          target: {
            name,
            value: "",
          },
        });
      }
    };

    return (
      <div className="search-input">
        {label && (
          <label
            htmlFor={inputId}
            className="search-input__label"
          >
            {label}
          </label>
        )}

        <div className="search-input__wrapper">
          <Search
            size={18}
            className="search-input__search-icon"
            aria-hidden="true"
          />

          <input
            ref={ref}
            id={inputId}
            name={name}
            type="search"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClassName}
            aria-label={label || placeholder}
            {...props}
          />

          {loading && (
            <Loader2
              size={17}
              className="search-input__loading"
              aria-hidden="true"
            />
          )}

          {!loading && value && !disabled && (
            <button
              type="button"
              className="search-input__clear"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
