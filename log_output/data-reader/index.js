const express = require("express");
const app = express();
const fs = require("fs/promises");

const PORT = process.env.PORT || 8080;

app.get("/", async (req, res) => {
  let pingpongCount = "Ping / pongs 0";

  try {
    pingpongCount = await fs.readFile("/files/pingpong.log", "utf-8");
  } catch (err) {
    if (err.code !== "ENOENT") {
      res.status(500).send(`Error in reading file: ${err}`);
    }
  }
  const timestamp = new Date().toISOString();

  res.type("text/plain").send(`${timestamp}\n${pingpongCount}`);
});

app.listen(PORT, () => {
  console.log(`Server listening ${PORT}`);
});
