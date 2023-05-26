import NoteForm from "../components/NoteForm"
import NoteParent from "../components/NoteParent"
import { useNoteData } from "../contexts/NotesContext"
import { useState } from "react"

export default function Homepage(){
    const [editMode, setEditMode] = useState(false)
    const toggleEditMode = () => {
        // sets to opposite of whatever edit mode is
        setEditMode(!editMode);
    }

    // State to minimize new note form
    const [showNewNoteForm, setShowNewNoteForm] = useState(false)

    const globalNotesData = useNoteData()
    
    return(
        <div className="HomeDiv">
            <header>
                <h1>Note Taker</h1>
            </header>

            <h4>{globalNotesData.length} notes in storage</h4>

            <h4 className="create-note-Title">Create new note: </h4>
            <button onClick={() => setShowNewNoteForm(!showNewNoteForm)}>{showNewNoteForm ? "Minimize" : "Create New Note"} </button>
            {showNewNoteForm && <NoteForm toggleEditMode={toggleEditMode}/>}

            <h4 className="list-all-notes-title">List of all notes: </h4>
            {globalNotesData.map((note) =>{
                return(
                    <div key={note.id} className="Note">
                        <NoteParent id={note.id} />
                    </div>
                )
            })}
        </div>
    )
}