import { useEffect, useState } from "react"
import { useNoteData } from "../contexts/NotesContext"

export default function NoteDisplay(props){

    const {id} = props
    const [localNote, setLocalNote] = useState({});

    const globalNotesData = useNoteData();

    useEffect(() => {
        // on start, find note in globalNotesData that has an id matching props.id
        setLocalNote(globalNotesData.find(globalSpecificNote => globalSpecificNote.id === id))
    }, [globalNotesData, id])

    return(
        <div>
            <h2>{localNote.title}</h2>
            <div className="completionStatus">
                <p>{localNote.isCompleted ? "COMPLETE" : "TO DO"}</p>
                {/* <input type="checkbox" disabled value={localNote.isCompleted} checked={Boolean(localNote.isCompleted)} /> */}
                <input type="checkbox" name="isCompleted" value={localNote.isCompleted} checked={Boolean(localNote.isCompleted)} onChange={() => props.toggleIsCompleted()} />
            </div>
            <p>{localNote.description}</p>
            <p className="date">Due Date: {new Date(localNote.dueDate).toLocaleDateString()}</p>
            <p className="date">Created At: {new Date(localNote.createdAtDate).toLocaleDateString()}</p>
        </div>
    )
}