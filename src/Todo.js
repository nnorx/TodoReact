import React from 'react'


export default function Todo({ todo, toggleTodo }) {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }
  
    return (
        <div className="todo">
            <label>
                <input class="form-check-input" type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
                {todo.name}
            </label>
        </div>
  )
}
