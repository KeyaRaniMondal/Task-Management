import * as React from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProvider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const TaskBoard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState({
    'To-Do': [],
    'In Progress': [],
    Done: [],
  });

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    if (!user) return;

    try {
      const response = await axios.get('https://task-management-backend-xi.vercel.app/tasks', {
        params: { email: user.email },
      });
      const fetchedTasks = response.data;

      // Categorize tasks based on due time
      const now = new Date();
      const categorizedTasks = {
        'To-Do': fetchedTasks.filter((task) => {
          const dueDate = new Date(task.dueDate);
          return dueDate > now;
        }),
        'In Progress': fetchedTasks.filter((task) => {
          const dueDate = new Date(task.dueDate);
          return dueDate <= now && dueDate >= new Date(now.getTime() - 24 * 60 * 60 * 1000);
        }),
        Done: fetchedTasks.filter((task) => {
          const dueDate = new Date(task.dueDate);
          return dueDate < new Date(now.getTime() - 24 * 60 * 60 * 1000);
        }),
      };

      setTasks(categorizedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
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

      // Update the task's category in database
      try {
        await axios.put(`https://task-management-backend-xi.vercel.app/tasks/${draggableId}`, {
          category: destination.droppableId,
        });
        console.log('Task category updated successfully.');
      } catch (error) {
        console.error('Error updating task category:', error);
        // Revert if the API call fails
        setTasks({
          ...tasks,
          [source.droppableId]: startColumn,
          [destination.droppableId]: finishColumn.filter((task) => task._id !== draggableId),
        });
      }
    }
  };

  // Task deletion
  const handleDelete = async (taskId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://task-management-backend-xi.vercel.app/tasks/${taskId}`);
        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');

        // Update Tasks after deletion
        const updatedTasks = { ...tasks };
        for (const column in updatedTasks) {
          updatedTasks[column] = updatedTasks[column].filter((task) => task._id !== taskId);
        }
        setTasks(updatedTasks);
      } catch (error) {
        console.error('Error deleting task:', error);
        Swal.fire('Error', 'Failed to delete the task.', 'error');
      }
    }
  };

  return (
    <div className="mt-20">
      <h2 className="text-3xl font-bold mb-10 text-center">Scheduled Tasks</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-5">
          {Object.keys(tasks).map((columnId) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-1 p-4 rounded-lg mx-5 text-center"
                  style={{ alignItems: 'center', color: 'blue' }}
                >
                  <h2 className="text-2xl font-bold mb-4">{columnId}</h2>
                  {tasks[columnId].map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-4"
                        >
                          <CardContent>
                            <div className="flex justify-between text-left">
                              <Typography variant="h6" component="div">
                                {task.title}
                              </Typography>
                              <DeleteForeverRoundedIcon
                                onClick={() => handleDelete(task._id)}
                                style={{ cursor: 'pointer', color: 'red' }}
                              />
                            </div>
                            <Typography variant="body2" color="text.secondary">
                              {task.description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <small>Due: {new Date(task.dueDate).toLocaleString()}</small>
                            </Typography>
                          </CardContent>
                        </Card>
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
        <button className="btn btn-outline btn-info flex justify-center mx-auto mt-10">Add Task</button>
      </Link>
    </div>
  );
};

export default TaskBoard;