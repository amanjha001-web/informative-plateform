import { useMemo, useState } from "react";
import { Upload } from "lucide-react";

import MediaGrid from "../components/media/MediaGrid";
import MediaDetails from "../components/media/MediaDetails";
import MediaUploader from "../components/media/MediaUploader";

import Button from "../components/common/Button";
import Drawer from "../components/common/Drawer";
import Modal from "../components/common/Modal";
import ConfirmDialog from "../components/common/ConfirmDialog";
import SearchInput from "../components/common/SearchInput";
import Select from "../components/common/Select";

const INITIAL_MEDIA = [
  {
    id: 1,
    name: "homepage-banner.webp",
    url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    type: "image",
    size: "245 KB",
    mimeType: "image/webp",
    createdAt: "07 Sep 2026",
    width: 1600,
    height: 600,
  },
  {
    id: 2,
    name: "about-office.jpg",
    url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
    type: "image",
    size: "384 KB",
    mimeType: "image/jpeg",
    createdAt: "06 Sep 2026",
    width: 1200,
    height: 800,
  },
  {
    id: 3,
    name: "company-intro.mp4",
    url: "",
    type: "video",
    size: "4.8 MB",
    mimeType: "video/mp4",
    createdAt: "05 Sep 2026",
  },
  {
    id: 4,
    name: "company-profile.pdf",
    url: "",
    type: "document",
    size: "1.2 MB",
    mimeType: "application/pdf",
    createdAt: "04 Sep 2026",
  },
  {
    id: 5,
    name: "team-photo.webp",
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
    type: "image",
    size: "312 KB",
    mimeType: "image/webp",
    createdAt: "03 Sep 2026",
    width: 1400,
    height: 933,
  },
];

const Media = () => {
  const [media, setMedia] = useState(INITIAL_MEDIA);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const [selectedMedia, setSelectedMedia] = useState(null);
  const [deleteMedia, setDeleteMedia] = useState(null);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const [uploading, setUploading] = useState(false);

  const filteredMedia = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return media.filter((item) => {
      const matchesSearch =
        !normalizedSearch || item.name.toLowerCase().includes(normalizedSearch);

      const matchesType = !type || item.type === type;

      return matchesSearch && matchesType;
    });
  }, [media, search, type]);

  const handleUpload = async (files) => {
    setUploading(true);

    try {
      const uploadedMedia = files.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type.startsWith("image/")
          ? "image"
          : file.type.startsWith("video/")
            ? "video"
            : "document",
        size: formatFileSize(file.size),
        mimeType: file.type,
        createdAt: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      }));

      setMedia((current) => [...uploadedMedia, ...current]);

      setUploadModalOpen(false);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = () => {
    if (!deleteMedia) {
      return;
    }

    setMedia((current) =>
      current.filter(
        (item) => (item.id || item._id) !== (deleteMedia.id || deleteMedia._id),
      ),
    );

    setDeleteMedia(null);

    if (
      selectedMedia &&
      (selectedMedia.id || selectedMedia._id) ===
        (deleteMedia.id || deleteMedia._id)
    ) {
      setSelectedMedia(null);
    }
  };

  const handleCopyUrl = async (item) => {
    if (!item.url) {
      return;
    }

    try {
      await navigator.clipboard.writeText(item.url);
    } catch {
      // Clipboard may be unavailable in insecure contexts.
    }
  };

  return (
    <div className="media-page">
      <div className="media-page__header">
        <div>
          <h1 className="media-page__title">Media Library</h1>

          <p className="media-page__description">
            Manage images, videos and documents used across the platform.
          </p>
        </div>

        <Button
          type="button"
          icon={Upload}
          onClick={() => setUploadModalOpen(true)}
        >
          Upload Media
        </Button>
      </div>

      <div className="media-page__filters">
        <SearchInput
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search media..."
        />

        <Select
          value={type}
          onChange={(event) => setType(event.target.value)}
          options={[
            {
              value: "",
              label: "All Types",
            },
            {
              value: "image",
              label: "Images",
            },
            {
              value: "video",
              label: "Videos",
            },
            {
              value: "document",
              label: "Documents",
            },
          ]}
        />
      </div>

      <div className="media-page__content">
        <MediaGrid
          media={filteredMedia}
          onSelect={setSelectedMedia}
          onDelete={setDeleteMedia}
          onCopyUrl={handleCopyUrl}
        />
      </div>

      <Modal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload Media"
      >
        <MediaUploader onUpload={handleUpload} loading={uploading} />
      </Modal>

      <Drawer
        open={Boolean(selectedMedia)}
        onClose={() => setSelectedMedia(null)}
        title="Media Details"
      >
        {selectedMedia && <MediaDetails media={selectedMedia} />}
      </Drawer>

      <ConfirmDialog
        open={Boolean(deleteMedia)}
        onClose={() => setDeleteMedia(null)}
        onConfirm={handleDelete}
        title="Delete Media"
        message={
          deleteMedia
            ? `Are you sure you want to delete "${deleteMedia.name}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
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

export default Media;
