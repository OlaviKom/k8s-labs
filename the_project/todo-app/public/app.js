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
    body: JSON.stringify({ content: text }),
  });

  input.value = "";
  loadTodos();
}

async function markTodoDone(id) {
  await fetch(`/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ done: true }),
  });

  loadTodos();
}

async function loadTodos() {
  const res = await fetch("/todos");
  const todos = await res.json();
  const todoList = document.getElementById("todoList");
  const doneList = document.getElementById("doneList");
  todoList.innerHTML = "";
  doneList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.content;

    if (todo.done) {
      doneList.appendChild(li);
    } else {
      const button = document.createElement("button");
      button.textContent = "Mark as done";
      button.onclick = () => markTodoDone(todo.id);

      li.appendChild(button);
      todoList.appendChild(li);
    }
  });
}

loadTodos();
