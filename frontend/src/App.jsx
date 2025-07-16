import { useEffect, useState } from 'react'
import Task  from './components/Task'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')

  // Fetch tasks
  useEffect(() => {
    fetch('http://localhost:8080/tasks')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTasks(data)
        } else {
          console.error('Expected array but got:', data)
        }
      })
      .catch(err => console.error('Error:', err))
  }, [])

  // Create task
  const handleCreateTask = (e) => {
    e.preventDefault()
    const newTask = {
      title: newTitle,
      description: newDescription,
      completed: false
    }

    fetch('http://localhost:8080/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to create task')
        return res.json()
      })
      .then(createdTask => {
        setTasks(prev => [...prev, createdTask])
        setNewTitle('')
        setNewDescription('')
      })
      .catch(err => console.error('Create error:', err))
  }

  // Delete task
  const handleDeleteTask = (id) => {
    fetch(`http://localhost:8080/tasks/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) throw new Error('Delete failed')
        setTasks(prev => prev.filter(task => task.id !== id))
      })
      .catch(err => console.error('Delete error:', err))
  }
  const handleUpdateTask = (id,done) => {
    const task = tasks.find(t => t.id === id)
    fetch(`http://localhost:8080/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...task, completed: done })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to create task')
        return res.json()
      })
      .then(updatedTask => {
        setTasks(prev => prev.map(task => task.id === id ? updatedTask : task))
      })
  }

  return (
    <div className="app">
      <h1>my cool task app</h1>

      {/* Create Task Form */}
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Task List */}
      <ul>
        {tasks.map(task => <Task key={task.id} task={task} onDelete={handleDeleteTask} onUpdate={handleUpdateTask} />)}
      </ul>
    </div>
  )
}

export default App
