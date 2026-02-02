import React from "react";
import "./KanbanStyles.css";

function KanbanCardsContainer({ children, ...restProps }) {
  return (
    <div className="kanban-cards-container" {...restProps}>
      {children}
    </div>
  );
}

export default KanbanCardsContainer;
