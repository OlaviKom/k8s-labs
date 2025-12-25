const express = require("express");
const { timeStamp } = require("node:console");
const app = express();

const generateRndString = (lenght) => {
  return Math.random()
    .toString(36)
    .substring(2, lenght + 2);
};

const randomString = generateRndString(15);
var lastTimestamp = null;

setInterval(() => {
  lastTimestamp = new Date().toISOString();
  console.log(`${lastTimestamp}: ${randomString}`);
}, 5000);

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({
    randomString,
    timestamp: lastTimestamp,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening ${PORT}`);
});
