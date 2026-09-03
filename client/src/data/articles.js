const articles = [
  {
    id: "article-001",
    slug: "how-artificial-intelligence-is-changing-everyday-life",
    title: "How Artificial Intelligence Is Changing Everyday Life",
    excerpt:
      "Discover how artificial intelligence is becoming part of everyday activities, from communication and productivity to entertainment and learning.",
    content: `
      <p>
        Artificial intelligence is rapidly becoming a part of everyday life.
        From digital assistants to recommendation systems, AI is helping people
        complete tasks faster and make better-informed decisions.
      </p>

      <p>
        Businesses and individuals are using AI tools for productivity,
        communication, research, education, and content creation.
      </p>

      <p>
        As these technologies continue to evolve, understanding how they work
        and how to use them responsibly is becoming increasingly important.
      </p>
    `,
    category: {
      slug: "technology",
      name: "Technology",
    },
    author: {
      name: "InfoHub Editorial Team",
      role: "Editorial Team",
    },
    image: "/images/articles/artificial-intelligence.jpeg",
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-22",
    readTime: 6,
    views: 1240,
    featured: true,
    popular: true,
    tags: ["AI", "Technology", "Artificial Intelligence"],
  },

  {
    id: "article-002",
    slug: "essential-digital-skills-for-the-modern-workplace",
    title: "Essential Digital Skills for the Modern Workplace",
    excerpt:
      "Learn about the digital skills that can help professionals work more efficiently in today's technology-driven workplace.",
    content: `
      <p>
        Digital skills have become an important part of almost every modern
        workplace. Employees are expected to understand common digital tools,
        communication platforms, and productivity systems.
      </p>

      <p>
        Developing strong digital skills can improve productivity,
        collaboration, and professional growth.
      </p>
    `,
    category: {
      slug: "education",
      name: "Education",
    },
    author: {
      name: "InfoHub Editorial Team",
      role: "Editorial Team",
    },
    image: "/images/articles/digital-skills.jpeg",
    publishedAt: "2026-08-18",
    updatedAt: "2026-08-18",
    readTime: 5,
    views: 980,
    featured: true,
    popular: false,
    tags: ["Digital Skills", "Career", "Education"],
  },

  {
    id: "article-003",
    slug: "small-business-digital-transformation-guide",
    title: "A Simple Guide to Digital Transformation for Small Businesses",
    excerpt:
      "Understand the basic steps small businesses can take to adopt digital tools and improve their operations.",
    content: `
      <p>
        Digital transformation does not always require expensive technology.
        Small businesses can begin by identifying repetitive processes and
        introducing simple digital tools.
      </p>

      <p>
        From online communication to digital payments and customer management,
        technology can help businesses become more efficient.
      </p>
    `,
    category: {
      slug: "business",
      name: "Business",
    },
    author: {
      name: "InfoHub Editorial Team",
      role: "Editorial Team",
    },
    image: "/images/articles/digital-transformation.jpeg",
    publishedAt: "2026-08-15",
    updatedAt: "2026-08-17",
    readTime: 7,
    views: 870,
    featured: true,
    popular: true,
    tags: ["Business", "Digital Transformation", "Technology"],
  },

  {
    id: "article-004",
    slug: "simple-habits-for-a-healthier-lifestyle",
    title: "Simple Habits for a Healthier Lifestyle",
    excerpt:
      "Explore practical everyday habits that can contribute to a healthier and more balanced lifestyle.",
    content: `
      <p>
        A healthy lifestyle is often built through small and consistent daily
        habits rather than sudden major changes.
      </p>

      <p>
        Regular movement, balanced nutrition, adequate rest, and maintaining
        healthy routines can support overall well-being.
      </p>
    `,
    category: {
      slug: "health",
      name: "Health",
    },
    author: {
      name: "InfoHub Editorial Team",
      role: "Editorial Team",
    },
    image: "/images/articles/healthy-lifestyle.jpeg",
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-12",
    readTime: 4,
    views: 760,
    featured: false,
    popular: true,
    tags: ["Health", "Wellness", "Lifestyle"],
  },

  {
    id: "article-005",
    slug: "personal-finance-basics-everyone-should-know",
    title: "Personal Finance Basics Everyone Should Know",
    excerpt:
      "Understand the fundamentals of budgeting, saving, emergency funds, and responsible money management.",
    content: `
      <p>
        Understanding basic personal finance can help individuals make more
        informed decisions about their money.
      </p>

      <p>
        Budgeting, maintaining an emergency fund, controlling unnecessary
        expenses, and setting financial goals are useful foundations for money
        management.
      </p>
    `,
    category: {
      slug: "finance",
      name: "Finance",
    },
    author: {
      name: "InfoHub Editorial Team",
      role: "Editorial Team",
    },
    image: "/images/articles/personal-finance.jpeg",
    publishedAt: "2026-08-10",
    updatedAt: "2026-08-11",
    readTime: 6,
    views: 1120,
    featured: true,
    popular: true,
    tags: ["Finance", "Personal Finance", "Money"],
  },

  {
    id: "article-006",
    slug: "ways-to-improve-productivity-without-burning-out",
    title: "Ways to Improve Productivity Without Burning Out",
    excerpt:
      "Learn practical approaches to managing tasks, maintaining focus, and creating sustainable productivity habits.",
    content: `
      <p>
        Productivity is not simply about doing more work. Sustainable
        productivity also requires proper planning, focused work, regular
        breaks, and realistic expectations.
      </p>

      <p>
        Building manageable routines can help people stay productive without
        constantly feeling overwhelmed.
      </p>
    `,
    category: {
      slug: "lifestyle",
      name: "Lifestyle",
    },
    author: {
      name: "InfoHub Editorial Team",
      role: "Editorial Team",
    },
    image: "/images/articles/productivity.jpeg",
    publishedAt: "2026-08-08",
    updatedAt: "2026-08-09",
    readTime: 5,
    views: 690,
    featured: false,
    popular: false,
    tags: ["Productivity", "Lifestyle", "Personal Development"],
  },
];

export default articles;
