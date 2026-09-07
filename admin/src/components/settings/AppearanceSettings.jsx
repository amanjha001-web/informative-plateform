import { useState } from "react";
import { Check, Monitor, Moon, Palette, Save, Sun } from "lucide-react";

import Button from "../common/Button";

const THEME_OPTIONS = [
  {
    value: "light",
    label: "Light",
    description: "Use a light interface throughout the admin panel.",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    description: "Use a dark interface throughout the admin panel.",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    description: "Follow the operating system appearance preference.",
    icon: Monitor,
  },
];

const ACCENT_OPTIONS = [
  {
    value: "blue",
    label: "Blue",
    color: "#2563eb",
  },
  {
    value: "indigo",
    label: "Indigo",
    color: "#4f46e5",
  },
  {
    value: "violet",
    label: "Violet",
    color: "#7c3aed",
  },
  {
    value: "emerald",
    label: "Emerald",
    color: "#059669",
  },
  {
    value: "rose",
    label: "Rose",
    color: "#e11d48",
  },
];

const DEFAULT_VALUES = {
  theme: "light",
  accentColor: "blue",
  compactMode: false,
  sidebarCollapsed: false,
};

const AppearanceSettings = ({
  initialValues = {},
  onSave,
  loading = false,
}) => {
  const [formData, setFormData] = useState(() => ({
    ...DEFAULT_VALUES,
    ...initialValues,
  }));

  const handleThemeChange = (theme) => {
    setFormData((current) => ({
      ...current,
      theme,
    }));
  };

  const handleAccentChange = (accentColor) => {
    setFormData((current) => ({
      ...current,
      accentColor,
    }));
  };

  const handleToggle = (name) => {
    setFormData((current) => ({
      ...current,
      [name]: !current[name],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave?.(formData);
  };

  return (
    <form className="appearance-settings" onSubmit={handleSubmit}>
      <div className="settings-form__header">
        <div className="settings-form__icon">
          <Palette size={20} aria-hidden="true" />
        </div>

        <div>
          <h2 className="settings-form__title">Appearance Settings</h2>

          <p className="settings-form__description">
            Customize the admin panel appearance and interface preferences.
          </p>
        </div>
      </div>

      <div className="settings-form__section">
        <h3 className="settings-form__section-title">Theme</h3>

        <div className="appearance-settings__themes">
          {THEME_OPTIONS.map((option) => {
            const Icon = option.icon;
            const selected = formData.theme === option.value;

            return (
              <button
                key={option.value}
                type="button"
                className={`appearance-settings__theme ${
                  selected ? "appearance-settings__theme--selected" : ""
                }`}
                onClick={() => handleThemeChange(option.value)}
                aria-pressed={selected}
              >
                <span className="appearance-settings__theme-icon">
                  <Icon size={20} aria-hidden="true" />
                </span>

                <span className="appearance-settings__theme-content">
                  <span className="appearance-settings__theme-label">
                    {option.label}
                  </span>

                  <span className="appearance-settings__theme-description">
                    {option.description}
                  </span>
                </span>

                {selected && (
                  <span className="appearance-settings__check">
                    <Check size={16} aria-hidden="true" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="settings-form__section">
        <h3 className="settings-form__section-title">Accent Color</h3>

        <div className="appearance-settings__accents">
          {ACCENT_OPTIONS.map((option) => {
            const selected = formData.accentColor === option.value;

            return (
              <button
                key={option.value}
                type="button"
                className={`appearance-settings__accent ${
                  selected ? "appearance-settings__accent--selected" : ""
                }`}
                onClick={() => handleAccentChange(option.value)}
                aria-label={`Use ${option.label} accent color`}
                aria-pressed={selected}
              >
                <span
                  className="appearance-settings__accent-color"
                  style={{
                    backgroundColor: option.color,
                  }}
                />

                <span className="appearance-settings__accent-label">
                  {option.label}
                </span>

                {selected && <Check size={15} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="settings-form__section">
        <h3 className="settings-form__section-title">Interface</h3>

        <div className="appearance-settings__options">
          <label className="appearance-settings__option">
            <span>
              <strong>Compact Mode</strong>
              <small>
                Reduce spacing and make tables and lists more compact.
              </small>
            </span>

            <input
              type="checkbox"
              checked={formData.compactMode}
              onChange={() => handleToggle("compactMode")}
            />
          </label>

          <label className="appearance-settings__option">
            <span>
              <strong>Collapsed Sidebar</strong>
              <small>Start the admin panel with the sidebar collapsed.</small>
            </span>

            <input
              type="checkbox"
              checked={formData.sidebarCollapsed}
              onChange={() => handleToggle("sidebarCollapsed")}
            />
          </label>
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

export default AppearanceSettings;
