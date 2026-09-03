export const CATEGORY_CONFIG = {
  technology: {
    slug: "technology",
    name: "Technology",
    description:
      "Explore technology, software, gadgets, AI, and the latest digital trends.",
    icon: "Cpu",
  },

  business: {
    slug: "business",
    name: "Business",
    description:
      "Useful insights, guides, strategies, and information about business and entrepreneurship.",
    icon: "BriefcaseBusiness",
  },

  education: {
    slug: "education",
    name: "Education",
    description:
      "Discover educational resources, learning guides, career information, and useful tips.",
    icon: "GraduationCap",
  },

  health: {
    slug: "health",
    name: "Health",
    description:
      "Informative articles and practical resources about health, wellness, and lifestyle.",
    icon: "HeartPulse",
  },

  lifestyle: {
    slug: "lifestyle",
    name: "Lifestyle",
    description:
      "Explore lifestyle, productivity, personal development, and everyday useful information.",
    icon: "Sparkles",
  },

  finance: {
    slug: "finance",
    name: "Finance",
    description:
      "Learn about personal finance, money management, saving, investing, and financial awareness.",
    icon: "WalletCards",
  },
};

export const CATEGORY_LIST = Object.values(CATEGORY_CONFIG);

export const CATEGORY_SLUGS = Object.keys(CATEGORY_CONFIG);
