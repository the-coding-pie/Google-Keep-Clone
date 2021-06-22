
// action.type types
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR"

// action's type
interface ToggleSidebar {
    type: typeof TOGGLE_SIDEBAR
}

// combination
export type SidebarAction = ToggleSidebar


// action creators
export const toggleSidebar = (): ToggleSidebar => {
    return {
        type: TOGGLE_SIDEBAR
    }
}
