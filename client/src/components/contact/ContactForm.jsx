import { useState } from "react";

import Input from "../common/Input";
import Button from "../common/Button";

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactForm = ({ onSubmit, className = "" }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

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

    if (status.message) {
      setStatus({
        type: "",
        message: "",
      });
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Name is required.";
    } else if (formData.name.trim().length < 2) {
      nextErrors.name = "Name must be at least 2 characters.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      nextErrors.subject = "Subject is required.";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      nextErrors.message = "Message must be at least 10 characters.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setStatus({
      type: "",
      message: "",
    });

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setFormData(INITIAL_FORM);

      setStatus({
        type: "success",
        message:
          "Your message has been sent successfully. We will get back to you soon.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={[
        "rounded-2xl border",
        "border-[rgb(var(--border))]",
        "bg-[rgb(var(--card))]",
        "p-5 shadow-sm sm:p-6 md:p-8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          error={errors.name}
          disabled={loading}
          required
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          error={errors.email}
          disabled={loading}
          required
        />
      </div>

      <div className="mt-5">
        <Input
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="How can we help?"
          error={errors.subject}
          disabled={loading}
          required
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-message"
          className="mb-2 block text-sm font-medium text-[rgb(var(--foreground))]"
        >
          Message
          <span className="ml-1 text-[rgb(var(--danger))]">*</span>
        </label>

        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message..."
          rows={6}
          disabled={loading}
          className={[
            "w-full resize-y rounded-xl border px-4 py-3",
            "bg-[rgb(var(--background))]",
            "text-sm text-[rgb(var(--foreground))]",
            "placeholder:text-[rgb(var(--muted-foreground))]",
            "outline-none transition-all duration-200",
            errors.message
              ? "border-[rgb(var(--danger))]"
              : "border-[rgb(var(--border))] focus:border-[rgb(var(--primary))]",
            "focus:ring-2 focus:ring-[rgb(var(--primary))]/10",
            "disabled:cursor-not-allowed disabled:opacity-60",
          ].join(" ")}
        />

        {errors.message && (
          <p className="mt-1.5 text-xs text-[rgb(var(--danger))]">
            {errors.message}
          </p>
        )}
      </div>

      {status.message && (
        <div
          role="alert"
          className={[
            "mt-5 rounded-xl border px-4 py-3 text-sm",
            status.type === "success"
              ? "border-[rgb(var(--success))]/30 bg-[rgb(var(--success))]/10 text-[rgb(var(--success))]"
              : "border-[rgb(var(--danger))]/30 bg-[rgb(var(--danger))]/10 text-[rgb(var(--danger))]",
          ].join(" ")}
        >
          {status.message}
        </div>
      )}

      <div className="mt-6">
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          Send Message
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
