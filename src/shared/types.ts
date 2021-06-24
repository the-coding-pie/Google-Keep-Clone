import React from "react";
import { LABEL_MODAL, NOTE_MODAL, TEXT, TODO } from "./constants";

// dispatcher
export type Dispatcher<S> = React.Dispatch<React.SetStateAction<S>>

// modal
export interface ModalObj {
    modalType: typeof LABEL_MODAL | typeof NOTE_MODAL | null,
    modalProps: Object
}

// note
export interface NoteObj {
    id: string;
    type: typeof TEXT | typeof TODO;
    isPinned: boolean;
    title: string;
    content: string | TodoObj[];
    color: string;
    labels: LabelObj[];
}

// todo
export interface TodoObj {
    id: string;
    item: string,
    checked: boolean;
}

// label types
export interface LabelObj {
    id: string;
    name: string;
}