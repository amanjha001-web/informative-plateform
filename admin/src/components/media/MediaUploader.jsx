import { useRef, useState } from "react";
import { ImagePlus, Upload, X } from "lucide-react";

import Button from "../common/Button";

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "application/pdf",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const MediaUploader = ({ onUpload, loading = false, multiple = true }) => {
  const inputRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return `${file.name}: Unsupported file type.`;
    }

    if (file.size > MAX_FILE_SIZE) {
      return `${file.name}: File size must be less than 10 MB.`;
    }

    return "";
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (selectedFiles.length === 0) {
      return;
    }

    setError("");

    const validFiles = [];
    const errors = [];

    selectedFiles.forEach((file) => {
      const validationError = validateFile(file);

      if (validationError) {
        errors.push(validationError);
        return;
      }

      validFiles.push(file);
    });

    setError(errors.join(" "));

    setFiles((current) =>
      multiple ? [...current, ...validFiles] : validFiles.slice(0, 1),
    );

    event.target.value = "";
  };

  const handleRemove = (index) => {
    setFiles((current) =>
      current.filter((_, fileIndex) => fileIndex !== index),
    );
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please select at least one file.");
      return;
    }

    setError("");

    await onUpload?.(files);
  };

  const formatFileSize = (size) => {
    if (size < 1024) {
      return `${size} B`;
    }

    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="media-uploader">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        multiple={multiple}
        className="media-uploader__input"
        onChange={handleFileChange}
      />

      <button
        type="button"
        className="media-uploader__dropzone"
        onClick={openFilePicker}
      >
        <div className="media-uploader__icon">
          <ImagePlus size={28} />
        </div>

        <div className="media-uploader__content">
          <strong className="media-uploader__title">Upload media files</strong>

          <span className="media-uploader__description">
            Click to select images, videos or PDF files
          </span>

          <span className="media-uploader__hint">Maximum file size: 10 MB</span>
        </div>
      </button>

      {error && <div className="media-uploader__error">{error}</div>}

      {files.length > 0 && (
        <div className="media-uploader__files">
          <div className="media-uploader__files-header">
            <span>Selected Files ({files.length})</span>
          </div>

          <div className="media-uploader__file-list">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${file.lastModified}-${index}`}
                className="media-uploader__file"
              >
                <div className="media-uploader__file-info">
                  <div className="media-uploader__file-icon">
                    <Upload size={16} />
                  </div>

                  <div className="media-uploader__file-details">
                    <span
                      className="media-uploader__file-name"
                      title={file.name}
                    >
                      {file.name}
                    </span>

                    <span className="media-uploader__file-size">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="media-uploader__remove"
                  title="Remove file"
                  onClick={() => handleRemove(index)}
                  disabled={loading}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="media-uploader__actions">
            <Button
              type="button"
              onClick={handleUpload}
              loading={loading}
              icon={Upload}
            >
              Upload {files.length > 1 ? "Files" : "File"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaUploader;
