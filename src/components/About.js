import React from 'react'

export default function About() {

  return (
    <div>This is About Page.</div> 
  )
}






// =============================================  COMMENT PART IS FOR USE CONTEXT API: TO USE STATE VALUE IN WHOLE PROJECT
// import React, { useContext, useEffect } from 'react'
// import NoteContext from '../context/notes/NoteContext'

// export default function About() {

//   const a = useContext(NoteContext)
//   useEffect(() => {
//     a.update();
//     // eslint-disable-next-line
//   }, [])
  
//   return (
//     <div>This is about {a.noteState.name} and he is in class {a.noteState.class}.</div> 
//   )
// }