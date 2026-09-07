
import { useEffect } from "react";
import { X } from "lucide-react";

const Modal = ({
  open = false,
  onClose,
  title = "",
  children,
  size = "md",
  showClose = true,
  closeOnOverlay = true,
  closeOnEscape = true,
  className = "",
}) => {
  useEffect(() => {
    if (!open || !closeOnEscape) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, closeOnEscape, onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  const modalClassName = [
    "modal",
    `modal--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleOverlayClick = (event) => {
    if (
      closeOnOverlay &&
      event.target === event.currentTarget
    ) {
      onClose?.();
    }
  };

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={handleOverlayClick}
    >
      <div
        className={modalClassName}
        role="dialog"
        aria-modal="true"
        aria-label={title || "Modal"}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {(title || showClose) && (
          <header className="modal__header">
            {title && (
              <h2 className="modal__title">
                {title}
              </h2>
            )}

            {showClose && (
              <button
                type="button"
                className="modal__close"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            )}
          </header>
        )}

        <div className="modal__body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
