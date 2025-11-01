import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let todos = [
    { id: '1', text: 'Learn React', completed: false },
    { id: '2', text: 'Build a Todo App', completed: false },
    { id: '3', text: 'Deploy to Netlify', completed: false }
];

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: 'Todo text is required' });
    }
    const newTodo = {
        id: Date.now().toString(), // Simple unique ID
        text,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update a todo
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { text, completed } = req.body;

    const todoIndex = todos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    if (text !== undefined) {
        todos[todoIndex].text = text;
    }
    if (completed !== undefined) {
        todos[todoIndex].completed = completed;
    }

    res.json(todos[todoIndex]);
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = todos.length;
    todos = todos.filter(todo => todo.id !== id);

    if (todos.length === initialLength) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(204).send(); // No content
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
