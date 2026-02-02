import { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../context/FirbaseContext";

function useKanbanData() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("kanban")
      .orderBy("order")
      .onSnapshot(
        (snapshot) => {
          const allCards = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setCards(allCards);
          setLoading(false);
        },
        (err) => {
          console.error(err.message);
          setError(err.message);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, [firebase]);

  const addCard = async (cardData) => {
    try {
      const order = cards.filter((c) => c.column === cardData.column).length;
      await firebase
        .firestore()
        .collection("kanban")
        .add({
          ...cardData,
          order,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
    } catch (err) {
      console.error("Error adding card:", err.message);
      setError(err.message);
    }
  };

  const updateCard = async (cardId, updates) => {
    try {
      await firebase
        .firestore()
        .collection("kanban")
        .doc(cardId)
        .update(updates);
    } catch (err) {
      console.error("Error updating card:", err.message);
      setError(err.message);
    }
  };

  const deleteCard = async (cardId) => {
    try {
      await firebase.firestore().collection("kanban").doc(cardId).delete();
    } catch (err) {
      console.error("Error deleting card:", err.message);
      setError(err.message);
    }
  };

  const moveCard = async (cardId, newColumn) => {
    try {
      await firebase
        .firestore()
        .collection("kanban")
        .doc(cardId)
        .update({ column: newColumn });
    } catch (err) {
      console.error("Error moving card:", err.message);
      setError(err.message);
    }
  };

  return {
    cards,
    loading,
    error,
    addCard,
    updateCard,
    deleteCard,
    moveCard,
  };
}

export default useKanbanData;
