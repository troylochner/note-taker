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
module.exports = function(app) {
  
// API GET NOTES
// ---------------------------------------------------------------------------
  app.get("/api/notes/", function(req,res){
    res.json(notes);
}) ; 

// API POST NOTE
// ---------------------------------------------------------------------------
  app.post("/api/notes", function (req, res) {
    var addNote = req.body;
    
    //ADDING UUID + TIMESTAMP TO EACH NOTE
    addNote.uuid = uuid.v4()
    addNote.timestamp = dayjs().format();

    //ADD TO THE NOTE ARRAY
    notes.push(addNote);
    res.json(addNote);
    
    //WRITE THE ADDED NOTE TO THE FILE
    fs.writeFileSync('db/db.json', JSON.stringify(notes), function(err, result) {
      if(err) console.log('error', err);
    }); 
});


// API DELETE NOTE
// ---------------------------------------------------------------------------
app.delete("/api/notes/:uuid", function(req,res){
  var uuid = req.params.uuid ;
  console.log(`Deleting Note : ${uuid}`);
  
  const removedNote = notes.find(removedNote => removedNote.uuid == uuid);
  
//REMOVE THE NOTE FROM ARRAY
  const updatedNotes = notes.filter(notes => notes.uuid != uuid);

//WRITE THE UPDATED NOTES TO OUR FILE

  fs.writeFileSync('db/db.json', JSON.stringify(updatedNotes), function(err, result) {
     if(err) console.log('error', err);
   });

   //RETURN THE REMOVED NOTE TO THE USER  
  res.json(removedNote)

})

}

