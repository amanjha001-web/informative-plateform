import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import FAQForm from "../components/faq/FAQForm";
import FAQTable from "../components/faq/FAQTable";

import Modal from "../components/common/Modal";
import ConfirmDialog from "../components/common/ConfirmDialog";
import SearchInput from "../components/common/SearchInput";

const INITIAL_FAQS = [
  {
    id: "faq-001",
    question: "What is this platform?",
    answer:
      "This platform provides informative articles, guides and resources across multiple topics.",
    category: "General",
    status: "active",
    createdAt: "01 Sep 2026",
    updatedAt: "05 Sep 2026",
  },
  {
    id: "faq-002",
    question: "How can I contact support?",
    answer:
      "You can contact our support team through the enquiry section or the official contact form.",
    category: "Support",
    status: "active",
    createdAt: "02 Sep 2026",
    updatedAt: "05 Sep 2026",
  },
  {
    id: "faq-003",
    question: "Can I contribute an article?",
    answer:
      "Yes. Contributors can contact the editorial team to discuss article submissions and publishing guidelines.",
    category: "Articles",
    status: "active",
    createdAt: "03 Sep 2026",
    updatedAt: "06 Sep 2026",
  },
  {
    id: "faq-004",
    question: "How do I create an account?",
    answer:
      "Select the registration option and provide the required account information to create your account.",
    category: "Account",
    status: "active",
    createdAt: "04 Sep 2026",
    updatedAt: "06 Sep 2026",
  },
  {
    id: "faq-005",
    question: "Can I suggest a new topic?",
    answer:
      "Yes. You can submit topic suggestions through the enquiry or contact section.",
    category: "General",
    status: "inactive",
    createdAt: "05 Sep 2026",
    updatedAt: "06 Sep 2026",
  },
];

const FAQ = () => {
  const [faqs, setFaqs] = useState(INITIAL_FAQS);

  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);

  const [editingFAQ, setEditingFAQ] = useState(null);

  const [deleteFAQ, setDeleteFAQ] = useState(null);

  const [loading, setLoading] = useState(false);

  const filteredFAQs = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return faqs;
    }

    return faqs.filter((faq) => {
      const question = (faq.question || "").toLowerCase();

      const answer = (faq.answer || "").toLowerCase();

      const category = (faq.category || "").toLowerCase();

      return (
        question.includes(query) ||
        answer.includes(query) ||
        category.includes(query)
      );
    });
  }, [faqs, search]);

  const handleAdd = () => {
    setEditingFAQ(null);
    setFormOpen(true);
  };

  const handleEdit = (faq) => {
    setEditingFAQ(faq);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingFAQ(null);
  };

  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      if (editingFAQ) {
        const editingId = editingFAQ.id || editingFAQ._id;

        setFaqs((current) =>
          current.map((faq) => {
            const faqId = faq.id || faq._id;

            return faqId === editingId
              ? {
                  ...faq,
                  ...formData,
                  updatedAt: new Date().toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }),
                }
              : faq;
          }),
        );
      } else {
        const newFAQ = {
          id: `faq-${Date.now()}`,
          ...formData,
          createdAt: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          updatedAt: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        };

        setFaqs((current) => [newFAQ, ...current]);
      }

      handleCloseForm();
    } catch (error) {
      console.error("Failed to save FAQ:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRequest = (faq) => {
    setDeleteFAQ(faq);
  };

  const handleDeleteConfirm = () => {
    if (!deleteFAQ) {
      return;
    }

    const deleteId = deleteFAQ.id || deleteFAQ._id;

    setFaqs((current) =>
      current.filter((faq) => (faq.id || faq._id) !== deleteId),
    );

    setDeleteFAQ(null);
  };

  return (
    <div className="faq-page">
      <div className="faq-page__header">
        <div>
          <h1 className="faq-page__title">FAQ</h1>

          <p className="faq-page__description">
            Manage frequently asked questions and provide useful information to
            users.
          </p>
        </div>

        <button
          type="button"
          className="faq-page__add-button"
          onClick={handleAdd}
        >
          <Plus size={18} />
          <span>Add FAQ</span>
        </button>
      </div>

      <section className="faq-page__content">
        <div className="faq-page__toolbar">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search FAQs..."
          />

          <div className="faq-page__count">
            {filteredFAQs.length} {filteredFAQs.length === 1 ? "FAQ" : "FAQs"}{" "}
            found
          </div>
        </div>

        <FAQTable
          faqs={filteredFAQs}
          onEdit={handleEdit}
          onDelete={handleDeleteRequest}
        />
      </section>

      <Modal
        open={formOpen}
        onClose={handleCloseForm}
        title={editingFAQ ? "Edit FAQ" : "Add FAQ"}
      >
        <FAQForm
          initialValues={editingFAQ || {}}
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel={editingFAQ ? "Update FAQ" : "Create FAQ"}
        />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteFAQ)}
        title="Delete FAQ"
        description={
          deleteFAQ
            ? `Are you sure you want to delete "${deleteFAQ.question}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteFAQ(null)}
      />
    </div>
  );
};

export default FAQ;
