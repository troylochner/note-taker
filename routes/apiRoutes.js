// ===============================================================================
// LOAD DATA & DEPANDANCIES
// ===============================================================================
const fs = require("fs");
const util = require("util");
const uuid = require("uuid");
const dayjs = require("dayjs");
var notes = require("../db/db.json");

// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function (app) {

  // API GET NOTES
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function (req, res) {
    notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(notes);
  });

  // API POST NOTE
  // ---------------------------------------------------------------------------
  app.post("/api/notes", function (req, res) {
    var addNote = req.body;

    //ADDING UUID + TIMESTAMP TO EACH NOTE
    addNote.id = uuid.v4()
    addNote.timestamp = dayjs().format();

    //ADD TO THE NOTE ARRAY
    notes.push(addNote);
    res.json(addNote);

    //WRITE THE ADDED NOTE TO THE FILE
    fs.writeFileSync('db/db.json', JSON.stringify(notes), function (err, result) {
      if (err) console.log('error', err);
    });
  });


  // API DELETE NOTE
  // ---------------------------------------------------------------------------
  app.delete("/api/notes/:id", function (req, res) {
    var id = req.params.id;
    console.log(`Deleting Note : ${id}`);

    const removedNote = notes.find(removedNote => removedNote.id == id);

    //REMOVE THE NOTE FROM ARRAY
    const updatedNotes = notes.filter(notes => notes.id != id);

    //WRITE THE UPDATED NOTES TO OUR FILE

    fs.writeFileSync('db/db.json', JSON.stringify(updatedNotes), function (err, result) {
      if (err) console.log('error', err);
    });

    //RETURN THE REMOVED NOTE TO THE USER  
    res.json(removedNote)

  })

}