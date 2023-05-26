import { useState } from "react";
import NoteDisplay from "./NoteDisplay";
import NoteForm from "./NoteForm";
import { useNoteData, useNoteDispatch } from "../contexts/NotesContext"

export default function NoteParent(props){
    const globalNotesData = useNoteData()
    const globalNotesDispatch = useNoteDispatch()

    const [editMode, setEditMode] = useState(false)
    const toggleEditMode = () => {
        // sets to opposite of whatever edit mode is
        setEditMode(!editMode);
    }

    const toggleIsCompleted = () => {
        let tempNote = globalNotesData.find((globalSpecificNote) => {
            return globalSpecificNote.id === props.id
        })
        let updatedNote = {...tempNote, isCompleted: !tempNote.isCompleted}
        globalNotesDispatch({type:"update", updatedNote: updatedNote})
    }

    return(
        // when doing conditional logic, need it in a div
        <div>
            {editMode ? <NoteForm id={props.id} toggleEditMode={toggleEditMode} /> : <NoteDisplay id={props.id} toggleIsCompleted={toggleIsCompleted} />}
            <button onClick={toggleEditMode}>Edit Note</button>
        </div>
    )
}