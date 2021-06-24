import { combineReducers } from "redux";
import labelsReducer from "./labels";
import modalReducer from "./modal";
import notesReducer from "./notes";
import sidebarReducer from "./sidebar";

const rootReducer = combineReducers({
    sidebar: sidebarReducer,
    modal: modalReducer,
    labels: labelsReducer,
    notes: notesReducer
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>