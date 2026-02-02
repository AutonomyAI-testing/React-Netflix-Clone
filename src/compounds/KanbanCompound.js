import React, { useState } from "react";
import useKanbanData from "../custom-hooks/useKanbanData";
import KanbanBoard from "../components/Kanban/KanbanBoard";
import KanbanColumn from "../components/Kanban/KanbanColumn";
import KanbanColumnHeader from "../components/Kanban/KanbanColumnHeader";
import KanbanCardsContainer from "../components/Kanban/KanbanCardsContainer";
import KanbanCard from "../components/Kanban/KanbanCard";
import KanbanCardForm from "../components/Kanban/KanbanCardForm";
import KanbanDeleteModal from "../components/Kanban/KanbanDeleteModal";

const COLUMNS = {
  todo: { id: "todo", title: "To Do" },
  inProgress: { id: "inProgress", title: "In Progress" },
  done: { id: "done", title: "Done" },
};

function KanbanCompound() {
  const {
    cards,
    loading,
    error,
    addCard,
    updateCard,
    deleteCard,
    moveCard,
  } = useKanbanData();

  const [activeForm, setActiveForm] = useState(null); // { columnId: 'todo' } or { card: {...} }
  const [deleteModal, setDeleteModal] = useState(null);

  const handleAddCard = (columnId) => {
    setActiveForm({ columnId });
  };

  const handleEditCard = (card) => {
    setActiveForm({ card });
  };

  const handleDeleteCard = (card) => {
    setDeleteModal(card);
  };

  const handleSaveCard = async (cardData) => {
    if (activeForm.card) {
      // Update existing card
      await updateCard(activeForm.card.id, {
        title: cardData.title,
        description: cardData.description,
      });
    } else {
      // Add new card
      await addCard(cardData);
    }
    setActiveForm(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteModal) {
      await deleteCard(deleteModal.id);
      setDeleteModal(null);
    }
  };

  const handleDrop = (e, targetColumn) => {
    const cardId = e.dataTransfer.getData("cardId");
    if (cardId) {
      moveCard(cardId, targetColumn);
    }
  };

  const getCardsByColumn = (columnId) => cards.filter((card) => card.column === columnId);

  if (loading) {
    return <div className="kanban-loading">Loading Kanban board...</div>;
  }

  if (error) {
    return (
      <div className="kanban-error">
        Error loading board:
        {" "}
        {error}
      </div>
    );
  }

  return (
    <>
      <KanbanBoard>
        {Object.values(COLUMNS).map((column) => {
          const columnCards = getCardsByColumn(column.id);
          const showForm =
            activeForm &&
            ((activeForm.columnId === column.id && !activeForm.card) ||
              (activeForm.card && activeForm.card.column === column.id));

          return (
            <KanbanColumn
              key={column.id}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <KanbanColumnHeader>{column.title}</KanbanColumnHeader>

              <KanbanCardsContainer>
                {showForm && activeForm.columnId === column.id && (
                  <KanbanCardForm
                    columnId={column.id}
                    onSave={handleSaveCard}
                    onCancel={() => setActiveForm(null)}
                  />
                )}

                {columnCards.length === 0 && !showForm && (
                  <div className="kanban-empty-state">
                    No cards yet. Add one to get started!
                  </div>
                )}

                {columnCards.map((card) => (
                  <React.Fragment key={card.id}>
                    {showForm && activeForm.card && activeForm.card.id === card.id ? (
                      <KanbanCardForm
                        card={card}
                        onSave={handleSaveCard}
                        onCancel={() => setActiveForm(null)}
                      />
                    ) : (
                      <KanbanCard
                        card={card}
                        onEdit={handleEditCard}
                        onDelete={handleDeleteCard}
                      />
                    )}
                  </React.Fragment>
                ))}
              </KanbanCardsContainer>

              {!showForm && (
                <button
                  type="button"
                  className="kanban-add-button"
                  onClick={() => handleAddCard(column.id)}
                >
                  + Add Card
                </button>
              )}
            </KanbanColumn>
          );
        })}
      </KanbanBoard>

      {deleteModal && (
        <KanbanDeleteModal
          card={deleteModal}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteModal(null)}
        />
      )}
    </>
  );
}

export default KanbanCompound;
