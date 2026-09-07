import { ArrowLeft, Eye, Save } from "lucide-react";

import Button from "../common/Button";
import PageForm from "./PageForm";

const PageEditor = ({
  initialValues = {},
  onSubmit,
  onPreview,
  onBack,
  loading = false,
  submitLabel = "Save Page",
}) => {
  return (
    <div className="page-editor">
      <div className="page-editor__header">
        <div className="page-editor__heading">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            icon={ArrowLeft}
            onClick={onBack}
            aria-label="Back to pages"
          />

          <div>
            <h1 className="page-editor__title">
              {initialValues?.id ? "Edit Page" : "Create Page"}
            </h1>

            <p className="page-editor__description">
              Create and manage page content, metadata and publishing settings.
            </p>
          </div>
        </div>

        <div className="page-editor__actions">
          {onPreview && (
            <Button
              type="button"
              variant="secondary"
              icon={Eye}
              onClick={onPreview}
            >
              Preview
            </Button>
          )}

          <Button type="submit" form="page-form" loading={loading} icon={Save}>
            {submitLabel}
          </Button>
        </div>
      </div>

      <div className="page-editor__content">
        <PageForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          loading={loading}
          formId="page-form"
        />
      </div>
    </div>
  );
};

export default PageEditor;
