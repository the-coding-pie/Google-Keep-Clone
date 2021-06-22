import { LABEL_MODAL, NOTE_MODAL } from "../../shared/constants";
import { HIDE_MODAL, ModalAction, SHOW_MODAL } from "../actions/modal";

export interface ModalState {
    modalType: typeof LABEL_MODAL | typeof NOTE_MODAL | null,
    modalProps: Object
}

const initState: ModalState = {
    modalType: null,
    modalProps: {}
}

const modalReducer = (state = initState, action: ModalAction) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                ...action.payload
            }
        case HIDE_MODAL:
            return {
                ...state,
                modalType: null,
                modalProps: {}
            }
        default:
            return state
    }
}

export default modalReducer