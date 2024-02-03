import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import FilterButtons from "./components/FilterButtons";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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

  const startEditingTask = (taskId, taskText) => {
    setEditingTaskId(taskId);
    setEditedTaskText(taskText);
  };

  const saveEditedTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId ? { ...task, text: editedTaskText } : task
      )
    );
    setEditingTaskId(null);
    setEditedTaskText("");
  };

  const cancelEditingTask = () => {
    setEditingTaskId(null);
    setEditedTaskText("");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "uncompleted") {
      return !task.completed;
    } else {
      return true;
    }
  });

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TaskInput newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
      <FilterButtons filter={filter} setFilter={setFilter} />
      <ul className="mb-3 mx-5 justify-content-center list-unstyled">
        {filteredTasks.map((task) => (
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

            {editingTaskId === task.id ? (
              <input
                type="text"
                className="form-control"
                value={editedTaskText}
                onChange={(e) => setEditedTaskText(e.target.value)}
              />
            ) : (
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.text}
              </span>
            )}

            {editingTaskId === task.id ? (
              <>
                <button
                  className="btn btn-success ml-2"
                  onClick={saveEditedTask}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary ml-2"
                  onClick={cancelEditingTask}
                >
                  Cancel
                </button>
              </>
            ) : (
              <div>
                <button
                  className="btn btn-primary ml-2"
                  onClick={() => startEditingTask(task.id, task.text)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => removeTask(task.id)}
                >
                  Remove
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
