import { useRef, useState } from 'react';
import { tasks as tasksData } from '../data/tasks';

export function TasksList() {
    const [tasks, setTasks] = useState(tasksData);

    const titleRef = useRef(null);

    const handleAddTask = () => {
        const newTasks = [...tasks];
        newTasks.push({
            title: titleRef.current.value,
            description: "wash the dishes in the kitchen",
            completed: false,
        });
        setTasks(newTasks);
        titleRef.current.value = ''; // Wyczyszczenie pola tekstowego po dodaniu zadania
    };

    const handleToggleTaskState = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    };

    const handleDeleteTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    return (
        <>
            <input type="text" id="title" ref={titleRef} onKeyPress={(e) => e.key === 'Enter' && handleAddTask()} />
            <button onClick={handleAddTask}>Add new task</button>

            {tasks.length === 0 ? (
                <div>No tasks available.</div>
            ) : (
                <ul>
                    {tasks.map(({ title, description, completed }, index) => (
                        <li
                            key={index}
                            style={{ textDecoration: completed ? 'line-through' : 'none' }}
                        >
                            <strong>{title}</strong> - {description.slice(0, 50) + (description.length > 50 ? '...' : '')}
                            <button onClick={() => handleToggleTaskState(index)}>
                                {completed ? 'Undo' : "Complete"}
                            </button>
                            <button onClick={() => handleDeleteTask(index)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
