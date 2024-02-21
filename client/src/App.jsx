import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const [titleError, setTitleError] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.title) {
      setTitleError(true);
      return;
    }
    try {
      await axios.post(API_URL, newTask);
      fetchTasks();
      setNewTask({ title: "", description: "", completed: false });
      setTitleError(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdateTask = async (id, completed) => {
    try {
      await axios.put(`${API_URL}/${id}`, { completed });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = (task) => {
    console.log("Editing task:", task);
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleSaveEdit = async () => {
    if (!editingTask.title) {
      setTitleError(true);
      return;
    }
    console.log("Editing task:", editingTask);
    try {
      await axios.put(`${API_URL}/${editingTask.id}`, editingTask);
      fetchTasks();
      setEditingTask(null);
      setTitleError(false);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Task Manager</h1>
      <form
        className="task-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTask();
        }}
      >
        <input
          className={`input-title ${titleError && "error"}`}
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => {
            setNewTask({ ...newTask, title: e.target.value });
            setTitleError(false);
          }}
        />
        {titleError && (
          <span className="error-message">Please enter a title</span>
        )}
        <input
          className="input-description"
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button className="add-button" type="submit" disabled={!newTask.title}>
          Add Task
        </button>
      </form>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            {editingTask && editingTask.id === task.id ? (
              <>
                <input
                  className={`input-title ${titleError && "error"}`}
                  type="text"
                  value={editingTask.title}
                  onChange={(e) => {
                    setEditingTask({ ...editingTask, title: e.target.value });
                    setTitleError(false);
                  }}
                />
                {titleError && (
                  <span className="error-message">Please enter a title</span>
                )}
                <input
                  className="input-description"
                  type="text"
                  value={editingTask.description}
                  onChange={(e) => {
                    console.log("Description change:", e.target.value);
                    setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    });
                  }}
                />
                <button className="save-button" onClick={handleSaveEdit}>
                  Save
                </button>
                <button className="cancel-button" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div style={{ display: "flex" }}>
                  <input
                    className="task-checkbox"
                    type="checkbox"
                    checked={task.completed}
                    onChange={(e) =>
                      handleUpdateTask(task.id, e.target.checked)
                    }
                  />
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    <span
                      className={`task-title ${
                        task.completed ? "completed" : ""
                      }`}
                    >
                      <span className="task-detail">Title:</span> {task.title}
                    </span>
                    <span
                      className={`task-title ${
                        task.completed ? "description-completed" : ""
                      }`}
                      style={{ fontSize: "12px" }}
                    >
                      {task.description}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    className="edit-button"
                    onClick={() => handleEditTask(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
