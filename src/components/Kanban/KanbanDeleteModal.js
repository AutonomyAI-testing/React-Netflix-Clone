import React from "react";
import "./KanbanStyles.css";

function KanbanDeleteModal({
  card,
  onConfirm,
  onCancel,
  ...restProps
}) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      className="kanban-modal-overlay"
      onClick={handleOverlayClick}
      {...restProps}
    >
      <div className="kanban-modal-content">
        <h3 className="kanban-modal-title">Delete Card?</h3>
        <p className="kanban-modal-message">
          Are you sure you want to delete
          {' '}
          &quot;
          {card.title}
          &quot;? This action cannot be undone.
        </p>
        <div className="kanban-modal-actions">
          <button
            type="button"
            className="kanban-modal-btn kanban-confirm-btn"
            onClick={onConfirm}
          >
            Delete
          </button>
          <button
            type="button"
            className="kanban-modal-btn kanban-modal-cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default KanbanDeleteModal;
