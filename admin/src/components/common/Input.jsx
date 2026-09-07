import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      name,
      type = "text",
      placeholder = "",
      value,
      onChange,
      onBlur,
      error = "",
      helperText = "",
      required = false,
      disabled = false,
      readOnly = false,
      icon: Icon,
      className = "",
      ...rest
    },
    ref,
  ) => {
    const inputId = name;

    return (
      <div className={`ui-field ${className}`}>
        {label && (
          <label htmlFor={inputId} className="ui-field__label">
            {label}

            {required && <span className="ui-field__required">*</span>}
          </label>
        )}

        <div
          className={`ui-input-wrapper ${
            error ? "ui-input-wrapper--error" : ""
          }`}
        >
          {Icon && <Icon size={18} className="ui-input-wrapper__icon" />}

          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            className="ui-input"
            {...rest}
          />
        </div>

        {error ? (
          <p className="ui-field__error">{error}</p>
        ) : (
          helperText && <p className="ui-field__helper">{helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
