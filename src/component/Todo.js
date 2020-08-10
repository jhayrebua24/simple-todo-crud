import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ data, deleteTodo, updateTodoStatus, getTodo }) => {
  const { id, todo, isDone } = data;
  return (
    <li>
      <span style={{ textDecoration: isDone ? 'line-through' : 'none' }}>{todo}</span>
      {!isDone && (
        <>
          <button type="button" onClick={() => updateTodoStatus(id)} style={{ marginLeft: 5 }} >Mark as done</button>
          <button type="button" onClick={() => getTodo(data)} style={{ marginLeft: 5 }} >Edit</button>
          <button
            type="button"
            onClick={() => deleteTodo(id)}
            style={{ marginLeft: 5, color: 'white', background: 'indianred' }}
          >
            Delete
          </button>
        </>
      )}
      
    </li>
  )
}

Todo.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
  updateTodoStatus: PropTypes.func.isRequired,
}
export default Todo
