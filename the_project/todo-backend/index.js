const express = require("express");
const app = express();
const { Client } = require("pg");

const PORT = process.env.BACKEND_PORT;

app.use(express.json());

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: Number(process.env.DB_PORT),
});

const initDB = async () => {
  await client.connect();

  await client.query(`
    CREATE TABLE IF NOT EXISTS todo(
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    done BOOLEAN DEFAULT false)`);
};

app.get("/todos", async (req, res) => {
  try {
    const result = await client.query(`SELECT * FROM todo`);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Query failed", err);
    res.status(500).send("Database error");
  }
});

app.post("/todos", async (req, res) => {
  const todoContent = req.body.content;

  if (!todoContent) {
    console.warn("[TODO] Missing content!");
    return res.status(400).json({ error: "Missing todo text!" });
  }

  if (todoContent.length > 140) {
    console.warn("[TODO] Content too long", { length: todoContent.length });
    return res.status(400).json({ error: "Todo length over 140 characters" });
  }

  try {
    console.log("[TODO] Creating todo");
    const result = await client.query(
      `
      INSERT INTO todo (content, done)
      VALUES ($1)
      RETURNING *
      `,
      [todoContent],
    );

    console.log("[TODO] Created todo", {
      id: result.rows[0].id,
      content: result.rows[0].content,
    });
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("[DB] Insert failed", err);
    res.status(500).send("Database error");
  }
});

app.put("/todos/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { done } = req.body;

  try {
    const result = await client.query(
      `
        UPDATE todo
        SET done = $1
        WHERE id = $2
        RETURNING *
        `,
      [done, id],
    );

    if (result.rowCount === 0) {
      return res.status(404).send("Todo not found");
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("[DB] Put failed", err);
    res.status(500).send("Database error");
  }
});

app.get("/healthz", async (req, res) => {
  try {
    await client.query("SELECT 1");
    res.status(200).send("ok");
  } catch (err) {
    res.status(500).send("Database not ready");
  }
});

app.get("/livez", (req, res) => {
  res.status(200).send("ok");
});

const start = async () => {
  try {
    await initDB();
  } catch (err) {
    console.error("DB init failed", err);
  }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
