const express = require('express');
const app = express();
app.use(express.json());

let todos = [
  { id: 1, task: 'study express', completed: false },
  { id: 2, task: 'do Assignment', completed: true }
];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.get('/todos/active', (req, res) => {
  const activeTodos = todos.filter(todo => !todo.completed);
  res.json(activeTodos);
});

app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find(todo => todo.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.json(todo);
});

app.post('/todos', (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ message: 'Task field is required' });
  }

  const newTodo = {
    id: todos.length + 1,
    task,
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
