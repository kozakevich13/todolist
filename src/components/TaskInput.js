import React from "react";

function TaskInput({ newTask, setNewTask, addTask }) {
  return (
    <div className="mb-3 mx-2 d-flex flex-column align-items-center">
      <input
        type="text"
        className="form-control  max-width-200 w-75"
        style={{ backgroundColor: "#99c8ff", borderColor: "#99c8ff" }}
        placeholder="Add a new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button className="btn btn-primary mx-2" onClick={addTask}>
        Add task
      </button>
    </div>
  );
}

export default TaskInput;
