import { LabelObj } from "../../shared/types";
import { ADD_LABEL, DELETE_LABEL, LabelAction, UPDATE_LABEL } from "../actions/labels";

interface LabelState {
    labels: LabelObj[]
}

const initState: LabelState = {
    labels: []
}

const labelsReducer = (state = initState, action: LabelAction) => {
    switch (action.type) {
        case ADD_LABEL:
            return {
                ...state,
                labels: [
                    ...state.labels,
                    action.payload
                ]
            }
        case UPDATE_LABEL:
            return {
                ...state,
                labels: state.labels.map((label) => {
                    if (label.id === action.payload.id) {
                        return {
                            ...label,
                            name: action.payload.name
                        }
                    }
                    return label;
                }),
            };
        case DELETE_LABEL:
            return {
                ...state,
                labels: state.labels.filter((label) => {
                    return label.id !== action.payload;
                }),
            };
        default:
            return state
    }
}

export default labelsReducer