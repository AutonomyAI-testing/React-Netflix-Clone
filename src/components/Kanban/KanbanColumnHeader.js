import React from "react";
import "./KanbanStyles.css";

function KanbanColumnHeader({ children, ...restProps }) {
  return (
    <h3 className="kanban-column-header" {...restProps}>
      {children}
    </h3>
  );
}

export default KanbanColumnHeader;
