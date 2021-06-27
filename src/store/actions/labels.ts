import { LabelObj, NoteObj } from "../../shared/types"
import { Dispatch } from "redux"
import { NotesAction, updateNote, UPDATE_NOTE } from "./notes"
import { RootState } from "../reducers"

// action.type types
export const ADD_LABEL = "ADD_LABEL"
export const UPDATE_LABEL = "UPDATE_LABEL"
export const DELETE_LABEL = "DELTE_LABEL"

// action's type
interface AddLabel {
    type: typeof ADD_LABEL,
    payload: LabelObj
}

interface UpdateLabel {
    type: typeof UPDATE_LABEL,
    payload: LabelObj
}

interface DeleteLabel {
    type: typeof DELETE_LABEL,
    payload: string
}

export type LabelAction = AddLabel | UpdateLabel | DeleteLabel

// action creators
export const addLabel = (label: LabelObj): AddLabel => {
    return {
        type: ADD_LABEL,
        payload: label
    }
}

export const updateLabel = (label: LabelObj) => {
    return function (dispatch: Dispatch<UpdateLabel | NotesAction>, getState: () => RootState) {
        const { notes } = getState().notes

        // loop through notes and find notes with this label
        const notesWithLabels: NoteObj[] = []

        notes.forEach(note => {
            note.labels.forEach(l => {
                if (l.id === label.id) {
                    const newNote: NoteObj = {
                        ...note,
                        labels: note.labels.map((la) => {
                            if (la.id === label.id) {
                                return {
                                    ...la,
                                    name: label.name
                                }
                            }
                            return la;
                        })
                    }
                    notesWithLabels.push(newNote)
                }
            })
        })

        console.log(notesWithLabels)

        if (notesWithLabels.length > 0) {
            notesWithLabels.forEach(note => {
                dispatch(updateNote(note))
            })
        }

        dispatch({
            type: UPDATE_LABEL,
            payload: label
        })
    }

}

export const deleteLabel = (id: string) => {
    return function (dispatch: Dispatch<DeleteLabel | NotesAction>, getState: () => RootState) {
        const { notes } = getState().notes

        // loop through notes and find notes with this label
        const notesWithLabels: NoteObj[] = []

        notes.forEach(note => {
            note.labels.forEach(label => {
                if (label.id === id) {
                    const newNote: NoteObj = {
                        ...note,
                        labels: note.labels.filter(l => l.id !== id)
                    }
                    notesWithLabels.push(newNote)
                }
            })
        })

        if (notesWithLabels.length > 0) {
            notesWithLabels.forEach(note => {
                dispatch(updateNote(note))
            })
        }

        dispatch({
            type: DELETE_LABEL,
            payload: id
        })

    }
}