const express = require("express");
const app = express();
const fs = require("fs/promises");
const axios = require("axios");
const { randomUUID } = require("crypto");

const PORT = process.env.PORT || 8080;
const PINGPONG_URL = "http://ping-pong-svc:2450/pingpong";

const randomString = randomUUID();

app.get("/", async (req, res) => {
  const response = await axios.get(PINGPONG_URL);
  const pingpongCount = response.data.split(" ")[1];

  const timestamp = new Date().toISOString();

  res
    .type("text/plain")
    .send(`${timestamp}: ${randomString}\nPing / Pongs: ${pingpongCount}`);
});

app.listen(PORT, () => {
  console.log(`Server listening ${PORT}`);
});
