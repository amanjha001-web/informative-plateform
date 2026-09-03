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
    address: "Cybrical Tech LLP",

    map: {
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2412.4376024593103!2d77.37961087350551!3d28.618764484709384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6562044ef606b63b%3A0x892972887b79d5ea!2sCybrical%20Tech%20LLP!5e1!3m2!1sen!2sin!4v1788452891740!5m2!1sen!2sin",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Cybrical+Tech+LLP",
    },
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
