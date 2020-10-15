// ===============================================================================
// LOAD DATA & DEPANDANCIES
// ===============================================================================
const fs = require("fs");
const util = require("util");
const uuid = require("uuid");
const dayjs = require("dayjs");
var notes = require("../db/db");

// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function(app) {
  
// API GET NOTES
// ---------------------------------------------------------------------------
  app.get("/api/notes/", function(req,res){
    return res.json(notes);
}) ; 

// API POST NOTE
// ---------------------------------------------------------------------------
  app.post("/api/notes", function (req, res) {
    var addNote = req.body;
    addNote.uuid = uuid.v4()
    addNote.timestamp = dayjs().format();
    notes.push(addNote);
    res.json(addNote);
      
    fs.readFile('db/db.json', 'utf8', function (err, data) {
     fs.writeFile('db/db.json', JSON.stringify(notes), function(err, result) {
        if(err) console.log('error', err);
      });
    });
});

// API DELETE NOTE
// ---------------------------------------------------------------------------
app.delete("/api/notes/:uuid", function(req,res){
    var uuid = req.param.uuid
    res.json()
})

}

