import { useState } from "react";
import { Save } from "lucide-react";

import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Select from "../common/Select";
import Button from "../common/Button";

const DEFAULT_VALUES = {
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  status: "draft",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
};

const PageForm = ({
  initialValues = {},
  onSubmit,
  loading = false,
  submitLabel = "Save Page",
  formId = "page-form",
}) => {
  const [formData, setFormData] = useState(() => ({
    ...DEFAULT_VALUES,
    ...initialValues,
  }));

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.title.trim()) {
      nextErrors.title = "Page title is required.";
    }

    if (!formData.slug.trim()) {
      nextErrors.slug = "Page slug is required.";
    }

    if (!formData.content.trim()) {
      nextErrors.content = "Page content is required.";
    }

    if (!formData.status) {
      nextErrors.status = "Page status is required.";
    }

    if (formData.metaTitle.length > 60) {
      nextErrors.metaTitle = "Meta title should not exceed 60 characters.";
    }

    if (formData.metaDescription.length > 160) {
      nextErrors.metaDescription =
        "Meta description should not exceed 160 characters.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit?.(formData);
  };

  return (
    <form id={formId} className="page-form" onSubmit={handleSubmit} noValidate>
      <div className="page-form__section">
        <div className="page-form__section-header">
          <h2 className="page-form__section-title">Page Information</h2>

          <p className="page-form__section-description">
            Basic information and content for the page.
          </p>
        </div>

        <div className="page-form__grid">
          <Input
            label="Page Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            placeholder="Enter page title"
            required
          />

          <Input
            label="Slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            error={errors.slug}
            placeholder="about-us"
            helperText="Use lowercase letters, numbers and hyphens."
            required
          />

          <div className="page-form__full">
            <Textarea
              label="Excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Short description of the page..."
              rows={3}
            />
          </div>

          <div className="page-form__full">
            <Textarea
              label="Content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              error={errors.content}
              placeholder="Write page content..."
              rows={14}
              required
            />
          </div>

          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            error={errors.status}
            options={[
              {
                value: "draft",
                label: "Draft",
              },
              {
                value: "published",
                label: "Published",
              },
              {
                value: "archived",
                label: "Archived",
              },
            ]}
            required
          />
        </div>
      </div>

      <div className="page-form__section">
        <div className="page-form__section-header">
          <h2 className="page-form__section-title">SEO Settings</h2>

          <p className="page-form__section-description">
            Configure search engine metadata for this page.
          </p>
        </div>

        <div className="page-form__grid">
          <div className="page-form__full">
            <Input
              label="Meta Title"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              error={errors.metaTitle}
              placeholder="Enter SEO title"
              helperText={`${formData.metaTitle.length}/60 characters`}
            />
          </div>

          <div className="page-form__full">
            <Textarea
              label="Meta Description"
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              error={errors.metaDescription}
              placeholder="Enter SEO description"
              helperText={`${formData.metaDescription.length}/160 characters`}
              rows={4}
            />
          </div>

          <div className="page-form__full">
            <Input
              label="Meta Keywords"
              name="metaKeywords"
              value={formData.metaKeywords}
              onChange={handleChange}
              placeholder="keyword one, keyword two, keyword three"
              helperText="Separate keywords with commas."
            />
          </div>
        </div>
      </div>

      <div className="page-form__footer">
        <Button type="submit" loading={loading} icon={Save}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default PageForm;
