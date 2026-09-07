import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import ArticleForm from "../components/articles/ArticleForm";
import ArticleEditor from "../components/articles/ArticleEditor";
import ArticlePreview from "../components/articles/ArticlePreview";

import { articles } from "../data/articles";

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const article = articles.find((item) => item.id === id || item._id === id);

  const [content, setContent] = useState(article?.content || "");

  const [loading, setLoading] = useState(false);

  if (!article) {
    return (
      <div className="edit-article-page">
        <div className="edit-article-page__not-found">
          <h1>Article Not Found</h1>

          <p>The article you are trying to edit does not exist.</p>

          <Link to="/admin/articles" className="edit-article-page__back">
            <ArrowLeft size={17} />
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      const updatedArticle = {
        ...article,
        ...formData,
        content,
      };

      // API update integration will be added later.
      console.log("Update article:", updatedArticle);

      navigate("/admin/articles");
    } catch (error) {
      console.error("Failed to update article:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-article-page">
      <div className="edit-article-page__header">
        <div>
          <Link to="/admin/articles" className="edit-article-page__back">
            <ArrowLeft size={17} />
            <span>Back to Articles</span>
          </Link>

          <h1 className="edit-article-page__title">Edit Article</h1>

          <p className="edit-article-page__description">
            Update your article details and content.
          </p>
        </div>
      </div>

      <ArticleForm
        initialValues={article}
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Update Article"
      />

      <section className="edit-article-page__editor-section">
        <div className="edit-article-page__section-header">
          <div>
            <h2>Article Content</h2>

            <p>Update the main content of your article.</p>
          </div>
        </div>

        <ArticleEditor
          value={content}
          onChange={setContent}
          placeholder="Write your article content..."
        />
      </section>

      <section className="edit-article-page__preview-section">
        <div className="edit-article-page__section-header">
          <div>
            <h2>Preview</h2>

            <p>Preview how your article content will appear.</p>
          </div>
        </div>

        <ArticlePreview
          article={{
            ...article,
            content,
          }}
        />
      </section>
    </div>
  );
};

export default EditArticle;
