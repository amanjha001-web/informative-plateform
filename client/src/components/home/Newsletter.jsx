import { useState } from "react";
import { CheckCircle2, Mail, Send } from "lucide-react";

import Container from "../common/Container";
import Button from "../common/Button";
import Input from "../common/Input";

const Newsletter = ({
  title = "Stay Informed",
  description = "Get the latest articles, useful insights, and important updates delivered directly to your inbox.",
  onSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    setError("");
    setSuccess(false);

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      if (onSubmit) {
        await onSubmit(trimmedEmail);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      setSuccess(true);
      setEmail("");
    } catch (submitError) {
      setError(
        submitError?.message ||
          "Unable to subscribe right now. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--secondary))]/50 px-6 py-12 sm:px-10 md:px-16 md:py-14">
          {/* Decorative Elements */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[rgb(var(--primary))]/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[rgb(var(--primary))]/5 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">
            {/* Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]">
              <Mail size={26} strokeWidth={1.8} />
            </div>

            {/* Content */}
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-[rgb(var(--foreground))] sm:text-3xl">
              {title}
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[rgb(var(--muted-foreground))] sm:text-base">
              {description}
            </p>

            {/* Form */}
            {!success ? (
              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-7 max-w-xl"
                noValidate
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                  <Input
                    name="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (error) setError("");
                    }}
                    placeholder="Enter your email address"
                    error={error}
                    startIcon={<Mail size={18} />}
                    className="flex-1 text-left"
                    disabled={loading}
                    autoComplete="email"
                    aria-label="Email address"
                  />

                  <Button
                    type="submit"
                    size="lg"
                    loading={loading}
                    className="shrink-0 sm:mt-0"
                  >
                    {!loading && <Send size={17} />}
                    Subscribe
                  </Button>
                </div>
              </form>
            ) : (
              <div className="mx-auto mt-7 flex max-w-xl items-center justify-center gap-2 rounded-xl border border-[rgb(var(--success))]/20 bg-[rgb(var(--success))]/10 px-4 py-3 text-sm font-medium text-[rgb(var(--success))]">
                <CheckCircle2 size={18} />
                You're subscribed successfully!
              </div>
            )}

            <p className="mt-4 text-xs text-[rgb(var(--muted-foreground))]">
              No spam. You can unsubscribe anytime.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Newsletter;
