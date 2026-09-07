import { useState } from "react";
import { Save } from "lucide-react";

import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

const DEFAULT_VALUES = {
  fullName: "",
  username: "",
  email: "",
  role: "user",
  status: "active",
};

const UserForm = ({
  initialValues = {},
  onSubmit,
  loading = false,
  submitLabel = "Save User",
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

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.role) {
      newErrors.role = "Role is required.";
    }

    if (!formData.status) {
      newErrors.status = "Status is required.";
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
    <form className="user-form" onSubmit={handleSubmit} noValidate>
      <div className="user-form__fields">
        <Input
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter full name"
          error={errors.fullName}
          required
        />

        <Input
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter username"
          error={errors.username}
          required
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          error={errors.email}
          required
        />

        <Select
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          options={[
            {
              value: "user",
              label: "User",
            },
            {
              value: "editor",
              label: "Editor",
            },
            {
              value: "admin",
              label: "Admin",
            },
          ]}
          error={errors.role}
          required
        />

        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            {
              value: "active",
              label: "Active",
            },
            {
              value: "inactive",
              label: "Inactive",
            },
            {
              value: "blocked",
              label: "Blocked",
            },
          ]}
          error={errors.status}
          required
        />
      </div>

      <div className="user-form__actions">
        <Button type="submit" loading={loading} icon={Save}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
