const lightHandler = require('./lightHandler');
const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Seas Jungs</h1>");
});

app.get("/light/:id/:state", (req, res) => {
    const result = lightHandler.handleLights(req.params.id, req.params.state);
    res.send(result);
});

app.listen(3000, err => {
    if (err) {
        console.log("There was an error", err);
        return;
    }

    console.log("Listening on port 3000");
});