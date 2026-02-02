import React from "react";
import "./KanbanStyles.css";

function KanbanListHeader({ ...restProps }) {
  return (
    <div className="kanban-list-header" {...restProps}>
      <div className="kanban-list-header-cell kanban-list-header-title">Title</div>
      <div className="kanban-list-header-cell kanban-list-header-description">Description</div>
      <div className="kanban-list-header-cell kanban-list-header-status">Status</div>
      <div className="kanban-list-header-cell kanban-list-header-actions">Actions</div>
    </div>
  );
}

export default KanbanListHeader;
