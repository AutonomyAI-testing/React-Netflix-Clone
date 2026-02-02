import React, { useState } from "react";
import KanbanCompound from "../compounds/KanbanCompound";
import FooterCompound from "../compounds/FooterCompound";
import "../components/Kanban/KanbanStyles.css";

function KanbanPage() {
  const [viewMode, setViewMode] = useState("board");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddCard = () => {
    setShowAddForm(true);
  };

  return (
    <>
      <div className="kanban-page-wrapper">
        <div className="kanban-page-header">
          <h1 className="kanban-page-title">Kanban Board</h1>
          <div className="kanban-page-controls">
            <div className="kanban-view-toggle">
              <button
                type="button"
                className={`kanban-view-btn ${
                  viewMode === "board" ? "kanban-view-btn-active" : ""
                }`}
                onClick={() => setViewMode("board")}
                aria-label="Switch to board view"
              >
                Board View
              </button>
              <button
                type="button"
                className={`kanban-view-btn ${
                  viewMode === "list" ? "kanban-view-btn-active" : ""
                }`}
                onClick={() => setViewMode("list")}
                aria-label="Switch to list view"
              >
                List View
              </button>
            </div>
            {viewMode === "list" && (
              <button
                type="button"
                className="kanban-page-add-btn"
                onClick={handleAddCard}
                aria-label="Add new card"
              >
                + Add Card
              </button>
            )}
          </div>
        </div>
        <KanbanCompound
          viewMode={viewMode}
          showAddForm={showAddForm}
          onFormClose={() => setShowAddForm(false)}
        />
      </div>
      <FooterCompound />
    </>
  );
}

export default KanbanPage;
