import { ModalState } from "../reducers/modal";

// action.type type
// type literals
export const SHOW_MODAL = "SHOW_MODAL"
export const HIDE_MODAL = "HIDE_MODAL"

// action's type
interface ShowModal {
    type: typeof SHOW_MODAL,
    payload: ModalState
}

interface HideModal {
    type: typeof HIDE_MODAL
}

export type ModalAction = ShowModal | HideModal


// action creators
export const showModal = (modal: ModalState): ShowModal => {
    return {
        type: SHOW_MODAL,
        payload: modal
    }
}

export const hideModal = (): HideModal => {
    return {
        type: HIDE_MODAL
    }
}