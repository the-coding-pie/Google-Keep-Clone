import { TodoObj } from "./types";

// convert text to todos
export const textToTodos = (text: any): TodoObj[] => {
    if (text !== "" && text !== null) {
        const todos: TodoObj[] = text.split("\n").map((todo: string) => {
            return {
                id: (Math.random() * 10).toString() ,
                item: todo,
                checked: false,
            };
        });
        return todos.filter(todo => todo.item !== "")
    } else {
        return [];
    }
};

// convert todos to text
export const todosToText = (todos: TodoObj[]) => {
    if (todos.length > 0) {
        return todos
            .map((item) => {
                return item.item;
            })
            .join("\n");
    } else {
        return null;
    }
};
