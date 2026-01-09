async function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value;
  if (!text) {
    alert("Todo cannot be empty");
  }

  await fetch("/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  input.value = "";
  loadTodos();
}

async function loadTodos() {
  const res = await fetch("/todos");
  const todos = await res.json();
  const list = document.getElementById("todoList");
  list.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    list.appendChild(li);
  });
}

loadTodos();
