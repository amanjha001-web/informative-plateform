
import { useId, useRef, useState } from "react";
import {
  File,
  Image,
  UploadCloud,
  X,
} from "lucide-react";

const DEFAULT_ACCEPT = "image/jpeg,image/png,image/webp";

const FileUploader = ({
  label = "Upload File",
  accept = DEFAULT_ACCEPT,
  multiple = false,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024,
  files = [],
  onChange,
  error = "",
  helperText = "",
  disabled = false,
  showPreview = true,
  className = "",
}) => {
  const inputId = useId();
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const acceptedTypes = accept
    .split(",")
    .map((type) => type.trim().toLowerCase())
    .filter(Boolean);

  const isAcceptedType = (file) => {
    if (!acceptedTypes.length || acceptedTypes.includes("*/*")) {
      return true;
    }

    return acceptedTypes.some((type) => {
      if (type.endsWith("/*")) {
        return file.type.startsWith(type.replace("/*", "/"));
      }

      return file.type === type;
    });
  };

  const validateFiles = (selectedFiles) => {
    const validFiles = [];

    for (const file of selectedFiles) {
      if (!isAcceptedType(file)) {
        continue;
      }

      if (file.size > maxSize) {
        continue;
      }

      validFiles.push(file);
    }

    if (!multiple) {
      return validFiles.slice(0, 1);
    }

    return [...files, ...validFiles].slice(0, maxFiles);
  };

  const handleFiles = (selectedFiles) => {
    if (disabled) {
      return;
    }

    const fileList = Array.from(selectedFiles || []);

    if (!fileList.length) {
      return;
    }

    const nextFiles = validateFiles(fileList);
    onChange?.(nextFiles);
  };

  const handleInputChange = (event) => {
    handleFiles(event.target.files);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();

    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    if (!disabled) {
      handleFiles(event.dataTransfer.files);
    }
  };

  const handleBrowse = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const handleRemove = (index) => {
    if (disabled) {
      return;
    }

    const nextFiles = files.filter((_, fileIndex) => fileIndex !== index);
    onChange?.(nextFiles);
  };

  const getFilePreview = (file) => {
    if (!showPreview || !file.type?.startsWith("image/")) {
      return null;
    }

    return URL.createObjectURL(file);
  };

  const uploaderClassName = [
    "file-uploader",
    isDragging ? "file-uploader--dragging" : "",
    disabled ? "file-uploader--disabled" : "",
    error ? "file-uploader--error" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="file-uploader__container">
      {label && (
        <label className="file-uploader__label">
          {label}
        </label>
      )}

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="file-uploader__input"
        onChange={handleInputChange}
      />

      <div
        className={uploaderClassName}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={handleBrowse}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            handleBrowse();
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="file-uploader__icon">
          <UploadCloud size={28} aria-hidden="true" />
        </div>

        <div className="file-uploader__content">
          <p className="file-uploader__title">
            Drag & drop your file here
          </p>

          <p className="file-uploader__text">
            or{" "}
            <span className="file-uploader__browse">
              browse files
            </span>
          </p>

          <p className="file-uploader__hint">
            Max size: {Math.round(maxSize / 1024 / 1024)}MB
          </p>
        </div>
      </div>

      {error && (
        <p className="file-uploader__error" role="alert">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p className="file-uploader__helper">
          {helperText}
        </p>
      )}

      {files.length > 0 && (
        <div className="file-uploader__files">
          {files.map((file, index) => {
            const preview = getFilePreview(file);

            return (
              <div
                key={`${file.name}-${file.lastModified}-${index}`}
                className="file-uploader__file"
              >
                <div className="file-uploader__file-preview">
                  {preview ? (
                    <img
                      src={preview}
                      alt={file.name}
                      className="file-uploader__image"
                      onLoad={() => URL.revokeObjectURL(preview)}
                    />
                  ) : file.type?.startsWith("image/") ? (
                    <Image size={22} />
                  ) : (
                    <File size={22} />
                  )}
                </div>

                <div className="file-uploader__file-info">
                  <span className="file-uploader__file-name">
                    {file.name}
                  </span>

                  <span className="file-uploader__file-size">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>

                <button
                  type="button"
                  className="file-uploader__remove"
                  aria-label={`Remove ${file.name}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleRemove(index);
                  }}
                >
                  <X size={17} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
