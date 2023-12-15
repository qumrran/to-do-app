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

    if (tasks.length === 0) return <div>Empty task list.</div>

	return (
		<>

            <input type="text" id="title" ref={titleRef}/>
			<button onClick={handleAddTask}>Add new task</button>

            {tasks.length === 0 ? (<div>Empty task list.</div>) : (
           	<ul>
               {tasks.map(({ title, completed }, index) => (
                       
                           <li
                               key={index}
                               style={{ textDecoration: completed ? 'line-through' : 'none' }}
                           >
                               {title}
                               <button onClick={() =>  handleToggleTaskState(index)}>{completed ? 'Undo' : "completed"}</button>
                               <button onClick={() => handleDeleteTask(index)}>Delete</button>
                           </li>
                       
                   ))};
               
           </ul>
            )}

		
		</>
	);
}
