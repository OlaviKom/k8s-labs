const express = require("express");
const app = express();
const fs = require("fs/promises");

const PORT = process.env.PORT || 8080;

var counter = 0;

app.get("/pingpong", async (req, res) => {
  counter++;
  await fs.writeFile("/files/pingpong.log", `Ping / pongs ${counter}`);
  res.send(`pong ${counter}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
