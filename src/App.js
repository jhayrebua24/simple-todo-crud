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

  const addNewTodo = newTodo => new Promise(resolve => {
    setTodos(currentVal => [ newTodo, ...currentVal ]);
    resolve('Success');
  });

  const updateTodo = () => new Promise((resolve, reject) => {
    const copyTodos = [...todos];
    const todoIndex = copyTodos.findIndex(todo => todo.id === selectedTodo.id);
    if(todoIndex !== -1){
      copyTodos[todoIndex] = selectedTodo;
      setTodos(copyTodos);
      resolve('Success');
    }else
      reject('Error');
  });

  const handleSubmit = e => {
    e.preventDefault();
    const todo = todoInput;
    const newTodo = {
      id: v4(),
      todo,
      // todo: todoInput
      isDone: false,
    }

    if(selectedTodo && selectedTodo.todo)
      updateTodo()
        .then(() => setSelectedTodo({}))
        .catch(err => console.log(err))
        .finally(() => setTodo('')); //if ever todoinput is not empty when todo is selected
    else
      addNewTodo(newTodo).finally(() => setTodo(''));
  }

  const handleInputChange = e => {
    const todo = e.target.value;
    if(selectedTodo && selectedTodo.todo)
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
          value={selectedTodo && selectedTodo.todo ? selectedTodo.todo :  todoInput}
          placeholder="Input Todo"
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
