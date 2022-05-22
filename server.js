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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware
app.use(express.static("public"));

//Api route "GET request"
// app.get("/", (req, res) => {
//    res.send("Hello"); //index.html
// });

//Api route "GET request"
// app.get("/notes", (req, res) => {
//   res.sendFile(path.join(__dirname, "./index.html")); //index.html
// });

//Api route "GET request"
app.get("/api/notes", (req, res) => {
  readFileAsync("./db/db.json", "utf8").then(function (data) {
    notes = [].concat(JSON.parse(data));
    res.json(notes);
  });
});

//Api route "POST" request
app.post("/api/notes", (req, res) => {
  const note = req.body;
  readFileAsync("./db/db.json", "utf8")
    .then(function (data) {
      const notes = [].concat(JSON.parse(data));
      notes.id = notes.length + 1;
      notes.push(note);
      return notes;
    })
    .then(function (notes) {
      writeFileAsync("./db/db.json", JSON.stringify(notes));
      res.json(note);
    });
});

// Api route "Delete" request
app.delete("/api/notes/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id);
  readFileAsync("./db/db.json", "utf8")
    .then(function (data) {
      const notes = [].concat(JSON.parse(data));
      const newNotesData = [];
      for (let i = 0; i < notes.length; i++) {
        if (idToDelete !== notes[i].id) {
          newNotesData.push(notes[i]);
        }
      }
      return newNotesData;
    })
    .then(function (notes) {
      writeFileAsync("./db/db.json", JSON.stringify(notes));
      res.send("Note Saved!");
    });
});

//  test again the delete function

// chechk again for ahndler

// html routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html")); //index.html
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//Api route "GET request"
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html")); //index.html
});

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
