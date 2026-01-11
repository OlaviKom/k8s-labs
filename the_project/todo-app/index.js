const express = require("express");
const path = require("path");
const app = express();
const axios = require("axios");
const fsPromises = require("fs/promises");
const fs = require("fs");

const PORT = process.env.APP_PORT;
const IMAGE_URL = process.env.IMAGE_URL;
const IMAGE_DIR = process.env.IMAGE_DIR;
const IMAGE_NAME = process.env.IMAGE_NAME;
const IMAGE_PATH = path.join(IMAGE_DIR, IMAGE_NAME);
const TIMELIMIT = Number(process.env.TIMELIMIT);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const isImageCacheValid = async () => {
  try {
    const stats = await fsPromises.stat(IMAGE_PATH);
    const imageAge = Date.now() - stats.mtimeMs;
    return imageAge < TIMELIMIT;
  } catch (err) {
    if (err.code === "ENOENT") return false;
    throw err;
  }
};

const fetchImage = async () => {
  await fsPromises.mkdir(IMAGE_DIR, { recursive: true });
  if (await isImageCacheValid()) return;
  const res = await axios.get(IMAGE_URL, { responseType: "stream" });
  res.data.pipe(fs.createWriteStream(IMAGE_PATH));
};

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/image", async (req, res) => {
  await fetchImage();
  res.sendFile(IMAGE_PATH);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
