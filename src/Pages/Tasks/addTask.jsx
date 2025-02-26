import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const AddTask = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!title) {
      setError("Title is required!");
      return;
    }

    if (!dueDate) {
      setError("Due date is required!");
      return;
    }

    if (!user) {
      setError("You must be logged in to add a task.");
      return;
    }

    const newTask = {
      title,
      description,
      category,
      timestamp: new Date().toISOString(),
      dueDate,
      email: user.email,
    };

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://task-management-backend-xi.vercel.app/tasks",
        newTask
      );

      if (response.status === 201) {
        alert("Task added successfully!");
        navigate("/showTask");
        setTitle("");
        setDescription("");
        setCategory("To-Do");
        setDueDate(""); // Clear dueDate field
      }
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Failed to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 mt-10">
      <h2 className="text-3xl text-center font-bold">Add Task</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="hero bg-base-200 min-h-screen">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl -mt-48">
          <div className="card-body">
            <fieldset className="fieldset">
              {/* Task Title */}
              <label className="fieldset-label">Task Title</label>
              <input
                type="text"
                placeholder="Title of Task"
                className="input input-info w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={50}
                required
              />

              {/* Task Description */}
              <label className="fieldset-label">Task Description</label>
              <textarea
                placeholder="Task Description"
                className="textarea textarea-info w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={200}
              ></textarea>

              {/* Task Due Date */}
              <label className="fieldset-label">Task Due Date</label>
              <input
                type="datetime-local"
                className="input input-info w-full"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />

              {/* Task Category Dropdown */}
              <label className="fieldset-label">Task Category</label>
              <div className="dropdown dropdown-center w-full">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn  w-full"
                >
                  {category} ➡️
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-full p-2 shadow-sm"
                >
                  <li>
                    <a onClick={() => setCategory("To-Do")}>To Do</a>
                  </li>
                  <li>
                    <a onClick={() => setCategory("In Progress")}>In Progress</a>
                  </li>
                  <li>
                    <a onClick={() => setCategory("Done")}>Done</a>
                  </li>
                </ul>
              </div>

              {/* Add Task Button */}
              <button
                className="btn btn-info mt-4 w-full"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Adding Task..." : "Add Task"}
              </button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;