const connection = require("./config/connection");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/users",async (req, res) => {
    connection.query('SELECT * FROM users',(err,rows) => {
        var data = '';
        data = err ? err : rows;
        console.log(data);
        res.status(200).json({data});
    });
});
app.get("/users/:id",async (req, res) => {
    connection.query('SELECT * FROM users WHERE id=?',[req.params.id],(err,rows) => {
        var data = '';
        data = err ? err : rows;
        console.log(data);
        res.status(200).json({data});
    });
});
app.delete("/users/:id",async (req, res) => {
    connection.query('DELETE FROM users WHERE id=?',[req.params.id],(err,rows) => {
        var data = '';
        data = err ? err : rows;
        console.log(data);
        res.status(200).json({data}); 
    });
});
app.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port}`)
);
