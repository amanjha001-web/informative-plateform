
import { useEffect } from "react";
import { X } from "lucide-react";

const Drawer = ({
  open = false,
  onClose,
  title = "",
  children,
  position = "right",
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

  const drawerClassName = [
    "drawer",
    `drawer--${position}`,
    `drawer--${size}`,
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
      className="drawer-overlay"
      role="presentation"
      onMouseDown={handleOverlayClick}
    >
      <aside
        className={drawerClassName}
        role="dialog"
        aria-modal="true"
        aria-label={title || "Drawer"}
      >
        {(title || showClose) && (
          <header className="drawer__header">
            {title && (
              <h2 className="drawer__title">
                {title}
              </h2>
            )}

            {showClose && (
              <button
                type="button"
                className="drawer__close"
                onClick={onClose}
                aria-label="Close drawer"
              >
                <X size={20} />
              </button>
            )}
          </header>
        )}

        <div className="drawer__body">
          {children}
        </div>
      </aside>
    </div>
  );
};

export default Drawer;
