import React, { useEffect, useState } from "react";
import { advanced_todo_backend } from "../../declarations/advanced_todo_backend";
import TodoItem from "./components/TodoItem";

export default function App() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  const fetchItems = async () => {
    const result = await advanced_todo_backend.getItems();
    setItems(result);
  };

  const handleAdd = async () => {
    if (text.trim()) {
      await advanced_todo_backend.addItem(text.trim());
      setText("");
      fetchItems();
    }
  };

  const handleUpdate = async (id, newText) => {
    await advanced_todo_backend.updateItem(id, newText);
    fetchItems();
  };

  const handleRemove = async (id) => {
    await advanced_todo_backend.removeItem(id);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="container">
      <h1>📝 Advanced Todo</h1>
      <div className="input-group">
        <input
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="todo-list">
        {items.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            text={item.text}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
}
