import React from "react";
import KanbanCompound from "../compounds/KanbanCompound";
import FooterCompound from "../compounds/FooterCompound";
import "../components/Kanban/KanbanStyles.css";

function KanbanPage() {
  return (
    <>
      <div className="kanban-page-wrapper">
        <h1 className="kanban-page-title">Kanban Board</h1>
        <KanbanCompound />
      </div>
      <FooterCompound />
    </>
  );
}

export default KanbanPage;
