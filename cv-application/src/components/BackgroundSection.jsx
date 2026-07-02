import { useState } from "react";

function BackgroundSection({
  title,
  ItemComponent,
  initialItem,
  backgroundHistory,
  setBackgroundHistory,
}) {
  const [editingItemId, setEditingItemId] = useState(null);

  function handleChange(fieldName, value, id) {
    setBackgroundHistory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [fieldName]: value } : item,
      ),
    );
  }

  function handleAddItem() {
    const newItemId = crypto.randomUUID();
    const newBackgroundInfo = { ...initialItem, id: newItemId };
    setEditingItemId(newItemId);
    setBackgroundHistory((prev) => [...prev, newBackgroundInfo]);
  }

  function handleDeleteItem(id) {
    setBackgroundHistory((prev) => prev.filter((item) => item.id !== id));
  }

  const toggleItemEditMode = function (itemId) {
    setEditingItemId((prevId) => (prevId === itemId ? null : itemId));
  };

  return (
    <section className="flex-column gap-1rem">
      <h2>{title}</h2>
      <div className="history-records-list flex-column gap-6">
        {
        backgroundHistory.map((info) => (
          <ItemComponent
            info={info}
            key={info.id}
            isEditing={editingItemId === info.id}
            toggleEditMode={() => toggleItemEditMode(info.id)}
            handleChange={(fieldName, value) =>
              handleChange(fieldName, value, info.id)
            }
            handleDeleteItem={() => handleDeleteItem(info.id)}
          />
        ))}
      </div>
      <button onClick={handleAddItem} className="add-section-button">+ Add</button>
    </section>
  );
}

export { BackgroundSection };
