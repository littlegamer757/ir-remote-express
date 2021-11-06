const lightHandler = require('./lightHandler');
const helper = require('./util/loggingHelper');
const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.sendFile('index.html', {root: 'frontend'});
});

app.get("/light/:id", (req, res) => {
    const result = lightHandler.retrieveLight(parseInt(req.params.id));
    res.send(result);
});

app.get("/light/:id/:command", (req, res) => {
    const result = lightHandler.updateLight(parseInt(req.params.id), req.params.command);
    res.send(result);
});

app.listen(3000, err => {
    if (err) {
        helper.error("Error starting API", err);
        return;
    }

    app.use(express.static("frontend"));
    lightHandler.init();
    helper.log("Listening on port 3000");
});