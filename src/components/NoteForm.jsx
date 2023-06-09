import { useEffect, useState } from "react"
import { useNoteData, useNoteDispatch } from "../contexts/NotesContext"
import Button from "react-bootstrap/Button";

export default function NoteForm(props){
    // if id is null, no prop provided, we are creating note
    // if id has value, we are editing note
    const {id} = props;
    const globalNotesData = useNoteData()
    // the dispatch is our reducer, can edit global notes data
    const globalNotesDispatch = useNoteDispatch()

    const [errorMessage, setErrorMessage] = useState("")

    const [localTitle, setLocalTitle] = useState("")
    const [localDescription, setLocalDescription] = useState("")
    const [localIsCompleted, setLocalIsCompleted] = useState(false)
    const [localDueDate, setLocalDueDate] = useState(new Date().setDate(new Date().getDate() + 1))
    const [localCreatedAtDate, setlocalCreatedAtDate] = useState(Date.now())

    useEffect(() => {
        let tempNote = globalNotesData.find((globalSpecificNote) => {
            return globalSpecificNote.id === id
        })

        if (tempNote) {
            // we found a note to edit!!
            setLocalTitle(tempNote.title)
            setLocalDescription(tempNote.description)
            setLocalIsCompleted(tempNote.isCompleted)
            setLocalDueDate(tempNote.dueDate)
            setlocalCreatedAtDate(tempNote.createdAtDate)
        }
    }, [globalNotesData, id])

    const saveNoteToGlobal = () => {
            // Check if title and description are empty
        if (!localTitle || !localDescription) {
            setErrorMessage("Field required")
            return
        }

        let tempNewNote = {
            id: id || globalNotesData.length + 1,
            title: localTitle,
            description: localDescription,
            isCompleted: localIsCompleted,
            dueDate: localDueDate,
            createdAtDate: localCreatedAtDate
        }

        if (id) {
            globalNotesDispatch({type:"update", updatedNote: tempNewNote})
        } else {
            globalNotesDispatch({type:"create", newNote: tempNewNote})
        }
        
        // saving should exit edit mode
        props.toggleEditMode();

        // Reset input fields
        setLocalTitle("");
        setLocalDescription("");
        setLocalIsCompleted(false);
        setLocalDueDate(new Date().setDate(new Date().getDate() + 1));

        // Reset field error messages
        setErrorMessage("");
    }

    return(
        <div className="Note">
            {errorMessage && <p>{errorMessage}</p>}
            <form>
                <label>Title: </label>
                <input type="text" name="title" value={localTitle} placeholder={errorMessage} maxLength={60} onChange={(event) => setLocalTitle(event.target.value)} />
                
                <label>Description: </label>
                <textarea name="description" value={localDescription} placeholder={errorMessage} onChange={(event) => setLocalDescription(event.target.value)} />

                <div className="due-date-container">
                <label>Due Date: </label>
                <input type="date" name="dueDate" value={new Date(localDueDate).toISOString().split('T')[0]} onChange={(event) => setLocalDueDate(event.target.value)} />
                </div>

                <div className="completed-container">
                    <label>Completed: </label>
                    <input type="checkbox" name="isCompleted" value={localIsCompleted} checked={localIsCompleted} onChange={(event) => setLocalIsCompleted(!localIsCompleted)} />
                </div>
            </form>
            <Button onClick={saveNoteToGlobal} variant="primary">
                Save Note
            </Button>
        </div>
    )
}