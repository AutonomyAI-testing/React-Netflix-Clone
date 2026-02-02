import React from "react";
import "./KanbanStyles.css";

function KanbanListView({ children, ...restProps }) {
  return (
    <div className="kanban-list-view-wrapper" {...restProps}>
      {children}
    </div>
  );
}

export default KanbanListView;
