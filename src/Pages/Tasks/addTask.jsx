const AddTask = () => {
    return (
        <div className="flex flex-col gap-5">
            <h2 className="text-3xl">Add Taks</h2>
            <div className="text-center">
                <span>Task Title</span><br />
                <input type="text" placeholder="Title of Task" className="input input-info" />
            </div>
            <div className="text-center">
                <span>Task Description</span><br />
                <textarea type="text" placeholder="Task Description" className="textarea textarea-info"></textarea>
            </div>
            <div className="dropdown dropdown-center dropdown-down">
                <div tabIndex={0} role="button" className="btn m-1">Select Task Category ➡️</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li><a>To Do</a></li>
                    <li><a>In Progress</a></li>
                    <li><a>Done</a></li>
                </ul>
            </div>
            <div>
            <button className="btn btn-info">Add Task</button>
            </div>
            
        </div>
    )
}
export default AddTask