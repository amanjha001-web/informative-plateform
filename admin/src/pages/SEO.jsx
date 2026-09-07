import { useState } from "react";
import { Eye, Globe, Settings2 } from "lucide-react";

import SEOForm from "../components/seo/SEOForm";
import SEOPreview from "../components/seo/SEOPreview";
import RedirectManager from "../components/seo/RedirectManager";

const INITIAL_SEO = {
  pageTitle: "Home",
  metaTitle: "Informative Platform | Latest Information",
  metaDescription:
    "Get the latest informative articles, guides and useful information.",
  metaKeywords: "information, articles, guides, informative platform",
  canonicalUrl: "https://example.com/",
  robots: "index,follow",
  ogTitle: "Informative Platform",
  ogDescription: "Explore useful articles, guides and informative content.",
  ogImage: "",
  twitterTitle: "Informative Platform",
  twitterDescription:
    "Explore useful articles, guides and informative content.",
  twitterImage: "",
};

const INITIAL_REDIRECTS = [
  {
    id: 1,
    source: "/old-home",
    destination: "/",
    type: "301",
  },
  {
    id: 2,
    source: "/about-us-old",
    destination: "/about",
    type: "301",
  },
];

const SEO = () => {
  const [seoData, setSeoData] = useState(INITIAL_SEO);

  const [redirects, setRedirects] = useState(INITIAL_REDIRECTS);

  const [activeTab, setActiveTab] = useState("settings");

  const [saved, setSaved] = useState(false);

  const handleSaveSEO = (data) => {
    setSeoData(data);
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleCreateRedirect = (redirect) => {
    setRedirects((current) => [
      ...current,
      {
        ...redirect,
        id: Date.now(),
      },
    ]);
  };

  const handleUpdateRedirect = (id, redirect) => {
    setRedirects((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              ...redirect,
            }
          : item,
      ),
    );
  };

  const handleDeleteRedirect = (id) => {
    setRedirects((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div className="seo-page">
      <div className="seo-page__header">
        <div>
          <h1 className="seo-page__title">SEO Management</h1>

          <p className="seo-page__description">
            Manage search engine metadata, social previews and URL redirects.
          </p>
        </div>

        {saved && (
          <div className="seo-page__saved" role="status">
            SEO settings saved successfully.
          </div>
        )}
      </div>

      <div className="seo-page__tabs">
        <button
          type="button"
          className={`seo-page__tab ${
            activeTab === "settings" ? "seo-page__tab--active" : ""
          }`}
          onClick={() => setActiveTab("settings")}
        >
          <Settings2 size={18} aria-hidden="true" />
          SEO Settings
        </button>

        <button
          type="button"
          className={`seo-page__tab ${
            activeTab === "preview" ? "seo-page__tab--active" : ""
          }`}
          onClick={() => setActiveTab("preview")}
        >
          <Eye size={18} aria-hidden="true" />
          Preview
        </button>

        <button
          type="button"
          className={`seo-page__tab ${
            activeTab === "redirects" ? "seo-page__tab--active" : ""
          }`}
          onClick={() => setActiveTab("redirects")}
        >
          <Globe size={18} aria-hidden="true" />
          Redirects
        </button>
      </div>

      <div className="seo-page__content">
        {activeTab === "settings" && (
          <SEOForm initialValues={seoData} onSubmit={handleSaveSEO} />
        )}

        {activeTab === "preview" && (
          <SEOPreview
            metaTitle={seoData.metaTitle}
            metaDescription={seoData.metaDescription}
            canonicalUrl={seoData.canonicalUrl}
            ogTitle={seoData.ogTitle}
            ogDescription={seoData.ogDescription}
            ogImage={seoData.ogImage}
          />
        )}

        {activeTab === "redirects" && (
          <RedirectManager
            redirects={redirects}
            onCreate={handleCreateRedirect}
            onUpdate={handleUpdateRedirect}
            onDelete={handleDeleteRedirect}
          />
        )}
      </div>
    </div>
  );
};

export default SEO;
