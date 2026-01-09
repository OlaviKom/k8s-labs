const express = require("express");
const app = express();
const { randomUUID } = require("crypto");

const PORT = process.env.PORT || 8080;

app.use(express.json());

let todos = [];

app.get("/todos", async (req, res) => {
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const todoText = req.body.text;

  if (!todoText) {
    return res.status(400).json({ error: "Missing todo text!" });
  }

  const todo = { id: randomUUID(), text: todoText };
  todos.push(todo);

  res.status(201).json(todo);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
