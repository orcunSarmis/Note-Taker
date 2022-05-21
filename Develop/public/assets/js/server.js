// This lines set dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

// Asynchronous process handling in this lines
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// This code for server set up.
const app = express();
const PORT = process.env.PORT || 3001;



app.use(express.urlencoded({extended: true}));
app.use(express.json());


// Middleware
app.use(express.static("./Develop/public"));

//Api route "GET request"
app.get("/", (req, res) => {
   res.send("Hello");
});

//Api route "GET request"
app.get("/api/notes", (req, res) => {
    readFileAsync("../db/db.json", "utf8")
    .then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});

//Api route "POST" request
app.post("/api/notes", (req, res) => {
    const note = req.body;
    readFileAsync("../db/db.json", "utf8")
    .then(function(data) {
        const notes = [].concat(JSON.parse(data));
        notes.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync("../db/db.json", JSON.stringify(notes))
        res.json(note);
    })
});

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
