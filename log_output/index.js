const express = require("express");
const app = express();
const fs = require("fs/promises");
const axios = require("axios");
const { randomUUID } = require("crypto");

const PORT = process.env.PORT || 8080;
const PINGPONG_URL = "http://ping-pong-svc:2450/pingpong";
const CONFIG_FILE = "/config/information.txt";

const randomString = randomUUID();

app.get("/", async (req, res) => {
  const response = await axios.get(PINGPONG_URL);
  const pingpongCount = response.data.split(" ")[1];
  const fileContent = await fs.readFile(CONFIG_FILE);
  const envVariable = process.env.MESSAGE;

  const timestamp = new Date().toISOString();

  res.type("text/plain").send(`file content: ${fileContent}\n
env variable: ${envVariable}\n
${timestamp}: ${randomString}\n
Ping / Pongs: ${pingpongCount}`);
});

app.listen(PORT, () => {
  console.log(`Server listening ${PORT}`);
});
