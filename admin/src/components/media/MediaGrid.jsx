import MediaCard from "./MediaCard";
import EmptyState from "../common/EmptyState";

const MediaGrid = ({ media = [], onSelect, onDelete, onCopyUrl }) => {
  if (media.length === 0) {
    return (
      <div className="media-grid-empty">
        <EmptyState
          title="No media found"
          description="There are no media files available to display."
        />
      </div>
    );
  }

  return (
    <div className="media-grid">
      {media.map((item) => {
        const mediaId = item.id || item._id;

        return (
          <MediaCard
            key={mediaId}
            media={item}
            onSelect={onSelect}
            onDelete={onDelete}
            onCopyUrl={onCopyUrl}
          />
        );
      })}
    </div>
  );
};

export default MediaGrid;
