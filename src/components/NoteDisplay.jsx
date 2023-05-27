import { useEffect, useState } from "react"
import { useNoteData, useNoteDispatch } from "../contexts/NotesContext"

export default function NoteDisplay(props){

    const {id} = props
    const [localNote, setLocalNote] = useState({});
    const globalNotesData = useNoteData();
    // minimize notes
    const [showNoteDetails, setShowNoteDetails] = useState(true);
    // for delete button
    const globalNotesDispatch = useNoteDispatch();

    const handleDeleteNote = () => {
        globalNotesDispatch({type: "delete", id: id})
    }

    useEffect(() => {
        // on start, find note in globalNotesData that has an id matching props.id
        setLocalNote(globalNotesData.find(globalSpecificNote => globalSpecificNote.id === id))
    }, [globalNotesData, id])

    return(
        <div>
            <h2 className="note-title" style={{color: localNote.isCompleted ? "#386d7b" : null}}>{localNote.title}</h2>
            <p className="date">Due Date: {new Date(localNote.dueDate).toLocaleDateString()}</p>
            <div className="completionStatus">
                <p>{localNote.isCompleted ? "COMPLETE" : "TO DO"}</p>
                <input type="checkbox" name="isCompleted" value={localNote.isCompleted} checked={Boolean(localNote.isCompleted)} onChange={() => props.toggleIsCompleted()} />
            </div>
    
            {/* minimize notes */}
            <div className="minimize-button">
                <button onClick={() => setShowNoteDetails(!showNoteDetails)}>{showNoteDetails ? "Collapse" : "Expand"} </button>
            </div>
            {showNoteDetails && (
                <>
                    <p className="noteDescription">{localNote.description}</p>
                    
                    <p className="date">Created At: {new Date(localNote.createdAtDate).toLocaleDateString()}</p>
                    {/* Edit note button */}
                    <button onClick={() => props.toggleEditMode()}>Edit Note</button>
                    {/* Delete note button */}
                    <button onClick={() => handleDeleteNote()}>Delete Note</button>
                </>
            )}
        </div>
    )
    
}