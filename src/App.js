import React,{ useState } from 'react';
import { v4 } from 'uuid';

import TodoList from './component/TodoList';

function App() {
  const [todoInput, setTodo] = useState('');
  const [selectedTodo, setSelectedTodo] = useState({});
  const [todos, setTodos] = useState([
    {
      id: v4(),
      todo: 'Build a simple todo',
      isDone: false,
    }
  ]);
  const isEditing = Object.prototype.hasOwnProperty.call(selectedTodo, 'todo');

  const addNewTodo = () => new Promise((resolve, reject) => {
    const todo = todoInput;
    if(!todo || (todo && todo.trim() === ""))
      reject('Invalid input');

    const newTodo = {
      id: v4(),
      todo,
      isDone: false,
    }

    resolve(newTodo);
  });

  const updateTodo = () => new Promise((resolve, reject) => {
    const copyTodos = [...todos];
    const todoIndex = copyTodos.findIndex(todo => todo.id === selectedTodo.id);
    if(todoIndex !== -1){
      copyTodos[todoIndex] = selectedTodo;
      const todo = copyTodos[todoIndex].todo;
      if(!todo || (todo && todo.trim() === ""))
        reject('Invalid input');
      
      resolve(copyTodos);
    }else
      reject('Error');
  });

  const handleSubmit = e => {
    e.preventDefault();

    if(isEditing)
      updateTodo()
        .then(res => setTodos(res))
        .then(() => setSelectedTodo({}))
        .catch(err => console.log(err))
        .finally(() => setTodo('')); //if ever todoinput is not empty when todo is selected
    else
      addNewTodo()
        .then(res => setTodos(currentVal => [ res, ...currentVal ]))
        .catch(err => console.log(err))
        .finally(() => setTodo(''));
  }

  const handleInputChange = e => {
    const todo = e.target.value;
    if(isEditing)
      setSelectedTodo(current => ({ ...current, todo }))
    else
      setTodo(todo);
  }

  const updateTodoStatus = id => {
    const copyTodos = [...todos];
    const todoIndex = copyTodos.findIndex(todo => todo.id === id);
    if(todoIndex !== -1){
      copyTodos[todoIndex].isDone = !copyTodos[todoIndex].isDone;
      setTodos(copyTodos);
    }
    
  };

  const deleteTodo = id => setTodos(todos.filter(todo => todo.id !== id));

  const getTodo = todo => setSelectedTodo(todo);

  return (
    <div style={{ margin: '0 10px' }}>
       <h3>Simple Todo App</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleInputChange}
          value={isEditing ? selectedTodo.todo :  todoInput}
          placeholder="Input Todo"
          required
        />
        <button type="submit" >Submit</button>

        <TodoList
          todos={todos}
          getTodo={getTodo}
          deleteTodo={deleteTodo}
          updateTodoStatus={updateTodoStatus}
        />
      </form>
    </div>
  );
}

export default App;
