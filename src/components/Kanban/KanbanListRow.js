import React from "react";
import "./KanbanStyles.css";

const COLUMN_LABELS = {
  todo: "To Do",
  inProgress: "In Progress",
  done: "Done",
};

function KanbanListRow({
  card,
  onEdit,
  onDelete,
  onStatusChange,
  ...restProps
}) {
  const handleStatusChange = (e) => {
    if (onStatusChange) {
      onStatusChange(card.id, e.target.value);
    }
  };

  return (
    <div className="kanban-list-row" {...restProps}>
      <div className="kanban-list-cell kanban-list-cell-title">{card.title}</div>
      <div className="kanban-list-cell kanban-list-cell-description">
        {card.description || "-"}
      </div>
      <div className="kanban-list-cell kanban-list-cell-status">
        <select
          className="kanban-status-select"
          value={card.column}
          onChange={handleStatusChange}
          aria-label="Change status"
        >
          <option value="todo">{COLUMN_LABELS.todo}</option>
          <option value="inProgress">{COLUMN_LABELS.inProgress}</option>
          <option value="done">{COLUMN_LABELS.done}</option>
        </select>
      </div>
      <div className="kanban-list-cell kanban-list-cell-actions">
        <button
          type="button"
          className="kanban-list-btn kanban-list-edit-btn"
          onClick={() => onEdit(card)}
          aria-label="Edit card"
        >
          Edit
        </button>
        <button
          type="button"
          className="kanban-list-btn kanban-list-delete-btn"
          onClick={() => onDelete(card)}
          aria-label="Delete card"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default KanbanListRow;
