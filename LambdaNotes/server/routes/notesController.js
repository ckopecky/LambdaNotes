const router = require("express").Router();
const Notes = require('../schema/noteSchema');

const get = (req, res) => { //this works
    Notes
        .find()
        .then(notes => {
            res.status(200).json({notes})
        })
        .catch(err => {
            res.status(500).json({Error: err.message});
        });
}
const post = (req, res) => { //this works
    const {note_title, note_body} = req.body;
    if(!note_title || !note_body){
        res.status(400).json("Both note_title and note_body required");
    }
    Notes
        .create(req.body)
        .then(note => {
           if(!note){
               res.status(404).json("Note not found")
           } else {
                res.status(201).json({note});
            }
        })
}
const getId = (req, res) => { //this works
    Notes
        .findById(req.params.id)
        .then(note => {
            res.json({note})
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
};

const deleteId = (req, res) => { //this works
    Notes
        .findByIdAndRemove(req.params.id)
        .then(note => {
            res.status(200).json({Success: `${req.params.id} successfully removed from database`})
        })
        .catch(err => {
            res.status(500).json({Error: err.message});
        });
};

const updateId = (req, res) => { //this works
    const { note_title, note_body } = req.body;

    Notes
     .findByIdAndUpdate( req.params.id, {note_title, note_body})
     .then(note => {
         res.status(200).json(req.body);
     })
     .catch(err => {
         res.status(500).json({Error: err.message});
     });
};

router.route("/")
    .get(get) //api/notes
    .post(post);

router.route("/:id")
    .get(getId)
    .delete(deleteId)
    .put(updateId);

module.exports = router
