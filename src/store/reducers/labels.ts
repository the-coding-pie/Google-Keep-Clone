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
                    {
                        id: (Math.random() * 10).toString(),
                        name: action.payload
                    }
                ]
            }
        case UPDATE_LABEL:
            return {
                ...state,
                labels: state.labels.map((label) => {
                    if (label.id === action.payload.id) {
                        return action.payload
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