import { useState, useEffect } from 'react'
import TaskList from './components/TaskList'
import './styles.css'

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const loadTasks = async () => {
      // Check if there's saved state in localStorage
      const savedState = localStorage.getItem('taskState')
      
      if (savedState) {
        setTasks(JSON.parse(savedState))
      } else {
        // If no saved state, load from JSON file
        try {
          const response = await fetch('/tasks.json')
          const data = await response.json()
          setTasks(data)
        } catch (error) {
          console.error('Error loading tasks:', error)
          setTasks([])
        }
      }
    }

    loadTasks()
  }, [])

  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, done: !task.done } : task
    )
    setTasks(updatedTasks)
    localStorage.setItem('taskState', JSON.stringify(updatedTasks))
  }

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskList tasks={tasks} onToggleTask={toggleTask} />
    </div>
  )
}

export default App