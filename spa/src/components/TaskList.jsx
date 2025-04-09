function TaskList({ tasks, onToggleTask }) {
    return (
      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => onToggleTask(task.id)}
              id={`task-${task.id}`}
            />
            <label
              htmlFor={`task-${task.id}`}
              className={task.done ? 'completed' : ''}
            >
              {task.title}
            </label>
          </div>
        ))}
      </div>
    )
  }
  
  export default TaskList