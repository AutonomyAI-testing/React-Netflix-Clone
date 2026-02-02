import React, { useState, useEffect } from "react";
import "./KanbanStyles.css";

function KanbanCardForm({
  card,
  columnId,
  onSave,
  onCancel,
  ...restProps
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (card) {
      setTitle(card.title || "");
      setDescription(card.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [card]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSave({
        title: title.trim(),
        description: description.trim(),
        column: card ? card.column : columnId,
      });
    }
  };

  return (
    <form className="kanban-card-form" onSubmit={handleSubmit} {...restProps}>
      <div className="kanban-form-group">
        <label htmlFor="card-title" className="kanban-form-label">
          Title *
          <input
            id="card-title"
            type="text"
            className="kanban-form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter card title"
            required
          />
        </label>
      </div>
      <div className="kanban-form-group">
        <label htmlFor="card-description" className="kanban-form-label">
          Description
          <textarea
            id="card-description"
            className="kanban-form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter card description (optional)"
            rows="3"
          />
        </label>
      </div>
      <div className="kanban-form-actions">
        <button type="submit" className="kanban-form-btn kanban-save-btn">
          {card ? "Update" : "Add"}
          {" "}
          Card
        </button>
        <button
          type="button"
          className="kanban-form-btn kanban-cancel-btn"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default KanbanCardForm;
