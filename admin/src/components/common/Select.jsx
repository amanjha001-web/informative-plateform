import { forwardRef, useId } from "react";
import { ChevronDown } from "lucide-react";

const Select = forwardRef(
  (
    {
      label,
      name,
      value = "",
      onChange,
      onBlur,
      options = [],
      placeholder = "Select an option",
      error = "",
      helperText = "",
      required = false,
      disabled = false,
      className = "",
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const selectId = id || name || generatedId;

    const selectClassName = [
      "select__control",
      error ? "select__control--error" : "",
      disabled ? "select__control--disabled" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="select">
        {label && (
          <label htmlFor={selectId} className="select__label">
            {label}

            {required && (
              <span className="select__required" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="select__wrapper">
          <select
            ref={ref}
            id={selectId}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            required={required}
            className={selectClassName}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error
                ? `${selectId}-error`
                : helperText
                  ? `${selectId}-helper`
                  : undefined
            }
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
                <option
                  key={String(optionValue)}
                  value={optionValue}
                  disabled={
                    typeof option === "object"
                      ? Boolean(option.disabled)
                      : false
                  }
                >
                  {optionLabel}
                </option>
              );
            })}
          </select>

          <ChevronDown className="select__icon" size={18} aria-hidden="true" />
        </div>

        {error && (
          <p id={`${selectId}-error`} className="select__error" role="alert">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={`${selectId}-helper`} className="select__helper">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
