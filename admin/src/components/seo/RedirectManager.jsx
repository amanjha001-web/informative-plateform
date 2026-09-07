import { useState } from "react";
import { ArrowRight, Edit, Plus, Trash2 } from "lucide-react";

import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";
import EmptyState from "../common/EmptyState";
import ConfirmDialog from "../common/ConfirmDialog";

const REDIRECT_TYPES = [
  {
    value: "301",
    label: "301 - Permanent",
  },
  {
    value: "302",
    label: "302 - Temporary",
  },
  {
    value: "307",
    label: "307 - Temporary",
  },
];

const RedirectManager = ({
  redirects = [],
  onCreate,
  onUpdate,
  onDelete,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    type: "301",
  });

  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [deleteId, setDeleteId] = useState(null);

  const resetForm = () => {
    setFormData({
      source: "",
      destination: "",
      type: "301",
    });

    setEditingId(null);
    setErrors({});
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.source.trim()) {
      nextErrors.source = "Source URL is required.";
    }

    if (!formData.destination.trim()) {
      nextErrors.destination = "Destination URL is required.";
    }

    if (formData.source && !formData.source.startsWith("/")) {
      nextErrors.source = "Source must start with '/'.";
    }

    if (
      formData.destination &&
      !(
        formData.destination.startsWith("/") ||
        /^https?:\/\/.+/i.test(formData.destination)
      )
    ) {
      nextErrors.destination = "Enter a valid path or URL.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const payload = {
      ...formData,
      source: formData.source.trim(),
      destination: formData.destination.trim(),
    };

    if (editingId) {
      onUpdate?.(editingId, payload);
    } else {
      onCreate?.(payload);
    }

    resetForm();
  };

  const handleEdit = (redirect) => {
    setEditingId(redirect.id);

    setFormData({
      source: redirect.source || "",
      destination: redirect.destination || "",
      type: redirect.type || "301",
    });

    setErrors({});
  };

  const handleDelete = () => {
    if (!deleteId) {
      return;
    }

    onDelete?.(deleteId);
    setDeleteId(null);
  };

  return (
    <div className="redirect-manager">
      <div className="redirect-manager__header">
        <div>
          <h2 className="redirect-manager__title">URL Redirects</h2>

          <p className="redirect-manager__description">
            Manage redirects to prevent broken links and preserve SEO value.
          </p>
        </div>

        {editingId && (
          <Button type="button" variant="secondary" onClick={resetForm}>
            Cancel Edit
          </Button>
        )}
      </div>

      <form
        className="redirect-manager__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          label="Source Path"
          name="source"
          value={formData.source}
          onChange={handleChange}
          error={errors.source}
          placeholder="/old-page"
          helperText="Example: /old-page"
          required
        />

        <Input
          label="Destination"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          error={errors.destination}
          placeholder="/new-page"
          helperText="Internal path or full URL."
          required
        />

        <Select
          label="Redirect Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          options={REDIRECT_TYPES}
        />

        <div className="redirect-manager__form-action">
          <Button
            type="submit"
            loading={loading}
            icon={editingId ? Edit : Plus}
          >
            {editingId ? "Update Redirect" : "Add Redirect"}
          </Button>
        </div>
      </form>

      <div className="redirect-manager__list">
        {redirects.length === 0 ? (
          <EmptyState
            title="No redirects found"
            description="Create a redirect to manage an old or moved URL."
            icon={ArrowRight}
          />
        ) : (
          <div className="redirect-manager__table-wrapper">
            <table className="redirect-manager__table">
              <thead>
                <tr>
                  <th>Source</th>
                  <th></th>
                  <th>Destination</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {redirects.map((redirect) => (
                  <tr key={redirect.id}>
                    <td>
                      <code>{redirect.source}</code>
                    </td>

                    <td className="redirect-manager__arrow">
                      <ArrowRight size={16} aria-hidden="true" />
                    </td>

                    <td>
                      <code>{redirect.destination}</code>
                    </td>

                    <td>
                      <span className="redirect-manager__type">
                        {redirect.type}
                      </span>
                    </td>

                    <td>
                      <div className="redirect-manager__actions">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          icon={Edit}
                          onClick={() => handleEdit(redirect)}
                          aria-label={`Edit redirect from ${redirect.source}`}
                        />

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          icon={Trash2}
                          onClick={() => setDeleteId(redirect.id)}
                          aria-label={`Delete redirect from ${redirect.source}`}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete Redirect"
        description="Are you sure you want to delete this redirect? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default RedirectManager;
