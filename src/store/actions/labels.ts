import { LabelObj } from "../../shared/types"

// action.type types
export const ADD_LABEL = "ADD_LABEL"
export const UPDATE_LABEL = "UPDATE_LABEL"
export const DELETE_LABEL = "DELTE_LABEL"

// action's type
interface AddLabel {
    type: typeof ADD_LABEL,
    payload: string
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
export const addLabel = (name: string): AddLabel => {
    return {
        type: ADD_LABEL,
        payload: name
    }
}

export const updateLabel = (label: LabelObj): UpdateLabel => {
    return {
        type: UPDATE_LABEL,
        payload: label
    }
}

export const deleteLabel = (id: string): DeleteLabel => {
    return {
        type: DELETE_LABEL,
        payload: id
    }
}