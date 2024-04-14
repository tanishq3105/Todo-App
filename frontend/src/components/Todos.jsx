import React from 'react';
import './todos.css'; // Import the CSS file

export function Todos({ todos }) {
    return (
        <div className="todo-list">
            {todos.map(function(todo) {
                return (
                    <div key={todo._id} className="todo-item">
                        <h1>{todo.title}</h1>
                        <h2>{todo.description}</h2>
                        <button 
                            className="complete-button"
                            onClick={() => {
                                fetch("http://localhost:3000/completed",{
                                    method:"PUT",
                                    body: JSON.stringify({
                                        id: todo._id
                                    }),
                                    headers: {
                                        "Content-type": "application/json"
                                    }
                                }).then(async(res)=>{
                                    const json=await res.json();
                                    
                                })
                            }}
                        >
                            {todo.completed ? "Completed" : "Mark as Complete"}
                        </button>
                        <button 
                            className="delete-button"
                            onClick={() => {
                                fetch("http://localhost:3000/delete",{
                                    method:"PUT",
                                    body: JSON.stringify({
                                        id: todo._id
                                    }),
                                    headers: {
                                        "Content-type": "application/json"
                                    }
                                }).then(async(res)=>{
                                    const json=await res.json();
                                    
                                })
                            }}
                        >
                            Delete Todo
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
