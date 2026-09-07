import { useState } from "react";
import { Save } from "lucide-react";

import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Select from "../common/Select";
import Button from "../common/Button";

const DEFAULT_VALUES = {
  question: "",
  answer: "",
  category: "",
  status: "active",
};

const FAQForm = ({
  initialValues = {},
  onSubmit,
  loading = false,
  submitLabel = "Save FAQ",
}) => {
  const [formData, setFormData] = useState(() => ({
    ...DEFAULT_VALUES,
    ...initialValues,
  }));

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.question.trim()) {
      newErrors.question = "Question is required.";
    }

    if (!formData.answer.trim()) {
      newErrors.answer = "Answer is required.";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required.";
    }

    if (!formData.status) {
      newErrors.status = "Status is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit?.(formData);
  };

  return (
    <form className="faq-form" onSubmit={handleSubmit} noValidate>
      <div className="faq-form__fields">
        <Input
          label="Question"
          name="question"
          value={formData.question}
          onChange={handleChange}
          placeholder="Enter frequently asked question"
          error={errors.question}
          required
        />

        <Textarea
          label="Answer"
          name="answer"
          value={formData.answer}
          onChange={handleChange}
          placeholder="Enter the answer..."
          rows={7}
          error={errors.answer}
          required
        />

        <Input
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g. General, Account, Articles"
          error={errors.category}
          required
        />

        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            {
              value: "active",
              label: "Active",
            },
            {
              value: "inactive",
              label: "Inactive",
            },
          ]}
          error={errors.status}
          required
        />
      </div>

      <div className="faq-form__actions">
        <Button type="submit" loading={loading} icon={Save}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default FAQForm;
