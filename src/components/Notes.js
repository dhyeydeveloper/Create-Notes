import React,{useContext, useEffect, useRef, useState} from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';
import AddNote from './AddNote';

export default function Notes(props) {

    const history = useNavigate();
    const context = useContext(NoteContext);
    const {notes, getNotes, editNote} = context;
    const [note, setNote] = useState({id:"",etitle:"", edescription:"",etag:""})

    useEffect(() => {
      if (localStorage.getItem('token')){
        getNotes();
      }else{
        history("/login");
      }
      // eslint-disable-next-line
    }, [])
    
    const updateNote = (currentNote)=>{
      ref.current.click();
      setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    }

    const ref = useRef(null);

    const handleClick = async(e)=>{
        e.preventDefault();
        await editNote(note.id, note.etitle, note.edescription, note.etag);
        props.showAlert(`${note.etitle} Updated Successfully.`, "success")
        ref.current.click();
    }

    const onChangeHandler = (e) =>{
        setNote({...note, [e.target.name]: e.target.value})
    }


  return (
    <>
    <AddNote showAlert={props.showAlert}/>
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
    </button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <form>
            <div className="mb-3">
              <strong><label htmlFor="etitle" className="form-label">Tile</label></strong>
              <input type="text" className="form-control" name="etitle" value={note.etitle} id="etitle" onChange={onChangeHandler} aria-describedby="emailHelp"/>
              <div id="titleHelp" className="form-text">We'll never share your notes with anyone else.</div>
            </div>
            <div className="mb-3">
            <strong><label htmlFor="edescription" className="form-label">Description</label></strong>
              <input type="text" className="form-control" name="edescription" value={note.edescription} id="edescription" onChange={onChangeHandler}/>
            </div>
            <div className="mb-3">
            <strong><label htmlFor="etag" className="form-label">Tag</label></strong>
              <input type="text" className="form-control" name="etag" id="etag" value={note.etag} onChange={onChangeHandler}/>
            </div>
          </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5 } onClick={handleClick} className="btn btn-primary">Update Note</button>
          </div>
        </div>
      </div>
    </div>
    <div className='row my-3'>
      <h1>Your Notes</h1>
      <div className="container mx-2">
      {notes.length === 0 && ' No Notes to display'}
      </div>
      {notes.map((note)=>{
          return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>
      })}
    </div>
    </>
  )
}
