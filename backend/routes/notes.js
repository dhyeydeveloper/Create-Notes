const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// ROUTE 1: FOR FETCHING ALL THE NOTES FROM DB "api/notes/fetchallnotes" - Login Required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{

    try {
    const notes = await Notes.find({user: req.user.id})
    res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured")    
    }
})


// ROUTE 2: POST REQUEST => FOR ADDING THE USER NOTES IN DB "api/notes/addnote" - Login Required
router.post('/addnote', fetchuser, [
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', "Enter a valid description").isLength({ min: 5 }),
], async (req, res)=>{

    try {

    const {title, description, tag, } = req.body

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const note = new Notes({
        title, description, tag, user: req.user.id
    })

    const savedNote = await note.save()

    res.json(savedNote) }

    catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured")    
    }
})



// ROUTE 3: PUT REQUEST => UPDATING THE USER NOTES IN DB "api/notes/updatenote" - Login Required
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    const {title, description, tag} = req.body;
    //  CREATE A NEW NOTE OBJECT
    const newNote = {};
    if (title){newNote.title = title};
    if (description){newNote.description = description};
    if (tag){newNote.tag = tag};

    // FIND THE NOTE TO BE UPDATED 
    let note = await Notes.findById(req.params.id);
    if(note == null){res.status(404).send("Not Found")}
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note})
})



// ROUTE 4: DELETE REQUEST => DELETING THE USER NOTES FROM DB "api/notes/deletenote" - Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{

    try{

    // FIND THE NOTE TO BE DELETED 
    let note = await Notes.findById(req.params.id);
    if(!note){res.status(404).send("Not Found")}

    // CHECK USER VALIDATION WITH TOKEN
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"success":"Note has been deleted"})
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some Error occured")    
    }
})



module.exports = router;