import React, { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false,
      isEditing: false,
    };

    setTodos([...todos, newTodo]);
    setTask("");
  };


  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTask = (id) => {
    setTodos( todos.map((todo) => todo.id === id ? { ...todo, isEditing: true } : todo )
    );
  };

  const saveTask = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText, isEditing: false }
          : todo
      )
    );
  };

  return (
    <div className="container">
      <h2>React Todo App</h2>

      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task..."
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.isEditing ? (
              <>
                <input
                  type="text"
                  defaultValue={todo.text}
                  onChange={(e) => (todo.text = e.target.value)}
                />
                <button onClick={() => saveTask(todo.id, todo.text)}>Save</button>
              </>
            ) : (
              <>
                {todo.text}
                <button onClick={() => editTask(todo.id)}>Edit</button>
                <button onClick={() => deleteTask(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;