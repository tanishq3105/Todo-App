import React, { useState } from "react";
import "../styles/CreateTodo.css"; // Import CSS file

export function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="todo-form">
      <input
        className="todo-input"
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />

      <input
        className="todo-input"
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />

      <button
        className="todo-button"
        onClick={() => {
          fetch("http://localhost:3000/todos", {
            method: "POST",
            body: JSON.stringify({
              title: title,
              description: description,
            }),
            headers: {
              "Content-type": "application/json",
            },
          })
            .then(async (res) => {
              const json = await res.json();
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }}
      >
        Add a todo
      </button>
    </div>
  );
}
