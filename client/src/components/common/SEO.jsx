import { useEffect } from "react";

import { APP_CONFIG } from "../../constants/config";

const SEO = ({
  title = "",
  description = APP_CONFIG.description,
  canonical = "",
  image = "",
  type = "website",
  noIndex = false,
}) => {
  const pageTitle = title ? `${title} | ${APP_CONFIG.name}` : APP_CONFIG.name;

  const canonicalUrl = canonical
    ? new URL(canonical, APP_CONFIG.url).href
    : window.location.href;

  const imageUrl = image ? new URL(image, APP_CONFIG.url).href : "";

  useEffect(() => {
    document.title = pageTitle;

    const setMeta = (attribute, key, content) => {
      if (!content) return;

      let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    const setLink = (rel, href) => {
      let element = document.head.querySelector(`link[rel="${rel}"]`);

      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }

      element.setAttribute("href", href);
    };

    // Basic SEO
    setMeta("name", "description", description);
    setMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");

    // Canonical
    setLink("canonical", canonicalUrl);

    // Open Graph
    setMeta("property", "og:title", pageTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:site_name", APP_CONFIG.name);

    if (imageUrl) {
      setMeta("property", "og:image", imageUrl);
    }

    // Twitter
    setMeta(
      "name",
      "twitter:card",
      imageUrl ? "summary_large_image" : "summary",
    );
    setMeta("name", "twitter:title", pageTitle);
    setMeta("name", "twitter:description", description);

    if (imageUrl) {
      setMeta("name", "twitter:image", imageUrl);
    }

    return () => {
      document.title = APP_CONFIG.name;
    };
  }, [pageTitle, description, canonicalUrl, imageUrl, type, noIndex]);

  return null;
};

export default SEO;
