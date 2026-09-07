import { Copy, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";

import Badge from "../common/Badge";

const MediaCard = ({ media = {}, onSelect, onDelete, onCopyUrl }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const mediaId = media.id || media._id;

  const name = media.name || "Untitled Media";
  const url = media.url || media.src || "";
  const type = media.type || "image";
  const size = media.size || "—";

  const handleSelect = () => {
    setMenuOpen(false);
    onSelect?.(media);
  };

  const handleDelete = () => {
    setMenuOpen(false);
    onDelete?.(media);
  };

  const handleCopyUrl = () => {
    setMenuOpen(false);
    onCopyUrl?.(media);
  };

  const getTypeVariant = () => {
    switch (type.toLowerCase()) {
      case "image":
        return "info";
      case "video":
        return "warning";
      case "document":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <article className="media-card">
      <button
        type="button"
        className="media-card__preview"
        onClick={handleSelect}
        title="View media details"
      >
        {url && type === "image" ? (
          <img src={url} alt={name} className="media-card__image" />
        ) : (
          <div className="media-card__placeholder">
            <span>{type.charAt(0).toUpperCase()}</span>
          </div>
        )}
      </button>

      <div className="media-card__content">
        <div className="media-card__header">
          <div className="media-card__info">
            <h3 className="media-card__name" title={name}>
              {name}
            </h3>

            <span className="media-card__size">{size}</span>
          </div>

          <div className="media-card__menu">
            <button
              type="button"
              className="media-card__action"
              title="More actions"
              aria-expanded={menuOpen}
              aria-controls={`media-menu-${mediaId}`}
              onClick={() => setMenuOpen((current) => !current)}
            >
              <MoreVertical size={17} />
            </button>

            {menuOpen && (
              <div
                id={`media-menu-${mediaId}`}
                className="media-card__dropdown"
              >
                <button
                  type="button"
                  className="media-card__dropdown-item"
                  onClick={handleSelect}
                >
                  View Details
                </button>

                <button
                  type="button"
                  className="media-card__dropdown-item"
                  onClick={handleCopyUrl}
                  disabled={!url}
                >
                  <Copy size={15} />
                  <span>Copy URL</span>
                </button>

                <button
                  type="button"
                  className="media-card__dropdown-item media-card__dropdown-item--danger"
                  onClick={handleDelete}
                >
                  <Trash2 size={15} />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="media-card__meta">
          <Badge variant={getTypeVariant()} size="sm">
            {type}
          </Badge>
        </div>
      </div>
    </article>
  );
};

export default MediaCard;
