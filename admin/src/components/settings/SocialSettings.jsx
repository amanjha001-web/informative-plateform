
import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Save } from "lucide-react";

import Button from "../common/Button";
import Input from "../common/Input";

const DEFAULT_VALUES = {
  facebook: "",
  instagram: "",
  twitter: "",
  linkedin: "",
  youtube: "",
};

const SOCIAL_FIELDS = [
  {
    name: "facebook",
    label: "Facebook",
    placeholder: "https://facebook.com/your-page",
    icon: FaFacebookF,
  },
  {
    name: "instagram",
    label: "Instagram",
    placeholder: "https://instagram.com/your-profile",
    icon: FaInstagram,
  },
  {
    name: "twitter",
    label: "Twitter / X",
    placeholder: "https://x.com/your-profile",
    icon: FaXTwitter,
  },
  {
    name: "linkedin",
    label: "LinkedIn",
    placeholder: "https://linkedin.com/company/your-company",
    icon: FaLinkedinIn,
  },
  {
    name: "youtube",
    label: "YouTube",
    placeholder: "https://youtube.com/@your-channel",
    icon: FaYoutube,
  },
];

const isValidUrl = (value) => {
  try {
    const url = new URL(value);

    return (
      ["http:", "https:"].includes(url.protocol) &&
      Boolean(url.hostname)
    );
  } catch {
    return false;
  }
};

const SocialSettings = ({
  initialValues = {},
  onSave,
  loading = false,
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

    SOCIAL_FIELDS.forEach(({ name }) => {
      const value = formData[name].trim();

      if (!value) {
        return;
      }

      if (!isValidUrl(value)) {
        nextErrors[name] = "Enter a valid HTTP or HTTPS URL.";
      }
    });

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSave?.({
      ...formData,
      facebook: formData.facebook.trim(),
      instagram: formData.instagram.trim(),
      twitter: formData.twitter.trim(),
      linkedin: formData.linkedin.trim(),
      youtube: formData.youtube.trim(),
    });
  };

  return (
    <form
      className="settings-form social-settings"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="settings-form__header">
        <div className="settings-form__icon">
          <FaInstagram
            size={20}
            aria-hidden="true"
          />
        </div>

        <div>
          <h2 className="settings-form__title">
            Social Media
          </h2>

          <p className="settings-form__description">
            Manage the social media profiles displayed across
            the platform.
          </p>
        </div>
      </div>

      <div className="settings-form__section">
        <h3 className="settings-form__section-title">
          Social Profiles
        </h3>

        <div className="settings-form__grid">
          {SOCIAL_FIELDS.map((field) => {
            const Icon = field.icon;

            return (
              <div
                key={field.name}
                className="social-settings__field"
              >
                <Input
                  label={field.label}
                  name={field.name}
                  type="url"
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  error={errors[field.name]}
                  icon={Icon}
                  disabled={loading}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="social-settings__hint">
        <strong>Tip:</strong> Leave a field empty if your
        platform does not have that social media profile.
      </div>

      <div className="settings-form__footer">
        <Button
          type="submit"
          loading={loading}
          icon={Save}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default SocialSettings;
