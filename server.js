const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const path = require("path");
const { sendMessages } = require("./whatsapp");
const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.post("/send", upload.single("excelFile"), async (req, res) => {
  const message = req.body.message;
  const filePath = req.file.path;

  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  await sendMessages(data, message);
  res.send("Messages sent successfully!");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
