import React, {useState} from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"

    const noteInitial = []
    
    const [notes, setNotes] = useState(noteInitial)


    // GET ALL NOTE
    const getNotes = async() =>{
      // API CALL
    const url = `${host}/api/notes/fetchallnotes`
    const response = await fetch(url, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });

    const json = await response.json()
    setNotes(json)
  }


    // ADD A NOTE
    const addNote = async(title, description, tag) =>{
        // API CALL
      const url = `${host}/api/notes/addnote`
      const response = await fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });

      const note = await response.json();
      setNotes(notes.concat(note))
    }

    // DELETE A NOTE
    const deleteNote = async(id) =>{
      let newNotes = notes.filter((note)=>{return note._id!==id})
      // API CALL
      const url = `${host}/api/notes/deletenote/${id}`
      const response = await fetch(url, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
        
      await response.json();
      setNotes(newNotes);
    }

    // EDIT A NOTE
    const editNote = async(id, title, description, tag) =>{
        // API CALL
        const url = `${host}/api/notes/updatenote/${id}`
        const response = await fetch(url, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
        await response.json(); 

      let newNotes = JSON.parse(JSON.stringify(notes))
      // EDIT API 
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if (element._id === id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        }
        setNotes(newNotes);
      }
      
      return(
      <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
          {props.children}
      </NoteContext.Provider>
      )
}

export default NoteState;


// =============================================  COMMENT PART IS FOR USE CONTEXT API: TO USE STATE VALUE IN WHOLE PROJECT
// const NoteState = (props) => {

//     const state = {
//         "name": "Dhyey",
//         "class": "10A"
//     }

//     const [noteState, setNoteState] = useState(state)
//     const update = () =>{
//         setTimeout(() => {
//             setNoteState({
//                 "name": "Bhavya",
//                 "class": "9C"
//             })
//         }, 2000);
//     }

//     return(
//     <NoteContext.Provider value={{noteState, update}}>
//         {props.children}
//     </NoteContext.Provider>
//     )
// }
