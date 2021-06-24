import React, { useEffect } from "react";
import { useState } from "react";
import { Dispatcher, NoteObj, TodoObj } from "../shared/types";

interface Props {
  note: NoteObj;
  setNote: Dispatcher<NoteObj>;
}

const AddTodo: React.FC<Props> = ({ note, setNote }) => {
  const [todo, setTodo] = useState<string>("");

  const [unDoneTodos, setUnDoneTodos] = useState<TodoObj[]>([]);
  const [doneTodos, setDoneTodos] = useState<TodoObj[]>([]);

  const [hasToggled, setHasToggled] = useState<boolean>(false);

  const addTodo = () => {
    if (todo !== "") {
      setNote((prevValue) => {
        return {
          ...prevValue,
          content: [
            ...(prevValue.content as TodoObj[]),
            {
              id: (Math.random() * 10).toString(),
              item: todo,
              checked: false,
            },
          ],
        };
      });

      // empty the input box
      setTodo("");
    }
  };

  const keyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTodo();
    }
  };

  const handleToggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setHasToggled(!hasToggled);
  };

  const handleCheck = (todo: TodoObj) => {
    const content = note.content as TodoObj[];
    const newTodos = content.map((t) => {
      if (t === todo) {
        t.checked = !t.checked;
      }
      return t;
    });

    setNote((prevValue) => {
      return {
        ...prevValue,
        content: newTodos,
      };
    });
  };

  useEffect(() => {
    if (note.content.length > 0) {
      const getUnDoneTodos = () => {
        const content = note.content as TodoObj[];
        return content.filter((item) => item.checked === false);
      };

      const getDoneTodos = () => {
        const content = note.content as TodoObj[];
        return content.filter((item) => item.checked === true);
      };

      setUnDoneTodos(getUnDoneTodos());
      setDoneTodos(getDoneTodos());
    }
  }, [note.content]);

  return (
    <div className="todo text-gray-500 w-full">
      {/* todo add box */}
      <div className="items w-full mb-2">
        {/* todos */}
        {unDoneTodos.length > 0 &&
          unDoneTodos.map((todo) => (
            <div key={todo.id} className="px-4 py-1">
              <input
                type="checkbox"
                onClick={() => handleCheck(todo)}
                className="mr-3"
              />
              <span>{todo.item}</span>
            </div>
          ))}

        {/* add-item input box */}
        <div className="add-item px-4 flex items-center w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon-sm mr-2 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            onKeyDown={keyHandler}
            autoFocus={true}
            type="text"
            placeholder="List item"
            className="w-full bg-transparent"
          />
        </div>

        {/* checked todos */}
        {doneTodos.length > 0 && (
          <div className="checked-todos">
            <div
              className="px-4 my-2 border-t pt-2 flex items-center hover:text-gray-800 cursor-pointer"
              onClick={handleToggle}
            >
              <button className="mr-2">
                {hasToggled === true ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon-xs"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon-xs"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </button>
              <span>{doneTodos.length} Completed Item(s)</span>
            </div>
            {hasToggled === true &&
              doneTodos.map((todo) => (
                <div key={todo.id} className="px-4 py-1">
                  <input
                    type="checkbox"
                    onClick={() => handleCheck(todo)}
                    checked={true}
                    readOnly
                    className="mr-3"
                  />
                  <span className="line-through">{todo.item}</span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTodo;
