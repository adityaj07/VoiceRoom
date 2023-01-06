require("dotenv").config();
const express = require("express");
const app = express();
const DbConnect = require("./database");
const router = require("./routes");

const PORT = process.env.PORT || 5500;
DbConnect();
app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.sendStatus("Hello from Express JS");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
