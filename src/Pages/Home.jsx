import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import React, { useState } from 'react';


const Home = () => {
    const [columns, setColumns] = useState({
        todo: ['Ant-Man', 'Aquaman', 'Asterix', 'The Atom', 'The Avengers'],
        inProgress: ['Ant-Man1', 'Aquaman', 'Asterix', 'The Atom', 'The Avengers'],
        done: ['Ant-Man2', 'Aquaman', 'Asterix', 'The Atom', 'The Avengers'],
    });

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const [removed] = sourceColumn.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {
            sourceColumn.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: sourceColumn,
            });
        } else {
            destColumn.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: sourceColumn,
                [destination.droppableId]: destColumn,
            });
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex justify-around">
                {Object.entries(columns).map(([columnId, tasks]) => (
                    <Droppable key={columnId} droppableId={columnId}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="h-96 overflow-x-auto"
                            >
                                <table className="table table-pin-rows bg-base-200">
                                    <thead>
                                        <tr>
                                            <th>{columnId.toUpperCase()}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks.map((task, index) => (
                                            <Draggable key={task} draggableId={task} index={index}>
                                                {(provided) => (
                                                    <tr
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <td>{task}</td>
                                                    </tr>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default Home;