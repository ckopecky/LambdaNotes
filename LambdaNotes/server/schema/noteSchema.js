const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    note_title: {
        type: String,
        required: true,
        unique: true,
    },
    note_body: {
        type: String,
        required: true,
    }
})


const NoteModel = mongoose.model("Note", NoteSchema, "notes");
module.exports = 
    NoteModel
