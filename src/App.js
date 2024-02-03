import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const checkTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="mb-3 mx-5 d-flex justify-content-center">
        <input
          type="text"
          className="form-control  max-width-200 w-75"
          style={{ backgroundColor: "#99c8ff", borderColor: "#99c8ff" }}
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTask}>
          Add Task
        </button>
      </div>
      <ul className="mb-3 mx-5 justify-content-center list-unstyled">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="p-2 mb-2 d-flex justify-content-between align-items-center w-75 mx-auto"
          >
            <input
              type="checkbox"
              className="ml-2 form-check-input"
              checked={task.completed}
              onChange={() => checkTask(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>

            <button
              className="btn btn-danger ml-2"
              onClick={() => removeTask(task.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
