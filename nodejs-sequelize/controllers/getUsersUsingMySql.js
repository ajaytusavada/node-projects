const express = require("express");
const connection = require("../config/db");
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());


//get all users
app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Database query failed");
    }
    res.json(results);
  });
});


//create new user
async function createUser(userData) {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;
    connection.query(
      sql,
      [userData.first_name, userData.last_name, userData.email, hashedPassword],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
}
app.use(express.urlencoded({ extended: true }));
app.post("/add-user", (req, res) => {
  try {
    const result = createUser(req.body);
    res.status(201).json({ status : 201 , message: 'User created', user: result });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});


// Delete User
function deleteUser(id) {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM users WHERE id = ?`;
    connection.query(sql, [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}
app.delete('/user/:id', async (req, res) => {
  try {
    deleteUser(req.params.id);
    res.json({ status : 200 ,message: 'User deleted'});
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' + err });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
