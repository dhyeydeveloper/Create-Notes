import React,{useContext, useState} from 'react'
import NoteContext from '../context/notes/NoteContext'

export default function AddNote(props) {

    const [note, setNote] = useState({title:"", description:"",tag:""})

    const context = useContext(NoteContext);
    const {addNote} = context;

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"",tag:""});
        props.showAlert(`${note.title} Added Successfully.`, "success")
    }

    const onChangeHandler = (e) =>{
        // console.log(e.target.name,"____________name");
        // console.log(e.target.value,"____________value");
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <div className='container my-3'>
      <h1>Create Note</h1>
      <form>
      <div className="mb-3">
        <strong><label htmlFor="title" className="form-label">Tile</label></strong>
        <input type="text" className="form-control" name="title" id="title" value={note.title} onChange={onChangeHandler} aria-describedby="emailHelp"/>
        <div id="titleHelp" className="form-text">We'll never share your notes with anyone else.</div>
      </div>
      <div className="mb-3">
      <strong><label htmlFor="description" className="form-label">Description</label></strong>
        <input type="text" className="form-control" name="description" id="description" value={note.description} onChange={onChangeHandler}/>
      </div>
      <div className="mb-3">
      <strong><label htmlFor="tag" className="form-label">Tag</label></strong>
        <input type="text" className="form-control" name="tag" id="tag" value={note.tag} onChange={onChangeHandler}/>
      </div>
      <button disabled={note.title.length < 5 || note.description.length < 5 } type="submit" className="btn btn-dark" onClick={handleClick}>Add Note</button>
    </form>
    </div>
  )
}
