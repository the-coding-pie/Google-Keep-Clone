import { SidebarAction, TOGGLE_SIDEBAR } from "../actions/sidebar"

interface SidebarState {
    show: boolean
}

const initState: SidebarState = {
    show: true
}

const sidebarReducer = (state = initState, action: SidebarAction) => {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                show: !state.show
            }
        default:
            return state
    }
}

export default sidebarReducer