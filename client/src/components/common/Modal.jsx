import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const SIZE_CLASSES = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[95vw]",
};

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  footer,
  className = "",
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape" && closeOnEscape) {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4"
      role="presentation"
      onMouseDown={handleOverlayClick}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        aria-describedby={description ? "modal-description" : undefined}
        className={[
          "relative z-10 w-full overflow-hidden rounded-2xl",
          "border border-[rgb(var(--border))]",
          "bg-[rgb(var(--background))]",
          "text-[rgb(var(--foreground))]",
          "shadow-2xl",
          "animate-in fade-in zoom-in-95 duration-200",
          SIZE_CLASSES[size] || SIZE_CLASSES.md,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between gap-4 border-b border-[rgb(var(--border))] px-5 py-4">
            <div>
              {title && (
                <h2 id="modal-title" className="text-lg font-semibold">
                  {title}
                </h2>
              )}

              {description && (
                <p
                  id="modal-description"
                  className="mt-1 text-sm text-[rgb(var(--muted-foreground))]"
                >
                  {description}
                </p>
              )}
            </div>

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="rounded-lg p-2 text-[rgb(var(--muted-foreground))] transition-colors hover:bg-[rgb(var(--secondary))] hover:text-[rgb(var(--foreground))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))]"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        <div className="max-h-[70vh] overflow-y-auto px-5 py-5">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-[rgb(var(--border))] px-5 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
