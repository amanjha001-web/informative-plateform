import { Globe, Search } from "lucide-react";

const SEOPreview = ({
  metaTitle = "",
  metaDescription = "",
  canonicalUrl = "",
  ogTitle = "",
  ogDescription = "",
  ogImage = "",
}) => {
  const displayTitle = metaTitle || "Your page title";

  const displayDescription =
    metaDescription || "Your page description will appear here.";

  const displayUrl = canonicalUrl || "https://example.com/page";

  return (
    <div className="seo-preview">
      {/* Search Preview */}

      <section className="seo-preview__section">
        <div className="seo-preview__section-header">
          <div>
            <h2 className="seo-preview__title">Google Search Preview</h2>

            <p className="seo-preview__description">
              Preview how this page may appear in search results.
            </p>
          </div>

          <Search size={20} aria-hidden="true" />
        </div>

        <div className="seo-preview__google">
          <div className="seo-preview__google-url">{displayUrl}</div>

          <h3 className="seo-preview__google-title">{displayTitle}</h3>

          <p className="seo-preview__google-description">
            {displayDescription}
          </p>
        </div>
      </section>

      {/* Social Preview */}

      <section className="seo-preview__section">
        <div className="seo-preview__section-header">
          <div>
            <h2 className="seo-preview__title">Social Sharing Preview</h2>

            <p className="seo-preview__description">
              Preview the Open Graph information used for social sharing.
            </p>
          </div>

          <Globe size={20} aria-hidden="true" />
        </div>

        <div className="seo-preview__social">
          {ogImage ? (
            <div className="seo-preview__image-wrapper">
              <img
                src={ogImage}
                alt=""
                className="seo-preview__image"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>
          ) : (
            <div className="seo-preview__image-placeholder">
              No preview image
            </div>
          )}

          <div className="seo-preview__social-content">
            <span className="seo-preview__social-domain">{displayUrl}</span>

            <h3 className="seo-preview__social-title">
              {ogTitle || displayTitle}
            </h3>

            <p className="seo-preview__social-description">
              {ogDescription || displayDescription}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SEOPreview;
