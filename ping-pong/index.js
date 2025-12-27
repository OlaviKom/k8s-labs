const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

var counter = 0;

app.get("/pingpong", (req, res) => {
  res.send(`pong ${counter}`);
  counter++;
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
