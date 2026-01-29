const express = require("express");
const app = express();
const fs = require("fs/promises");
const axios = require("axios");
const { randomUUID } = require("crypto");

const PORT = process.env.PORT || 8080;
const PINGPONG_URL = "http://ping-pong-svc:2450";
const CONFIG_FILE = "/config/information.txt";

const randomString = randomUUID();

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(PINGPONG_URL);
    const pingpongCount = response.data.split(" ")[1];
    const fileContent = await fs.readFile(CONFIG_FILE);
    const envVariable = process.env.MESSAGE;

    const timestamp = new Date().toISOString();

    res
      .status(200)
      .type("text/plain")
      .send(
        `file content: ${fileContent}
env variable: ${envVariable}
${timestamp}: ${randomString}
Ping / Pongs: ${pingpongCount}`,
      );
  } catch (err) {
    console.error("Request failed", err.message);
    res.status(500).send("Internal error");
  }
});

app.get("/healthz", async (req, res) => {
  try {
    const ready = await axios.get(`${PINGPONG_URL}/healthz`);
    res.status(200).send("ok");
  } catch {
    res.status(500).send("pingpong not ready");
  }
});

app.get("/healthz-lb", (req, res) => {
  res.status(200).send("ok");
});

app.listen(PORT, () => {
  console.log(`Server listening ${PORT}`);
});
