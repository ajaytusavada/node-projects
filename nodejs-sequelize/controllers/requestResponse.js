const express = require("express");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/", (req, res) => {
    Object.assign(req.body, { position: "legend" });
    console.log(req.query.hey);

    res.download('./public/images/abell46s-reface.gif');
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
