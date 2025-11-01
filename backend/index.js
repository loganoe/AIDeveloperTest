import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001; // Listen on port 3001

app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Middleware to parse JSON bodies

let todos = []; // In-memory store for todos
let nextId = 1; // Counter for unique todo IDs

// GET all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST a new todo
app.post('/todos', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTodo = { id: nextId++, title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT (update) a todo by ID
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todoIndex = todos.findIndex(t => t.id === parseInt(id));

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  // Update fields if provided in the request body
  if (title !== undefined) {
    todos[todoIndex].title = title;
  }
  if (completed !== undefined) {
    todos[todoIndex].completed = completed;
  }
  res.json(todos[todoIndex]);
});

// DELETE a todo by ID
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = todos.length;
  todos = todos.filter(t => t.id !== parseInt(id));

  if (todos.length === initialLength) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.status(204).send(); // No Content response for successful deletion
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});