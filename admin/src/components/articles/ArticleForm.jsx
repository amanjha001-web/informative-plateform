import { useState } from "react";
import { Save } from "lucide-react";

import Input from "../common/Input";
import Select from "../common/Select";
import Textarea from "../common/Textarea";
import Button from "../common/Button";

const DEFAULT_VALUES = {
  title: "",
  slug: "",
  category: "",
  status: "draft",
  excerpt: "",
  author: "",
};

const ArticleForm = ({
  initialValues = {},
  onSubmit,
  loading = false,
  submitLabel = "Save Article",
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

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setFormData((current) => ({
      ...current,
      slug,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required.";
    }

    if (!formData.category) {
      newErrors.category = "Category is required.";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit?.(formData);
  };

  return (
    <form className="article-form" onSubmit={handleSubmit} noValidate>
      <div className="article-form__grid">
        <div className="article-form__main">
          <div className="article-form__section">
            <div className="article-form__section-header">
              <h3>Basic Information</h3>
              <p>Add the basic details of your article.</p>
            </div>

            <div className="article-form__fields">
              <Input
                label="Article Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter article title"
                error={errors.title}
                required
              />

              <Input
                label="Slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="article-url-slug"
                error={errors.slug}
                helperText="Use a unique, URL-friendly slug."
                required
              />

              <div className="article-form__slug-action">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={generateSlug}
                  disabled={!formData.title.trim()}
                >
                  Generate Slug
                </Button>
              </div>

              <Select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={[
                  {
                    value: "",
                    label: "Select category",
                  },
                  {
                    value: "technology",
                    label: "Technology",
                  },
                  {
                    value: "programming",
                    label: "Programming",
                  },
                  {
                    value: "cloud",
                    label: "Cloud",
                  },
                  {
                    value: "business",
                    label: "Business",
                  },
                ]}
                error={errors.category}
                required
              />

              <Input
                label="Author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                error={errors.author}
                required
              />

              <Select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={[
                  {
                    value: "draft",
                    label: "Draft",
                  },
                  {
                    value: "pending",
                    label: "Pending",
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
              />

              <Textarea
                label="Excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Write a short description of the article..."
                rows={5}
                helperText="A short summary shown in article listings and previews."
              />
            </div>
          </div>
        </div>

        <aside className="article-form__sidebar">
          <div className="article-form__section">
            <div className="article-form__section-header">
              <h3>Publishing</h3>
              <p>Manage the article publishing status.</p>
            </div>

            <div className="article-form__publishing">
              <div className="article-form__status-preview">
                <span className="article-form__status-label">
                  Current Status
                </span>

                <strong>
                  {formData.status
                    ? formData.status.charAt(0).toUpperCase() +
                      formData.status.slice(1)
                    : "Draft"}
                </strong>
              </div>

              <Button type="submit" fullWidth loading={loading} icon={Save}>
                {submitLabel}
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </form>
  );
};

export default ArticleForm;
