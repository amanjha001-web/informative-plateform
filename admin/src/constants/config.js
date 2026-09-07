
const APP_CONFIG = {
  app: {
    name: "Informative Platform",
    shortName: "Informative",
    version: "1.0.0",
    environment: import.meta.env.MODE,
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
  },

  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
    timeout: 15000,
  },

  pagination: {
    defaultPage: 1,
    defaultLimit: 10,
    maxLimit: 100,
  },

  upload: {
    maxFileSize: 5 * 1024 * 1024,
    maxFiles: 10,

    allowedImageTypes: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ],

    allowedDocumentTypes: [
      "application/pdf",
    ],
  },

  storage: {
    themeKey: "admin-theme",
    authKey: "admin-auth",
    userKey: "admin-user",
  },

  ui: {
    debounceDelay: 400,
    toastDuration: 3000,
  },
};

export default APP_CONFIG;








