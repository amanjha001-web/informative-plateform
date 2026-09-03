import { useId } from "react";

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = "",
  helperText = "",
  required = false,
  disabled = false,
  readOnly = false,
  id,
  startIcon,
  endIcon,
  className = "",
  inputClassName = "",
  ...props
}) => {
  const generatedId = useId();

  const inputId = id || name || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const describedBy = error ? errorId : helperText ? helperId : undefined;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
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
        {startIcon && (
          <span
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-foreground))]"
            aria-hidden="true"
          >
            {startIcon}
          </span>
        )}

        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={[
            "h-11 w-full rounded-lg border",
            "bg-[rgb(var(--background))]",
            "text-sm text-[rgb(var(--foreground))]",
            "placeholder:text-[rgb(var(--muted-foreground))]",
            "outline-none transition-all duration-200",
            "focus:ring-2 focus:ring-[rgb(var(--primary))]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "read-only:cursor-default",
            startIcon ? "pl-10" : "px-3",
            endIcon ? "pr-10" : "px-3",
            error
              ? "border-[rgb(var(--danger))] focus:border-[rgb(var(--danger))]"
              : "border-[rgb(var(--border))] focus:border-[rgb(var(--primary))]",
            inputClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />

        {endIcon && (
          <span
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-foreground))]"
            aria-hidden="true"
          >
            {endIcon}
          </span>
        )}
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

export default Input;
