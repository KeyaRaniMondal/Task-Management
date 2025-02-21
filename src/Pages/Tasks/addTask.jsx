import React, { useState } from "react";
import axios from "axios";

const AddTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("To-Do");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title) {
            alert("Title is required!");
            return;
        }

        const newTask = {
            title,
            description,
            category,
            timestamp: new Date().toISOString(),
        };

        try {
            const response = await axios.post("https://task-management-backend-xi.vercel.app/tasks", newTask);
            if (response.data.insertedId) {
                alert("Task added successfully!");
                setTitle("");
                setDescription("");
                setCategory("To-Do");
            }
        } catch (error) {
            console.error("Error adding task:", error);
            alert("Failed to add task. Please try again.");
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <h2 className="text-3xl">Add Task</h2>
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
            <div className="dropdown dropdown-center dropdown-down">
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
            <div>
                <button className="btn btn-info" onClick={handleSubmit}>
                    Add Task
                </button>
            </div>
        </div>
    );
};

export default AddTask;