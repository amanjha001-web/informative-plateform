import { useState } from "react";
import { Save } from "lucide-react";

import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Select from "../common/Select";
import Button from "../common/Button";

const DEFAULT_VALUES = {
  pageTitle: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  canonicalUrl: "",
  robots: "index,follow",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
};

const SEOForm = ({
  initialValues = {},
  onSubmit,
  loading = false,
  submitLabel = "Save SEO",
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

    if (!formData.pageTitle.trim()) {
      nextErrors.pageTitle = "Page title is required.";
    }

    if (!formData.metaTitle.trim()) {
      nextErrors.metaTitle = "Meta title is required.";
    } else if (formData.metaTitle.length > 60) {
      nextErrors.metaTitle = "Meta title should not exceed 60 characters.";
    }

    if (!formData.metaDescription.trim()) {
      nextErrors.metaDescription = "Meta description is required.";
    } else if (formData.metaDescription.length > 160) {
      nextErrors.metaDescription =
        "Meta description should not exceed 160 characters.";
    }

    if (
      formData.canonicalUrl &&
      !/^https?:\/\/.+/i.test(formData.canonicalUrl)
    ) {
      nextErrors.canonicalUrl = "Enter a valid canonical URL.";
    }

    if (formData.ogImage && !/^https?:\/\/.+/i.test(formData.ogImage)) {
      nextErrors.ogImage = "Enter a valid image URL.";
    }

    if (
      formData.twitterImage &&
      !/^https?:\/\/.+/i.test(formData.twitterImage)
    ) {
      nextErrors.twitterImage = "Enter a valid image URL.";
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
    <form className="seo-form" onSubmit={handleSubmit} noValidate>
      {/* Basic SEO */}

      <section className="seo-form__section">
        <div className="seo-form__section-header">
          <h2 className="seo-form__section-title">Basic SEO</h2>

          <p className="seo-form__section-description">
            Configure the primary search engine metadata for this page.
          </p>
        </div>

        <div className="seo-form__grid">
          <Input
            label="Page Title"
            name="pageTitle"
            value={formData.pageTitle}
            onChange={handleChange}
            error={errors.pageTitle}
            placeholder="Enter page title"
            required
          />

          <Select
            label="Robots"
            name="robots"
            value={formData.robots}
            onChange={handleChange}
            options={[
              {
                value: "index,follow",
                label: "Index, Follow",
              },
              {
                value: "noindex,follow",
                label: "No Index, Follow",
              },
              {
                value: "index,nofollow",
                label: "Index, No Follow",
              },
              {
                value: "noindex,nofollow",
                label: "No Index, No Follow",
              },
            ]}
          />

          <div className="seo-form__full">
            <Input
              label="Meta Title"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              error={errors.metaTitle}
              placeholder="Enter meta title"
              helperText={`${formData.metaTitle.length}/60 characters`}
              required
            />
          </div>

          <div className="seo-form__full">
            <Textarea
              label="Meta Description"
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              error={errors.metaDescription}
              placeholder="Enter meta description"
              helperText={`${formData.metaDescription.length}/160 characters`}
              rows={4}
              required
            />
          </div>

          <div className="seo-form__full">
            <Input
              label="Meta Keywords"
              name="metaKeywords"
              value={formData.metaKeywords}
              onChange={handleChange}
              placeholder="keyword one, keyword two"
              helperText="Separate keywords with commas."
            />
          </div>

          <div className="seo-form__full">
            <Input
              label="Canonical URL"
              name="canonicalUrl"
              value={formData.canonicalUrl}
              onChange={handleChange}
              error={errors.canonicalUrl}
              placeholder="https://example.com/page"
              helperText="Preferred URL for search engines."
            />
          </div>
        </div>
      </section>

      {/* Open Graph */}

      <section className="seo-form__section">
        <div className="seo-form__section-header">
          <h2 className="seo-form__section-title">Open Graph</h2>

          <p className="seo-form__section-description">
            Control how the page appears when shared on social platforms.
          </p>
        </div>

        <div className="seo-form__grid">
          <div className="seo-form__full">
            <Input
              label="OG Title"
              name="ogTitle"
              value={formData.ogTitle}
              onChange={handleChange}
              placeholder="Social sharing title"
            />
          </div>

          <div className="seo-form__full">
            <Textarea
              label="OG Description"
              name="ogDescription"
              value={formData.ogDescription}
              onChange={handleChange}
              placeholder="Social sharing description"
              rows={4}
            />
          </div>

          <div className="seo-form__full">
            <Input
              label="OG Image URL"
              name="ogImage"
              value={formData.ogImage}
              onChange={handleChange}
              error={errors.ogImage}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
      </section>

      {/* Twitter */}

      <section className="seo-form__section">
        <div className="seo-form__section-header">
          <h2 className="seo-form__section-title">Twitter / X</h2>

          <p className="seo-form__section-description">
            Configure metadata used for Twitter and X link previews.
          </p>
        </div>

        <div className="seo-form__grid">
          <div className="seo-form__full">
            <Input
              label="Twitter Title"
              name="twitterTitle"
              value={formData.twitterTitle}
              onChange={handleChange}
              placeholder="Twitter card title"
            />
          </div>

          <div className="seo-form__full">
            <Textarea
              label="Twitter Description"
              name="twitterDescription"
              value={formData.twitterDescription}
              onChange={handleChange}
              placeholder="Twitter card description"
              rows={4}
            />
          </div>

          <div className="seo-form__full">
            <Input
              label="Twitter Image URL"
              name="twitterImage"
              value={formData.twitterImage}
              onChange={handleChange}
              error={errors.twitterImage}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
      </section>

      <div className="seo-form__footer">
        <Button type="submit" loading={loading} icon={Save}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default SEOForm;
