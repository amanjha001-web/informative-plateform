import { useState } from "react";
import { Globe, Mail, Palette, Share2 } from "lucide-react";

import GeneralSettings from "../components/settings/GeneralSettings";
import AppearanceSettings from "../components/settings/AppearanceSettings";
import EmailSettings from "../components/settings/EmailSettings";
import SocialSettings from "../components/settings/SocialSettings";

const TABS = [
  {
    id: "general",
    label: "General",
    icon: Globe,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
  },
  {
    id: "email",
    label: "Email",
    icon: Mail,
  },
  {
    id: "social",
    label: "Social Media",
    icon: Share2,
  },
];

const INITIAL_SETTINGS = {
  general: {
    siteName: "Informative Platform",
    siteUrl: "https://example.com",
    adminEmail: "admin@example.com",
    supportEmail: "support@example.com",
    contactPhone: "",
    timezone: "Asia/Kolkata",
    language: "en",
    siteDescription:
      "A modern informative platform for publishing and managing content.",
  },

  appearance: {
    theme: "light",
    accentColor: "blue",
    compactMode: false,
    sidebarCollapsed: false,
  },

  email: {
    provider: "smtp",
    fromName: "Informative Platform",
    fromEmail: "noreply@example.com",
    replyTo: "support@example.com",
    smtpHost: "",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    encryption: "tls",
  },

  social: {
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    youtube: "",
  },
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const [settings, setSettings] = useState(INITIAL_SETTINGS);

  const [saving, setSaving] = useState(false);
  const [testingEmail, setTestingEmail] = useState(false);

  const handleSave = async (section, values) => {
    setSaving(true);

    try {
      /*
       * Backend integration:
       * await settingsService.update(section, values);
       */

      setSettings((current) => ({
        ...current,
        [section]: values,
      }));
    } finally {
      setSaving(false);
    }
  };

  const handleTestEmail = async (values) => {
    setTestingEmail(true);

    try {
      /*
       * Backend integration:
       * await settingsService.testEmail(values);
       */
      console.log("Test email configuration:", values);
    } finally {
      setTestingEmail(false);
    }
  };

  const renderActiveSettings = () => {
    switch (activeTab) {
      case "general":
        return (
          <GeneralSettings
            initialValues={settings.general}
            onSave={(values) => handleSave("general", values)}
            loading={saving}
          />
        );

      case "appearance":
        return (
          <AppearanceSettings
            initialValues={settings.appearance}
            onSave={(values) => handleSave("appearance", values)}
            loading={saving}
          />
        );

      case "email":
        return (
          <EmailSettings
            initialValues={settings.email}
            onSave={(values) => handleSave("email", values)}
            onTest={handleTestEmail}
            loading={saving}
            testing={testingEmail}
          />
        );

      case "social":
        return (
          <SocialSettings
            initialValues={settings.social}
            onSave={(values) => handleSave("social", values)}
            loading={saving}
          />
        );

      default:
        return null;
    }
  };

  return (
    <section className="settings-page">
      <div className="settings-page__header">
        <div>
          <h1 className="settings-page__title">Settings</h1>

          <p className="settings-page__description">
            Manage your platform configuration and administrative preferences.
          </p>
        </div>
      </div>

      <div className="settings-page__layout">
        <aside className="settings-page__sidebar">
          <nav className="settings-page__nav" aria-label="Settings navigation">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`settings-page__nav-item ${
                    active ? "settings-page__nav-item--active" : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon size={18} aria-hidden="true" />

                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="settings-page__content">{renderActiveSettings()}</div>
      </div>
    </section>
  );
};

export default Settings;
