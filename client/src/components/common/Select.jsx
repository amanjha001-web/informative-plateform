import { useId } from "react";
import { ChevronDown } from "lucide-react";

const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  error = "",
  helperText = "",
  required = false,
  disabled = false,
  id,
  className = "",
  selectClassName = "",
  ...props
}) => {
  const generatedId = useId();
  const selectId = id || name || generatedId;

  const errorId = `${selectId}-error`;
  const helperId = `${selectId}-helper`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1.5 block text-sm font-medium text-[rgb(var(--foreground))]"
        >
          {label}

          {required && (
            <span className="ml-1 text-[rgb(var(--danger))]" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={[
            "h-11 w-full appearance-none rounded-lg border",
            "bg-[rgb(var(--background))]",
            "px-3 pr-10 text-sm",
            "text-[rgb(var(--foreground))]",
            "outline-none transition-all duration-200",
            "focus:ring-2 focus:ring-[rgb(var(--primary))]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-[rgb(var(--danger))] focus:border-[rgb(var(--danger))]"
              : "border-[rgb(var(--border))] focus:border-[rgb(var(--primary))]",
            selectClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => {
            const optionValue =
              typeof option === "object" ? option.value : option;

            const optionLabel =
              typeof option === "object" ? option.label : option;

            return (
              <option key={optionValue} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>

        <ChevronDown
          size={18}
          strokeWidth={1.8}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-foreground))]"
          aria-hidden="true"
        />
      </div>

      {error ? (
        <p id={errorId} className="mt-1.5 text-xs text-[rgb(var(--danger))]">
          {error}
        </p>
      ) : helperText ? (
        <p
          id={helperId}
          className="mt-1.5 text-xs text-[rgb(var(--muted-foreground))]"
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

export default Select;
