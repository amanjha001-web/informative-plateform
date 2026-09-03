import {
  FaCheck,
  FaCopy,
  FaFacebook,
  FaLinkedin,
  FaShareAlt,
} from "react-icons/fa";
import { useState } from "react";

const ShareArticle = ({ article, className = "" }) => {
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  if (!article) return null;

  const getArticleUrl = () => {
    if (typeof window === "undefined") return "";

    return `${window.location.origin}/articles/${article.slug}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getArticleUrl());

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleNativeShare = async () => {
    const url = getArticleUrl();

    if (!navigator.share) {
      await handleCopy();
      return;
    }

    try {
      setSharing(true);

      await navigator.share({
        title: article.title,
        text: article.excerpt || article.title,
        url,
      });
    } catch (error) {
      if (error?.name !== "AbortError") {
        await handleCopy();
      }
    } finally {
      setSharing(false);
    }
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(getArticleUrl());

    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleLinkedInShare = () => {
    const url = encodeURIComponent(getArticleUrl());

    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div
      className={[
        "flex flex-col gap-4 rounded-2xl border",
        "border-[rgb(var(--border))]",
        "bg-[rgb(var(--card))]",
        "p-5 sm:flex-row sm:items-center sm:justify-between",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Heading */}
      <div>
        <div className="flex items-center gap-2">
          <FaShareAlt size={18} className="text-[rgb(var(--primary))]" />

          <h2 className="text-sm font-semibold text-[rgb(var(--foreground))]">
            Share this article
          </h2>
        </div>

        <p className="mt-1 text-xs text-[rgb(var(--muted-foreground))]">
          Found this useful? Share it with others.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleNativeShare}
          disabled={sharing}
          aria-label="Share article"
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-[rgb(var(--primary))] px-3 text-xs font-medium text-[rgb(var(--primary-foreground))] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FaShareAlt size={15} />
          {sharing ? "Sharing..." : "Share"}
        </button>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy article link"
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 text-xs font-medium text-[rgb(var(--foreground))] transition-colors hover:bg-[rgb(var(--secondary))]"
        >
          {copied ? (
            <>
              <FaCheck size={15} />
              Copied
            </>
          ) : (
            <>
              <FaCopy size={15} />
              Copy Link
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleFacebookShare}
          aria-label="Share on Facebook"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] text-[rgb(var(--muted-foreground))] transition-colors hover:bg-[rgb(var(--secondary))] hover:text-[rgb(var(--foreground))]"
        >
          <FaFacebook size={16} />
        </button>

        <button
          type="button"
          onClick={handleLinkedInShare}
          aria-label="Share on LinkedIn"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] text-[rgb(var(--muted-foreground))] transition-colors hover:bg-[rgb(var(--secondary))] hover:text-[rgb(var(--foreground))]"
        >
          <FaLinkedin size={16} />
        </button>
      </div>
    </div>
  );
};

export default ShareArticle;
