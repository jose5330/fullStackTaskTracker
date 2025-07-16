import { useEffect, useState } from 'react'

function Task({task ,onDelete , onUpdate}) {
  return (<li key={task.id}>
            <strong>{task.title}</strong> — {task.description || 'No description'}<br />
            Status: {task.completed ? '✅ Done' : '❌ Not done'}
            <button style={{ marginLeft: '1rem' }} onClick={() => onDelete(task.id)}>
              Delete
            </button> 
            <button style={{ marginLeft: '1rem' }} onClick={() => onUpdate(task.id, !task.completed)}>
              {task.completed ? 'Mark as Not Done' : 'Mark as Done'}
              </button>
          </li>);
}

export default Task
