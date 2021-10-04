const express = require("express");
const app = express();
const cors = require("cors");
var compression = require("compression");

//* Settings
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(
    express.urlencoded({
        extended: true,
    })
);
var port = 5000;

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
    console.log(`http://localhost:${port}`);
});

//? Route Settings
var maproute = require("./Route/map");

//? Route
app.get("/", (req, res) => {
    res.sendStatus(200);
});

app.use(maproute);
