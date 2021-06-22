import { combineReducers } from "redux";
import labelsReducer from "./labels";
import modalReducer from "./modal";
import sidebarReducer from "./sidebar";

const rootReducer = combineReducers({
    sidebar: sidebarReducer,
    modal: modalReducer,
    labels: labelsReducer
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>