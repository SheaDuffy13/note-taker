import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "react-use";

const initialNotesData = [
    {
        id: 1,
        title: "Example Note",
        description: "Description text goes here",
        isCompleted: false,
        dueDate: new Date().setDate(new Date().getDate() + 1), // current time + one day
        createdAtDate: Date.now()
    }
]

// "every reducer should have basic crud functionality" (really common for them to have it, generalized) or anything complex to be done to state
    // goal of reducer is have all state management happen in single place
    // reducer must return something otherwise state is set to null
    // runs automatically when a dispatch function is called
    // whatever is returned is the new state
    /**
     * @param instructions Object containing a "type" to be used by the switch, and whatever other property is expected 
     * as per the switch statement that matches type.
     * @returns New state, edited based on instructions provided.
     */
const notesReducer = (previousState, instructions) => {
    let stateEditable = [...previousState]
    // anything that acts apon and changes state data should be a case, except filter cause don't want to remove data
    switch (instructions.type) {
        case "setup":
            console.log("Applying persistent data to state now...")
            // instructions.data is provided when dispatch function is called
            // instructions.data needs to have a useEffect with the name data. Data is an interchangeable name?
            stateEditable = instructions.data
            // whatever is returned is now newest version of state
            return stateEditable;
        case "create":
            console.log('TODO: Create note and add to state')
            let newNote = instructions.newNote
            stateEditable.push(newNote)
            return stateEditable;
        case "update":
            // 1. find existing note
            let targetNoteIndex = stateEditable.findIndex(globalSpecificNote => {
                return globalSpecificNote.id === instructions.updatedNote.id
            })

            // 2. overwrite existing note
            stateEditable[targetNoteIndex] = instructions.updatedNote

            // 3. return updated state array of notes
            return stateEditable
        case "delete":
            stateEditable = stateEditable.filter(note => note.id !== instructions.id)
            return stateEditable;
        case "sortByDueDate":
            console.log('Sorted state data by due date')
            break;
        case "sortByCreatedAtDate":
            console.log('Sorted by created at date')
            break;
        case "sortById":
            console.log('Sort by ID, this is default order')
            break;
        default:
            console.log("Invalid instruction type provided:" + instructions.type)
            return previousState;
    }
}

// makes our reducer state and reducer dispatch global
export const NoteDataContext = createContext(null)
export const NoteDispatchContext = createContext(null)

// custom hooks to provide direct access to one part of reducer
// read-only data
export function useNoteData(){
    return useContext(NoteDataContext)
}
// function to modify the data
export function useNoteDispatch(){
    return useContext(NoteDispatchContext)
}
/**
 * NotesProvider wraps around the component tree. 
 * any child component has access to this note data via useNoteData and useNoteDispatch.
 * @param {*} props this is a js. comment, helps with intellisense. Gives pop up with info about below function. eg writing NotesProvider() then hovering.
 */
export default function NotesProvider(props){
       // [readOnlyData, functionToModifyData] = useReducer(functionToModifyData, initialDefaultData)
    //    pass around to providers 
    const [notesData, notesDispatch] = useReducer(notesReducer, initialNotesData);
                                                            //  'notes' is key in local storage
    const [persistentData, setPersistentData] = useLocalStorage('notes', initialNotesData );

    useEffect(() => {
        // on app start, overwrite notesData with persistentData
        notesDispatch({type:"setup", data: persistentData});
        // below comment is a command to disable linter error vvvvv (error: depency arrays need to be fixed)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Dev: confirm that our local storage is updating
    useEffect(() => {
        console.log('local storage: ', persistentData);
    // on update to persistent data it can overwrite notesData
    }, [persistentData])

    // autosave changes to notes from reducer state into local storage
    useEffect(() => {
        setPersistentData(notesData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notesData])

    return(
        // global context system, allowing access to reducer 
        <NoteDataContext.Provider value={notesData}>
            <NoteDispatchContext.Provider value={notesDispatch}>
                {props.children}
            </NoteDispatchContext.Provider>
        </NoteDataContext.Provider>
    )
}

