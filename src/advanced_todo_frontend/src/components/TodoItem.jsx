import React, { useState } from "react";

export default function TodoItem({ id, text, onUpdate, onRemove }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  return (
    <div className="todo-item">
      {editing ? (
        <input
          className="edit-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <span>{text}</span>
      )}

      <div className="actions">
        {editing ? (
          <button
            className="save"
            onClick={() => {
              onUpdate(id, editText);
              setEditing(false);
            }}
          >
            💾 Save
          </button>
        ) : (
          <button className="edit" onClick={() => setEditing(true)}>
            ✏️ Edit
          </button>
        )}
        <button className="remove" onClick={() => onRemove(id)}>
          ❌ Delete
        </button>
      </div>
    </div>
  );
}
