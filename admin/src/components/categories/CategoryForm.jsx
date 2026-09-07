import { useState } from "react";
import { Save } from "lucide-react";

import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Button from "../common/Button";

const DEFAULT_VALUES = {
  name: "",
  slug: "",
  description: "",
};

const CategoryForm = ({
  initialValues = {},
  onSubmit,
  loading = false,
  submitLabel = "Save Category",
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
    const slug = formData.name
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

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required.";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required.";
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
    <form className="category-form" onSubmit={handleSubmit} noValidate>
      <div className="category-form__fields">
        <Input
          label="Category Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter category name"
          error={errors.name}
          required
        />

        <div className="category-form__slug-group">
          <Input
            label="Slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="category-slug"
            error={errors.slug}
            helperText="Use a unique URL-friendly slug."
            required
          />

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={generateSlug}
            disabled={!formData.name.trim()}
          >
            Generate Slug
          </Button>
        </div>

        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter category description..."
          rows={5}
        />
      </div>

      <div className="category-form__actions">
        <Button type="submit" loading={loading} icon={Save}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
