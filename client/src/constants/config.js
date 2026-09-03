export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || "InfoHub",
  description:
    import.meta.env.VITE_APP_DESCRIPTION ||
    "A trusted source for useful information, guides, and articles.",
  url: import.meta.env.VITE_APP_URL || "http://localhost:5173",

  api: {
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  },

  pagination: {
    defaultLimit: 12,
    articlesPerPage: 12,
    searchResultsPerPage: 12,
  },

  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    twitter: "#",
    youtube: "#",
  },

  contact: {
    email: "info@example.com",
    phone: "+91 00000 00000",
    address: "India",
  },

  features: {
    newsletter: true,
    search: true,
    darkMode: true,
    socialSharing: true,
  },
};

export const APP_NAME = APP_CONFIG.name;
export const API_BASE_URL = APP_CONFIG.api.baseUrl;
