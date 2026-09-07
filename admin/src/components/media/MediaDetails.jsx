import {
  Calendar,
  File,
  FileText,
  HardDrive,
  Image as ImageIcon,
  Link as LinkIcon,
  Video,
} from "lucide-react";

import Badge from "../common/Badge";

const MediaDetails = ({ media = {} }) => {
  const {
    name = "Untitled Media",
    url = "",
    type = "image",
    size = "—",
    mimeType = "",
    createdAt = "",
    width,
    height,
  } = media;

  const normalizedType = type.toLowerCase();

  const typeConfig = {
    image: {
      label: "Image",
      variant: "info",
      icon: ImageIcon,
    },
    video: {
      label: "Video",
      variant: "warning",
      icon: Video,
    },
    document: {
      label: "Document",
      variant: "default",
      icon: FileText,
    },
  };

  const config = typeConfig[normalizedType] || {
    label: type || "Unknown",
    variant: "default",
    icon: File,
  };

  const TypeIcon = config.icon;

  return (
    <div className="media-details">
      <div className="media-details__preview">
        {url && normalizedType === "image" ? (
          <img src={url} alt={name} className="media-details__image" />
        ) : (
          <div className="media-details__placeholder">
            <TypeIcon size={48} />
            <span>{config.label}</span>
          </div>
        )}
      </div>

      <div className="media-details__header">
        <div className="media-details__title-wrapper">
          <h3 className="media-details__name">{name}</h3>

          <Badge variant={config.variant} size="sm" dot>
            {config.label}
          </Badge>
        </div>
      </div>

      <div className="media-details__divider" />

      <div className="media-details__info">
        <div className="media-details__info-item">
          <div className="media-details__info-icon">
            <HardDrive size={17} />
          </div>

          <div>
            <span className="media-details__info-label">File Size</span>

            <strong className="media-details__info-value">{size}</strong>
          </div>
        </div>

        <div className="media-details__info-item">
          <div className="media-details__info-icon">
            <File size={17} />
          </div>

          <div>
            <span className="media-details__info-label">File Type</span>

            <strong className="media-details__info-value">
              {mimeType || config.label}
            </strong>
          </div>
        </div>

        {(width || height) && (
          <div className="media-details__info-item">
            <div className="media-details__info-icon">
              <ImageIcon size={17} />
            </div>

            <div>
              <span className="media-details__info-label">Dimensions</span>

              <strong className="media-details__info-value">
                {width || "—"} × {height || "—"}
              </strong>
            </div>
          </div>
        )}

        <div className="media-details__info-item">
          <div className="media-details__info-icon">
            <Calendar size={17} />
          </div>

          <div>
            <span className="media-details__info-label">Uploaded</span>

            <strong className="media-details__info-value">
              {createdAt || "—"}
            </strong>
          </div>
        </div>

        <div className="media-details__info-item">
          <div className="media-details__info-icon">
            <LinkIcon size={17} />
          </div>

          <div className="media-details__url-wrapper">
            <span className="media-details__info-label">URL</span>

            <strong
              className="media-details__info-value media-details__url"
              title={url || "No URL available"}
            >
              {url || "No URL available"}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetails;
