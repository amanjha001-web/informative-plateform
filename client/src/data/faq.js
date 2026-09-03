const faq = [
  {
    id: "faq-001",
    question: "What is InfoHub?",
    answer:
      "InfoHub is an informative platform that provides useful articles, guides, resources, and general information across different topics.",
    category: "general",
    featured: true,
  },

  {
    id: "faq-002",
    question: "What topics can I find on InfoHub?",
    answer:
      "You can explore topics such as technology, business, education, health, finance, lifestyle, and other useful areas.",
    category: "general",
    featured: true,
  },

  {
    id: "faq-003",
    question: "How can I find a specific article?",
    answer:
      "You can use the search feature to find articles by title, topic, keyword, or category.",
    category: "articles",
    featured: true,
  },

  {
    id: "faq-004",
    question: "How often are new articles published?",
    answer:
      "New articles can be published regularly as fresh and useful content becomes available.",
    category: "articles",
    featured: false,
  },

  {
    id: "faq-005",
    question: "Can I browse articles by category?",
    answer:
      "Yes. You can browse the Categories section and select a category to view related articles.",
    category: "articles",
    featured: true,
  },

  {
    id: "faq-006",
    question: "Can I share an article?",
    answer:
      "Yes. Articles can be shared through supported social platforms or by copying the article link.",
    category: "articles",
    featured: false,
  },

  {
    id: "faq-007",
    question: "How can I contact the InfoHub team?",
    answer:
      "You can contact the team through the Contact page by submitting the contact form.",
    category: "support",
    featured: true,
  },

  {
    id: "faq-008",
    question: "Can I suggest a topic or article?",
    answer:
      "Yes. You can use the contact form to send topic suggestions or general feedback to the team.",
    category: "support",
    featured: false,
  },

  {
    id: "faq-009",
    question: "Is the information on InfoHub professional advice?",
    answer:
      "The content is intended for general informational and educational purposes. It should not be considered a substitute for professional advice where professional guidance is required.",
    category: "general",
    featured: true,
  },

  {
    id: "faq-010",
    question: "Can I subscribe to receive updates?",
    answer:
      "If newsletter subscriptions are enabled, you can subscribe using the newsletter form to receive updates and new content.",
    category: "newsletter",
    featured: false,
  },
];

export const FAQ_CATEGORIES = [
  {
    slug: "general",
    name: "General",
  },
  {
    slug: "articles",
    name: "Articles",
  },
  {
    slug: "support",
    name: "Support",
  },
  {
    slug: "newsletter",
    name: "Newsletter",
  },
];

export default faq;
