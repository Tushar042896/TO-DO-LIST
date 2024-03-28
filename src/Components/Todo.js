import React, { useState } from 'react';
import './Todo.css';

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');
  const [plannedDate, setPlannedDate] = useState('');
  
  const handleAddTask = () => {
    if (taskDescription.trim() !== '') {
      const newTask = {
        description: taskDescription,
        plannedDate: plannedDate,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setTaskDescription('');
      setPlannedDate('');
    }
  };
  
  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };
  
  const handleToggleCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };
  
  const handleInputChange = (event) => {
    setTaskDescription(event.target.value);
  };
  
  const handleDateChange = (event) => {
    setPlannedDate(event.target.value);
  };

  return (
    <div className="Todo">
      <h1>To-Do List</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="Enter task description"
          value={taskDescription}
          onChange={handleInputChange}
        />
        <input
          type="date"
          value={plannedDate}
          onChange={handleDateChange}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} style={{border: task.plannedDate < new Date().toISOString().split('T')[0] ? '2px solid yellow' : ''}}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleCompletion(index)}
            />
            <span style={{textDecoration: task.completed ? 'line-through' : 'none'}}>{task.description}</span>
            {task.plannedDate < new Date().toISOString().split('T')[0] && <p>Due day is passed</p>}
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
