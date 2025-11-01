
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Assuming the backend runs on http://localhost:3001
const API_URL = 'http://localhost:3001/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTodos(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Failed to fetch todos. Please ensure the backend is running on port 3001.');
      setTodos([]); // Clear todos on error
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (newTodoText.trim() === '') return;
    try {
      const response = await axios.post(API_URL, { text: newTodoText, completed: false });
      setTodos([...todos, response.data]);
      setNewTodoText('');
      setError(null);
    } catch (err) {
      console.error('Error adding todo:', err);
      setError('Failed to add todo. Please try again.');
    }
  };

  const toggleTodo = async (id) => {
    const todoToToggle = todos.find(todo => todo.id === id);
    if (!todoToToggle) return;
    try {
      const response = await axios.patch(`${API_URL}/${id}`, { completed: !todoToToggle.completed });
      setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
      setError(null);
    } catch (err) {
      console.error('Error toggling todo:', err);
      setError('Failed to update todo status. Please try again.');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
      setError(null);
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('Failed to delete todo. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Todo Application</h1>

      <div className="todo-input-container">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addTodo();
            }
          }}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      {loading && <p>Loading todos...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && todos.length === 0 && (
        <p className="no-todos-message">No todos yet! Add one above.</p>
      )}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span onClick={() => toggleTodo(todo.id)} className="todo-text">
              {todo.text}
            </span>
            <div className="todo-actions">
              <button onClick={() => toggleTodo(todo.id)} className="toggle-button">
                {todo.completed ? 'Unmark' : 'Mark Complete'}
              </button>
              <button onClick={() => deleteTodo(todo.id)} className="delete-button">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
