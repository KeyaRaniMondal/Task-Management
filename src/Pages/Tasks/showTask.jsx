import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskBoard = () => {
      const [tasks, setTasks] = useState({
        "To-Do": [],
        "In Progress": [],
        Done: [],
      });
    
      useEffect(() => {
        fetchTasks();
      }, []);
    
      const fetchTasks = async () => {
        try {
          const response = await axios.get("https://task-management-backend-xi.vercel.app/tasks");
          const fetchedTasks = response.data;
    
          const categorizedTasks = {
            "To-Do": fetchedTasks.filter((task) => task.category === "To-Do"),
            "In Progress": fetchedTasks.filter((task) => task.category === "In Progress"),
            Done: fetchedTasks.filter((task) => task.category === "Done"),
          };
    
          setTasks(categorizedTasks);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };
    
      const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;
    
        if (!destination) return;
    
        if (
          source.droppableId === destination.droppableId &&
          source.index === destination.index
        ) {
          return;
        }
    
        const startColumn = tasks[source.droppableId];
        const finishColumn = tasks[destination.droppableId];
    
        const movedTask = startColumn.find((task) => task._id === draggableId);
    
        if (source.droppableId === destination.droppableId) {
          // Reorder within the same column
          const newTasks = Array.from(startColumn);
          newTasks.splice(source.index, 1);
          newTasks.splice(destination.index, 0, movedTask);
    
          setTasks({
            ...tasks,
            [source.droppableId]: newTasks,
          });
        } else {
          // Move to a different column
          const startTasks = Array.from(startColumn);
          startTasks.splice(source.index, 1);
          const finishTasks = Array.from(finishColumn);
          finishTasks.splice(destination.index, 0, movedTask);
    
          setTasks({
            ...tasks,
            [source.droppableId]: startTasks,
            [destination.droppableId]: finishTasks,
          });
    
          // Update the task's category in the database
          try {
            await axios.put(`https://task-management-backend-xi.vercel.app/tasks/${draggableId}`, {
              category: destination.droppableId,
            });
            console.log("Task category updated successfully.");
          } catch (error) {
            console.error("Error updating task category:", error);
            // Revert if the API call fails
            setTasks({
              ...tasks,
              [source.droppableId]: startColumn,
              [destination.droppableId]: finishColumn.filter((task) => task._id !== draggableId),
            });
          }
        }
      };
    
      return (
        <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-5">
            {Object.keys(tasks).map((columnId) => (
              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex-1 bg-gray-100 p-4 rounded-lg"
                  >
                    <h2 className="text-2xl font-bold mb-4">{columnId}</h2>
                    {tasks[columnId].map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-4 mb-4 rounded-lg shadow-sm"
                          >
                            <h3 className="font-bold">{task.title}</h3>
                            <p>{task.description}</p>
                            <small>{new Date(task.timestamp).toLocaleString()}</small>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>

        <Link to={'/addTask'}>
        <button className="btn btn-outline btn-info">Add Task</button>
        </Link>  
        </div>

    );
};

export default TaskBoard;