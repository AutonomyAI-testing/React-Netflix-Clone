import React, { useState } from "react";
import useKanbanData from "../custom-hooks/useKanbanData";
import KanbanBoard from "../components/Kanban/KanbanBoard";
import KanbanColumn from "../components/Kanban/KanbanColumn";
import KanbanColumnHeader from "../components/Kanban/KanbanColumnHeader";
import KanbanCardsContainer from "../components/Kanban/KanbanCardsContainer";
import KanbanCard from "../components/Kanban/KanbanCard";
import KanbanCardForm from "../components/Kanban/KanbanCardForm";
import KanbanDeleteModal from "../components/Kanban/KanbanDeleteModal";
import KanbanListView from "../components/Kanban/KanbanListView";
import KanbanListHeader from "../components/Kanban/KanbanListHeader";
import KanbanListRow from "../components/Kanban/KanbanListRow";

const COLUMNS = {
  todo: { id: "todo", title: "To Do" },
  inProgress: { id: "inProgress", title: "In Progress" },
  done: { id: "done", title: "Done" },
};

function KanbanCompound({
  viewMode = "board",
  showAddForm = false,
  onFormClose,
}) {
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
  const [editingCardId, setEditingCardId] = useState(null);

  // Handle external add form trigger
  React.useEffect(() => {
    if (showAddForm && viewMode === "list" && !activeForm) {
      setActiveForm({ columnId: "todo" });
      if (onFormClose) {
        onFormClose();
      }
    }
  }, [showAddForm, viewMode, activeForm, onFormClose]);

  const handleAddCard = (columnId) => {
    setActiveForm({ columnId });
  };

  const handleEditCard = (card) => {
    if (viewMode === "list") {
      setEditingCardId(card.id);
    } else {
      setActiveForm({ card });
    }
  };

  const handleDeleteCard = (card) => {
    setDeleteModal(card);
  };

  const handleSaveCard = async (cardData) => {
    if (activeForm && activeForm.card) {
      // Update existing card
      await updateCard(activeForm.card.id, {
        title: cardData.title,
        description: cardData.description,
      });
    } else if (editingCardId) {
      // Update card from list view
      await updateCard(editingCardId, {
        title: cardData.title,
        description: cardData.description,
      });
      setEditingCardId(null);
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

  const handleStatusChange = (cardId, newColumn) => {
    moveCard(cardId, newColumn);
  };

  const handleCancelEdit = () => {
    setActiveForm(null);
    setEditingCardId(null);
  };

  const getCardsByColumn = (columnId) => cards.filter((card) => card.column === columnId);

  if (loading) {
    return <div className="kanban-loading">Loading Kanban board...</div>;
  }

  if (error) {
    return (
      <div className="kanban-error">
        Error loading board:
        {' '}
        {error}
      </div>
    );
  }

  // Render list view
  if (viewMode === "list") {
    const editingCard = cards.find((c) => c.id === editingCardId);

    return (
      <>
        {activeForm && activeForm.columnId && (
          <div className="kanban-list-add-form">
            <h3 className="kanban-list-form-title">Add New Card</h3>
            <KanbanCardForm
              columnId={activeForm.columnId}
              onSave={handleSaveCard}
              onCancel={handleCancelEdit}
            />
          </div>
        )}

        <KanbanListView>
          <KanbanListHeader />
          <div className="kanban-list-body">
            {cards.length === 0 && !activeForm ? (
              <div className="kanban-list-empty-state">
                No cards yet. Click &quot;Add Card&quot; to get started!
              </div>
            ) : (
              cards.map((card) => (
                editingCardId === card.id ? (
                  <div key={card.id} className="kanban-list-edit-form">
                    <KanbanCardForm
                      card={editingCard}
                      onSave={handleSaveCard}
                      onCancel={handleCancelEdit}
                    />
                  </div>
                ) : (
                  <KanbanListRow
                    key={card.id}
                    card={card}
                    onEdit={handleEditCard}
                    onDelete={handleDeleteCard}
                    onStatusChange={handleStatusChange}
                  />
                )
              ))
            )}
          </div>
        </KanbanListView>

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

  // Render board view
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
                    onCancel={handleCancelEdit}
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
                        onCancel={handleCancelEdit}
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
