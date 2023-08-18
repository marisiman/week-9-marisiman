const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 8888;


app.get("/", (req, res) => {

    res.send("Belaljar express");
});

app.listen(port, () => {
    console.log(`server listen ${port}`);

});