import { NoteObj } from "../../shared/types"

// action.type types
export const ADD_NOTE = "ADD_NOTE"
export const UPDATE_NOTE = "UPDATE_NOTE"
export const DELETE_NOTE = "DELETE_NOTE"

// action's types
interface AddNote {
    type: typeof ADD_NOTE,
    payload: NoteObj
}

interface UpdateNote {
    type: typeof UPDATE_NOTE,
    payload: NoteObj
}

interface DeleteNote {
    type: typeof DELETE_NOTE,
    payload: string
}

export type NotesAction = AddNote | UpdateNote | DeleteNote

// action creators
export const addNote = (note: NoteObj): AddNote => {
    return {
        type: ADD_NOTE,
        payload: note
    }
}

export const updateNote = (note: NoteObj): UpdateNote => {
    return {
        type: UPDATE_NOTE,
        payload: note
    }
}

export const deleteNote = (id: string): DeleteNote => {
    return {
        type: DELETE_NOTE,
        payload: id
    }
}