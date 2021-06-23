import React from "react";
import { TEXT, TODO } from "./constants";

// dispatcher
export type Dispatcher<S> = React.Dispatch<React.SetStateAction<S>>

// note
export interface Note {
    id: string;
    type: typeof TEXT;
    isPinned: boolean;
    title: string;
    content: string | LabelObj[];
    color: string;
    labels: LabelObj[];
}

// todo
export interface Todo {
    id: string;
    item: string,
    checked: boolean;
}

// label types
export interface LabelObj {
    id: string;
    name: string;
}