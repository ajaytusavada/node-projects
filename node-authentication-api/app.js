const express = require("express");
const { register,  login,  getUserById } = require("./controllers/authController");
const { addEmployee } = require("./controllers/employeeController");
const authMiddleware = require("./middlewares/authMiddleware");
const port = process.env.PORT || 3000;
const app = express();
require("./config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", register);
app.post("/login", login);

app.get("/user-profile", authMiddleware, getUserById);
app.post("/add-employee", authMiddleware, addEmployee);

app.listen(port, () =>
  console.log(`Node Authentication app listening on port http://localhost:${port}`)
);
