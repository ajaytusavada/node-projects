const express = require("express");
const http = require("http");
const app = express();
app.get("/", (req, res) => {
  console.log("hello world");
  res.send(`hello world`);
});
app.listen(3000, () => console.log("Ajay T"));