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
const BACKEND_URL = process.env.BACKEND_URL;

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

app.get("/healthz", async (req, res) => {
  try {
    const ready = await axios.get(`${BACKEND_URL}/healthz`);
    res.status(200).send("ok");
  } catch (err) {
    res.status(500).send("Backend not ready");
  }
});

app.get("/livez", (req, res) => {
  res.status(200).send("ok");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
