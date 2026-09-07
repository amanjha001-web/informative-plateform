import { useState } from "react";
import { Save } from "lucide-react";

import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Button from "../common/Button";

const DEFAULT_VALUES = {
  name: "",
  description: "",
};

const RoleForm = ({
  initialValues = {},
  onSubmit,
  onCancel,
  loading = false,
  submitLabel = "Save Role",
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

    if (!formData.name.trim()) {
      nextErrors.name = "Role name is required.";
    } else if (formData.name.trim().length < 2) {
      nextErrors.name = "Role name must be at least 2 characters.";
    }

    if (formData.name.trim().length > 50) {
      nextErrors.name = "Role name must not exceed 50 characters.";
    }

    if (formData.description.length > 250) {
      nextErrors.description = "Description must not exceed 250 characters.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit?.({
      ...formData,
      name: formData.name.trim(),
      description: formData.description.trim(),
    });
  };

  return (
    <form className="role-form" onSubmit={handleSubmit} noValidate>
      <div className="role-form__fields">
        <Input
          label="Role Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="e.g. Content Editor"
          helperText={`${formData.name.length}/50 characters`}
          required
        />

        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
          placeholder="Describe the responsibilities of this role."
          helperText={`${formData.description.length}/250 characters`}
          rows={4}
        />
      </div>

      <div className="role-form__actions">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        )}

        <Button type="submit" loading={loading} icon={Save}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default RoleForm;
