import { useState } from "react";
import { Mail, Save, Send } from "lucide-react";

import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";

const DEFAULT_VALUES = {
  provider: "smtp",
  fromName: "Informative Platform",
  fromEmail: "noreply@example.com",
  replyTo: "support@example.com",
  smtpHost: "",
  smtpPort: "587",
  smtpUsername: "",
  smtpPassword: "",
  encryption: "tls",
};

const EmailSettings = ({
  initialValues = {},
  onSave,
  onTest,
  loading = false,
  testing = false,
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

    if (!formData.fromName.trim()) {
      nextErrors.fromName = "Sender name is required.";
    }

    if (!formData.fromEmail.trim()) {
      nextErrors.fromEmail = "Sender email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.fromEmail)) {
      nextErrors.fromEmail = "Enter a valid sender email.";
    }

    if (
      formData.replyTo &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.replyTo)
    ) {
      nextErrors.replyTo = "Enter a valid reply-to email.";
    }

    if (formData.provider === "smtp") {
      if (!formData.smtpHost.trim()) {
        nextErrors.smtpHost = "SMTP host is required.";
      }

      if (!formData.smtpPort.trim()) {
        nextErrors.smtpPort = "SMTP port is required.";
      }

      if (!formData.smtpUsername.trim()) {
        nextErrors.smtpUsername = "SMTP username is required.";
      }
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

  const handleTest = () => {
    if (!validate()) {
      return;
    }

    onTest?.(formData);
  };

  return (
    <form className="settings-form email-settings" onSubmit={handleSubmit}>
      <div className="settings-form__header">
        <div className="settings-form__icon">
          <Mail size={20} aria-hidden="true" />
        </div>

        <div>
          <h2 className="settings-form__title">Email Settings</h2>

          <p className="settings-form__description">
            Configure the email service used by the platform for notifications
            and system emails.
          </p>
        </div>
      </div>

      <div className="settings-form__section">
        <h3 className="settings-form__section-title">Email Provider</h3>

        <div className="settings-form__grid">
          <Select
            label="Provider"
            name="provider"
            value={formData.provider}
            onChange={handleChange}
            options={[
              {
                value: "smtp",
                label: "SMTP",
              },
            ]}
          />
        </div>
      </div>

      <div className="settings-form__section">
        <h3 className="settings-form__section-title">Sender Information</h3>

        <div className="settings-form__grid">
          <Input
            label="From Name"
            name="fromName"
            value={formData.fromName}
            onChange={handleChange}
            error={errors.fromName}
            required
          />

          <Input
            label="From Email"
            name="fromEmail"
            type="email"
            value={formData.fromEmail}
            onChange={handleChange}
            error={errors.fromEmail}
            required
          />

          <Input
            label="Reply-To Email"
            name="replyTo"
            type="email"
            value={formData.replyTo}
            onChange={handleChange}
            error={errors.replyTo}
          />
        </div>
      </div>

      {formData.provider === "smtp" && (
        <div className="settings-form__section">
          <h3 className="settings-form__section-title">SMTP Configuration</h3>

          <div className="settings-form__grid">
            <Input
              label="SMTP Host"
              name="smtpHost"
              placeholder="smtp.example.com"
              value={formData.smtpHost}
              onChange={handleChange}
              error={errors.smtpHost}
              required
            />

            <Input
              label="SMTP Port"
              name="smtpPort"
              type="number"
              placeholder="587"
              value={formData.smtpPort}
              onChange={handleChange}
              error={errors.smtpPort}
              required
            />

            <Input
              label="SMTP Username"
              name="smtpUsername"
              value={formData.smtpUsername}
              onChange={handleChange}
              error={errors.smtpUsername}
              required
            />

            <Input
              label="SMTP Password"
              name="smtpPassword"
              type="password"
              value={formData.smtpPassword}
              onChange={handleChange}
            />

            <Select
              label="Encryption"
              name="encryption"
              value={formData.encryption}
              onChange={handleChange}
              options={[
                {
                  value: "tls",
                  label: "TLS",
                },
                {
                  value: "ssl",
                  label: "SSL",
                },
                {
                  value: "none",
                  label: "None",
                },
              ]}
            />
          </div>
        </div>
      )}

      <div className="settings-form__footer">
        <Button
          type="button"
          variant="secondary"
          icon={Send}
          loading={testing}
          onClick={handleTest}
        >
          Send Test Email
        </Button>

        <Button type="submit" loading={loading} icon={Save}>
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default EmailSettings;
