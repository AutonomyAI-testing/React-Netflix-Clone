import React from "react";
import "./KanbanStyles.css";

function KanbanColumn({
  children,
  onDrop,
  onDragOver,
  ...restProps
}) {
  const handleDragOver = (e) => {
    e.preventDefault();
    if (onDragOver) {
      onDragOver(e);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (onDrop) {
      onDrop(e);
    }
  };

  return (
    <div
      className="kanban-column-wrapper"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      {...restProps}
    >
      {children}
    </div>
  );
}

export default KanbanColumn;
