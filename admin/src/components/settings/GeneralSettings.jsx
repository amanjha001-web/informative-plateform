import { useState } from "react";
import { Globe, Save } from "lucide-react";

import Button from "../common/Button";
import Input from "../common/Input";
import Textarea from "../common/Textarea";

const DEFAULT_VALUES = {
  siteName: "Informative Platform",
  siteUrl: "https://example.com",
  adminEmail: "admin@example.com",
  supportEmail: "support@example.com",
  contactPhone: "",
  timezone: "Asia/Kolkata",
  language: "en",
  siteDescription:
    "A modern informative platform for publishing and managing content.",
};

const GeneralSettings = ({ initialValues = {}, onSave, loading = false }) => {
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

    if (!formData.siteName.trim()) {
      nextErrors.siteName = "Site name is required.";
    }

    if (!formData.siteUrl.trim()) {
      nextErrors.siteUrl = "Site URL is required.";
    } else {
      try {
        new URL(formData.siteUrl);
      } catch {
        nextErrors.siteUrl = "Enter a valid site URL.";
      }
    }

    if (!formData.adminEmail.trim()) {
      nextErrors.adminEmail = "Admin email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.adminEmail)) {
      nextErrors.adminEmail = "Enter a valid admin email.";
    }

    if (
      formData.supportEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.supportEmail)
    ) {
      nextErrors.supportEmail = "Enter a valid support email.";
    }

    if (formData.siteDescription.length > 300) {
      nextErrors.siteDescription = "Description cannot exceed 300 characters.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSave?.(formData);
  };

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <div className="settings-form__header">
        <div className="settings-form__icon">
          <Globe size={20} aria-hidden="true" />
        </div>

        <div>
          <h2 className="settings-form__title">General Settings</h2>

          <p className="settings-form__description">
            Manage basic website information and contact details.
          </p>
        </div>
      </div>

      <div className="settings-form__section">
        <h3 className="settings-form__section-title">Website Information</h3>

        <div className="settings-form__grid">
          <Input
            label="Site Name"
            name="siteName"
            value={formData.siteName}
            onChange={handleChange}
            error={errors.siteName}
            required
          />

          <Input
            label="Site URL"
            name="siteUrl"
            type="url"
            value={formData.siteUrl}
            onChange={handleChange}
            error={errors.siteUrl}
            required
          />

          <Textarea
            label="Site Description"
            name="siteDescription"
            value={formData.siteDescription}
            onChange={handleChange}
            error={errors.siteDescription}
            helperText={`${formData.siteDescription.length}/300`}
            rows={4}
            className="settings-form__full"
          />
        </div>
      </div>

      <div className="settings-form__section">
        <h3 className="settings-form__section-title">Contact Information</h3>

        <div className="settings-form__grid">
          <Input
            label="Admin Email"
            name="adminEmail"
            type="email"
            value={formData.adminEmail}
            onChange={handleChange}
            error={errors.adminEmail}
            required
          />

          <Input
            label="Support Email"
            name="supportEmail"
            type="email"
            value={formData.supportEmail}
            onChange={handleChange}
            error={errors.supportEmail}
          />

          <Input
            label="Contact Phone"
            name="contactPhone"
            type="tel"
            value={formData.contactPhone}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="settings-form__section">
        <h3 className="settings-form__section-title">Regional Settings</h3>

        <div className="settings-form__grid">
          <Input
            label="Timezone"
            name="timezone"
            value={formData.timezone}
            onChange={handleChange}
            helperText="Example: Asia/Kolkata"
          />

          <Input
            label="Language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            helperText="Default website language"
          />
        </div>
      </div>

      <div className="settings-form__footer">
        <Button type="submit" loading={loading} icon={Save}>
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default GeneralSettings;
