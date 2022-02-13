import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import Footer from "./Footer";

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()


  // Load initial todos from localStorage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // Handles toggling of todos; passed down to TodoList and Todo
  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  // Clears completed todos
  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  // Adds todo to list
  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if(name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    console.log(name)
    todoNameRef.current.value = null
  }

  return (
    <div className="container">
      <h2 className="text-center text-#84a98c mt-3 mb-3">Todo List</h2>
      <div className="todolistwrapper shadow border p-2 rounded mt-2 bg-light">
        
        <TodoList className="list" todos={todos} toggleTodo={toggleTodo}/>
        <input class="form-control" ref={todoNameRef} type="text" />
        <div className="buttonswrapper">
          <button className="btn sbtn btn-primary" onClick={handleAddTodo}>Add Todo</button>
          <button className="btn sbtn btn-primary" onClick={handleClearTodos}>Clear Complete</button>
        </div>
        <div className="total">{todos.filter(todo => !todo.complete).length} left to do</div> 
      </div>
      <Footer/>
    </div>
  )
}

export default App;
