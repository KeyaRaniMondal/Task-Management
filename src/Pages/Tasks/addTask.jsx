// import React, { useContext, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../Providers/AuthProvider";

// const AddTask = () => {
//     const { user } = useContext(AuthContext);
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [category, setCategory] = useState("To-Do");
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Form validation
//         if (!title) {
//             setError("Title is required!");
//             return;
//         }

//         if (!user) {
//             setError("You must be logged in to add a task.");
//             return;
//         }

//         const newTask = {
//             title,
//             description,
//             category,
//             timestamp: new Date().toISOString(),
//             email: user.email,
//         };

//         setLoading(true);
//         setError("");

//         try {
//             const response = await axios.post(
//                 "https://task-management-backend-xi.vercel.app/tasks",
//                 newTask
//             );

//             if (response.status === 201) {
//                 alert("Task added successfully!");
//                 navigate("/showTask");
//                 setTitle("");
//                 setDescription("");
//                 setCategory("To-Do");
//             }
//         } catch (error) {
//             console.error("Error adding task:", error);
//             setError("Failed to add task. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex flex-col gap-5 mt-10">
//             <h2 className="text-3xl text-center font-bold">Add Task</h2>
//             {error && <p className="text-red-500 text-center">{error}</p>}
//             <div className="text-center">
//                 <span>Task Title</span>
//                 <br />
//                 <input
//                     type="text"
//                     placeholder="Title of Task"
//                     className="input input-info"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     maxLength={50}
//                     required
//                 />
//             </div>

//             {/* Task Description */}
//             <div className="text-center">
//                 <span>Task Description</span>
//                 <br />
//                 <textarea
//                     placeholder="Task Description"
//                     className="textarea textarea-info"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     maxLength={200}
//                 ></textarea>
//             </div>

//             {/* Task Category*/}
//             <div className="dropdown dropdown-center dropdown-down flex justify-center mx-auto">
//                 <div tabIndex={0} role="button" className="btn m-1">
//                     Select Task Category ➡️
//                 </div>
//                 <ul
//                     tabIndex={0}
//                     className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
//                 >
//                     <li>
//                         <a onClick={() => setCategory("To-Do")}>To Do</a>
//                     </li>
//                     <li>
//                         <a onClick={() => setCategory("In Progress")}>In Progress</a>
//                     </li>
//                     <li>
//                         <a onClick={() => setCategory("Done")}>Done</a>
//                     </li>
//                 </ul>
//             </div>

//             {/* Add Task Button */}
//             <div className="flex justify-center mx-auto">
//                 <button
//                     className="btn btn-info"
//                     onClick={handleSubmit}
//                     disabled={loading}
//                 >
//                     {loading ? "Adding Task..." : "Add Task"}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AddTask;

import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const AddTask = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");
  const [dueDate, setDueDate] = useState(""); // Add dueDate state
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
      dueDate, // Include dueDate
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
      <div className="text-center">
        <span>Task Title</span>
        <br />
        <input
          type="text"
          placeholder="Title of Task"
          className="input input-info"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={50}
          required
        />
      </div>

      {/* Task Description */}
      <div className="text-center">
        <span>Task Description</span>
        <br />
        <textarea
          placeholder="Task Description"
          className="textarea textarea-info"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={200}
        ></textarea>
      </div>

      {/* Task Due Date */}
      <div className="text-center">
        <span>Due Date</span>
        <br />
        <input
          type="datetime-local"
          className="input input-info"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>

      {/* Task Category */}
      <div className="dropdown dropdown-center dropdown-down flex justify-center mx-auto">
        <div tabIndex={0} role="button" className="btn m-1">
          Select Task Category ➡️
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
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
      <div className="flex justify-center mx-auto">
        <button
          className="btn btn-info"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Adding Task..." : "Add Task"}
        </button>
      </div>
    </div>
  );
};

export default AddTask;