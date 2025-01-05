const express = require("express");
// const bodyParser = require("body-parser");
var userController = require("./controllers/userController");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log("hello world");
  res.send("this one is fine");
});

// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/users", userController.addUser);
app.post("/user/bulk", userController.bulkAddUser);
app.get("/users", userController.getUsers);
app.get("/users/:id", userController.getUserById);
app.get("/query", userController.queryUser);

app.patch("/users/:id", userController.updateUser);
app.post("/users/:id", userController.updateUser);
app.put("/users/:id", userController.updateUser);     

app.delete("/users/:id", userController.deleteUser);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});