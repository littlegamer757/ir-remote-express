const lightHandler = require('./lightHandler');
const helper = require('./util/loggingHelper');
const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Seas Jungs</h1>");
});

app.get("/light/:id", (req, res) => {
    const result = lightHandler.retrieveLight(req.params.id);
    res.send({"light": req.params.id, "state": result});
})

app.get("/light/:id/:state", (req, res) => {
    const result = lightHandler.updateLight(req.params.id, req.params.state);
    result.light = req.params.id;
    res.send(result);
});

app.listen(3000, err => {
    if (err) {
        helper.error("Error starting API", err);
        return;
    }

    helper.log("Listening on port 3000");
});