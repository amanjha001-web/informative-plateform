import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";

import PageTable from "../components/pages/PageTable";
import PageEditor from "../components/pages/PageEditor";

import Button from "../components/common/Button";
import SearchInput from "../components/common/SearchInput";
import Select from "../components/common/Select";
import Drawer from "../components/common/Drawer";
import ConfirmDialog from "../components/common/ConfirmDialog";

const INITIAL_PAGES = [
  {
    id: 1,
    title: "About Us",
    slug: "about-us",
    excerpt: "Learn more about our platform and organization.",
    content:
      "Welcome to our platform. We provide reliable and informative content for our users.",
    status: "published",
    metaTitle: "About Us | Informative Platform",
    metaDescription:
      "Learn more about our organization and informative platform.",
    metaKeywords: "about us, company, platform",
    updatedAt: "07 Sep 2026",
  },
  {
    id: 2,
    title: "Contact Us",
    slug: "contact-us",
    excerpt: "Get in touch with our team.",
    content: "Contact our team for questions, feedback and general enquiries.",
    status: "published",
    metaTitle: "Contact Us | Informative Platform",
    metaDescription: "Contact our team for support and general enquiries.",
    metaKeywords: "contact, support, enquiry",
    updatedAt: "06 Sep 2026",
  },
  {
    id: 3,
    title: "Privacy Policy",
    slug: "privacy-policy",
    excerpt: "Read our privacy policy.",
    content:
      "This privacy policy explains how we collect, use and protect user information.",
    status: "published",
    metaTitle: "Privacy Policy",
    metaDescription:
      "Read our privacy policy and understand how your information is handled.",
    metaKeywords: "privacy, policy, data protection",
    updatedAt: "05 Sep 2026",
  },
  {
    id: 4,
    title: "Terms & Conditions",
    slug: "terms-conditions",
    excerpt: "Review our terms and conditions.",
    content:
      "These terms and conditions define the rules for using our platform.",
    status: "draft",
    metaTitle: "Terms & Conditions",
    metaDescription: "Read the terms and conditions for using our platform.",
    metaKeywords: "terms, conditions, rules",
    updatedAt: "04 Sep 2026",
  },
];

const Pages = () => {
  const [pages, setPages] = useState(INITIAL_PAGES);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingPage, setEditingPage] = useState(null);

  const [selectedPage, setSelectedPage] = useState(null);
  const [deletePage, setDeletePage] = useState(null);

  const [saving, setSaving] = useState(false);

  const filteredPages = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return pages.filter((page) => {
      const matchesSearch =
        !normalizedSearch ||
        page.title.toLowerCase().includes(normalizedSearch) ||
        page.slug.toLowerCase().includes(normalizedSearch);

      const matchesStatus = !status || page.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [pages, search, status]);

  const handleAdd = () => {
    setEditingPage(null);
    setEditorOpen(true);
  };

  const handleEdit = (page) => {
    setEditingPage(page);
    setEditorOpen(true);
  };

  const handleView = (page) => {
    setSelectedPage(page);
  };

  const handleDelete = (page) => {
    setDeletePage(page);
  };

  const handleSave = async (formData) => {
    setSaving(true);

    try {
      const now = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      if (editingPage) {
        setPages((current) =>
          current.map((page) =>
            (page.id || page._id) === (editingPage.id || editingPage._id)
              ? {
                  ...page,
                  ...formData,
                  updatedAt: now,
                }
              : page,
          ),
        );
      } else {
        setPages((current) => [
          {
            ...formData,
            id: Date.now(),
            updatedAt: now,
          },
          ...current,
        ]);
      }

      setEditorOpen(false);
      setEditingPage(null);
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = () => {
    if (!deletePage) {
      return;
    }

    const deleteId = deletePage.id || deletePage._id;

    setPages((current) =>
      current.filter((page) => (page.id || page._id) !== deleteId),
    );

    setDeletePage(null);
  };

  const handlePreview = (page) => {
    if (!page) {
      return;
    }

    window.open(`/pages/${page.slug}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="pages-page">
      <div className="pages-page__header">
        <div>
          <h1 className="pages-page__title">Pages</h1>

          <p className="pages-page__description">
            Create and manage static pages for the platform.
          </p>
        </div>

        <Button type="button" icon={Plus} onClick={handleAdd}>
          Add Page
        </Button>
      </div>

      <div className="pages-page__filters">
        <div className="pages-page__search">
          <SearchInput
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search pages..."
            icon={Search}
          />
        </div>

        <Select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          options={[
            {
              value: "",
              label: "All Status",
            },
            {
              value: "published",
              label: "Published",
            },
            {
              value: "draft",
              label: "Draft",
            },
            {
              value: "archived",
              label: "Archived",
            },
          ]}
        />
      </div>

      <div className="pages-page__content">
        <PageTable
          pages={filteredPages}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
        />
      </div>

      <Drawer
        open={editorOpen}
        onClose={() => {
          setEditorOpen(false);
          setEditingPage(null);
        }}
        title={editingPage ? "Edit Page" : "Create Page"}
        size="large"
      >
        <PageEditor
          initialValues={editingPage || {}}
          onSubmit={handleSave}
          onPreview={editingPage ? () => handlePreview(editingPage) : undefined}
          onBack={() => {
            setEditorOpen(false);
            setEditingPage(null);
          }}
          loading={saving}
          submitLabel={editingPage ? "Update Page" : "Create Page"}
        />
      </Drawer>

      <Drawer
        open={Boolean(selectedPage)}
        onClose={() => setSelectedPage(null)}
        title="Page Details"
      >
        {selectedPage && (
          <div className="pages-page__details">
            <h2>{selectedPage.title}</h2>

            <p>
              <strong>Slug:</strong> /{selectedPage.slug}
            </p>

            <p>
              <strong>Status:</strong> {selectedPage.status}
            </p>

            <p>
              <strong>Updated:</strong> {selectedPage.updatedAt}
            </p>

            {selectedPage.excerpt && (
              <div>
                <strong>Excerpt</strong>
                <p>{selectedPage.excerpt}</p>
              </div>
            )}
          </div>
        )}
      </Drawer>

      <ConfirmDialog
        open={Boolean(deletePage)}
        onClose={() => setDeletePage(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Page"
        message={
          deletePage
            ? `Are you sure you want to delete "${deletePage.title}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};

export default Pages;
