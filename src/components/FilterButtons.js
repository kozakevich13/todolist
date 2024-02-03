import React from "react";

function FilterButtons({ filter, setFilter }) {
  return (
    <div className="mb-3 d-flex justify-content-center">
      <button
        className={`btn btn-outline-primary mx-2 ${
          filter === "all" && "active"
        }`}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={`btn btn-outline-success mx-2 ${
          filter === "completed" && "active"
        }`}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
      <button
        className={`btn btn-outline-danger mx-2 ${
          filter === "uncompleted" && "active"
        }`}
        onClick={() => setFilter("uncompleted")}
      >
        Uncompleted
      </button>
    </div>
  );
}

export default FilterButtons;
