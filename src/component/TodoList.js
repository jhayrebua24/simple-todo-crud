import React from 'react';
import PropTypes from 'prop-types';

import Todo from './Todo';

const TodoList = ({ todos, getTodo, deleteTodo, updateTodoStatus }) => {
  return (
    <ul>
      {todos.map((todo, key) => (
        <Todo
          key={key}
          data={todo}
          deleteTodo={deleteTodo}
          updateTodoStatus={updateTodoStatus}
          getTodo={getTodo}
        />
      ))}
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  getTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  updateTodoStatus: PropTypes.func.isRequired,
}
export default TodoList
