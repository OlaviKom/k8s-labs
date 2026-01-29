const express = require("express");
const app = express();
const { Client } = require("pg");

const PORT = process.env.PORT || 8080;

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
    CREATE TABLE IF NOT EXISTS pingpong(
    id INTEGER PRIMARY KEY,
    value INTEGER NOT NULL
    )
  `);

  await client.query(`
    INSERT INTO pingpong (id, value)
    VALUES (1, 0)
    ON CONFLICT (id) DO NOTHING`);
};

app.get("/", async (req, res) => {
  try {
    const result = await client.query(`
    UPDATE pingpong
    SET value = value + 1
    WHERE id = 1
    RETURNING value`);
    res.send(`pong ${result.rows[0].value}`);
  } catch (err) {
    console.error("Query failed", err);
    res.status(500).send("Database error");
  }
});

app.get("/healthz", async (req, res) => {
  try {
    await client.query("SELECT 1");
    res.status(200).send("ok");
  } catch (err) {
    res.status(500).send("database not ready");
  }
});

app.get("/healthz-lb", (req, res) => {
  res.status(200).send("ok");
});

const start = async () => {
  try {
    await initDB();

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (err) {
    console.error("DB init failed", err);
    process.exit(1);
  }
};

start();
