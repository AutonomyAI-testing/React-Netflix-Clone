import React from "react";
import "./KanbanStyles.css";

function KanbanCard({
  card,
  onEdit,
  onDelete,
  onDragStart,
  ...restProps
}) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("cardId", card.id);
    if (onDragStart) {
      onDragStart(e, card);
    }
  };

  return (
    <div
      className="kanban-card-wrapper"
      draggable
      onDragStart={handleDragStart}
      {...restProps}
    >
      <h4 className="kanban-card-title">{card.title}</h4>
      {card.description && (
        <p className="kanban-card-description">{card.description}</p>
      )}
      <div className="kanban-card-actions">
        <button
          type="button"
          className="kanban-card-btn kanban-edit-btn"
          onClick={() => onEdit(card)}
          aria-label="Edit card"
        >
          Edit
        </button>
        <button
          type="button"
          className="kanban-card-btn kanban-delete-btn"
          onClick={() => onDelete(card)}
          aria-label="Delete card"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default KanbanCard;
