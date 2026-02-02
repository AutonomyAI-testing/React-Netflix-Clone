import React from "react";
import "./KanbanStyles.css";

function KanbanBoard({ children, ...restProps }) {
  return (
    <div className="kanban-board-wrapper" {...restProps}>
      {children}
    </div>
  );
}

export default KanbanBoard;
