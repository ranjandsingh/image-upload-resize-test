const express = require("express");
const path = require("path");
const multer = require("multer");
const SharpMulter = require("sharp-multer");
const app = express();

const storage = SharpMulter({
  destination: (req, file, callback) => callback(null, "images"),
  imageOptions: {
    fileFormat: "png",
    quality: 80,
    resize: { width: 500, height: 500, resizeMode: "contain" },
  },
  watermarkOptions: {
    input: "./images/logo.png",
    location: "top-right",
  },
});
const upload = multer({ storage });

app.post("/upload", upload.single("avatar"), async (req, res) => {
  console.log(req.file);
  return res.json("File Uploaded Successfully!");
});
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});
