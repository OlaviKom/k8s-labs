const express = require("express");
const app = express();
const fs = require("fs/promises");

const PORT = process.env.PORT || 8080;

app.get("/", async (req, res) => {
  try {
    const response = await fs.readFile("/files/log_output.log", "utf-8");
    res.type("text/plain").send(response);
  } catch (err) {
    res.status(500).send(`No data available yet`);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening ${PORT}`);
});
