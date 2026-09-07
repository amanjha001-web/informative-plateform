
import { forwardRef, useId } from "react";

const Textarea = forwardRef(
  (
    {
      label,
      name,
      value = "",
      onChange,
      onBlur,
      placeholder = "",
      rows = 4,
      error = "",
      helperText = "",
      required = false,
      disabled = false,
      readOnly = false,
      maxLength,
      showCount = false,
      resize = "vertical",
      className = "",
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const textareaId = id || name || generatedId;

    const textareaClassName = [
      "textarea__control",
      error ? "textarea__control--error" : "",
      `textarea__control--resize-${resize}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="textarea">
        {label && (
          <label
            htmlFor={textareaId}
            className="textarea__label"
          >
            {label}

            {required && (
              <span
                className="textarea__required"
                aria-hidden="true"
              >
                *
              </span>
            )}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          className={textareaClassName}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : helperText
                ? `${textareaId}-helper`
                : undefined
          }
          {...props}
        />

        <div className="textarea__footer">
          <div>
            {error && (
              <p
                id={`${textareaId}-error`}
                className="textarea__error"
                role="alert"
              >
                {error}
              </p>
            )}

            {!error && helperText && (
              <p
                id={`${textareaId}-helper`}
                className="textarea__helper"
              >
                {helperText}
              </p>
            )}
          </div>

          {showCount && maxLength && (
            <span className="textarea__count">
              {String(value).length}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
