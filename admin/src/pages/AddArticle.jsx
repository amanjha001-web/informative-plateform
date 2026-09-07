import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import ArticleForm from "../components/articles/ArticleForm";
import ArticleEditor from "../components/articles/ArticleEditor";

const AddArticle = () => {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      const articleData = {
        ...formData,
        content,
      };

      // API integration will be added later.
      console.log("Create article:", articleData);

      navigate("/admin/articles");
    } catch (error) {
      console.error("Failed to create article:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-article-page">
      <div className="add-article-page__header">
        <div>
          <Link to="/admin/articles" className="add-article-page__back">
            <ArrowLeft size={17} />
            <span>Back to Articles</span>
          </Link>

          <h1 className="add-article-page__title">Add Article</h1>

          <p className="add-article-page__description">
            Create and publish a new article.
          </p>
        </div>
      </div>

      <ArticleForm
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Create Article"
      />

      <section className="add-article-page__editor-section">
        <div className="add-article-page__section-header">
          <div>
            <h2>Article Content</h2>
            <p>Write the main content of your article.</p>
          </div>
        </div>

        <ArticleEditor
          value={content}
          onChange={setContent}
          placeholder="Start writing your article..."
        />
      </section>
    </div>
  );
};

export default AddArticle;
