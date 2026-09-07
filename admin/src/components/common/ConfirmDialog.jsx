
import Modal from "./Modal";
import Button from "./Button";

const ConfirmDialog = ({
  open = false,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  loading = false,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      open={open}
      onClose={loading ? undefined : onCancel}
      title={title}
      size="sm"
    >
      <div className="confirm-dialog">
        <p className="confirm-dialog__message">
          {message}
        </p>

        <div className="confirm-dialog__actions">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            variant={variant}
            loading={loading}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
