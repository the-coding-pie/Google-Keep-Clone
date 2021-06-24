import { LABEL_MODAL, NOTE_MODAL } from "../../shared/constants";
import { ModalObj } from "../../shared/types";
import { HIDE_MODAL, ModalAction, SHOW_MODAL } from "../actions/modal";


const initState: ModalObj = {
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