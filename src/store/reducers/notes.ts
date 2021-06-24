import { NoteObj } from "../../shared/types";
import { ADD_NOTE, DELETE_NOTE, NotesAction, UPDATE_NOTE } from "../actions/notes";

interface NoteState {
    notes: NoteObj[]
}

const initState: NoteState = {
    notes: []
}

const notesReducer = (state = initState, action: NotesAction) => {
    switch (action.type) {
        case ADD_NOTE:
            return {
                ...state,
                notes: [
                    ...state.notes,
                    action.payload
                ]
            }
        case UPDATE_NOTE:
            return {
                ...state,
                notes: state.notes.map((note) => {
                    if (note.id === action.payload.id) {
                        return action.payload
                    }
                    return note
                })
            }
        case DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter((note) => note.id !== action.payload)
            }
        default:
            return state
    }
}

export default notesReducer