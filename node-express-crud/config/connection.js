const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: `localhost`,
  user: `root`,
  password: ``,
  database: `node_db_crud`,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:" +  JSON.stringify(err,undefined,2));
    return;
  }
  console.log("DB connected successfully");
});

module.exports = connection;
