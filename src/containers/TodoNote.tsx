import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NoteObj, TodoObj } from "../shared/types";
import { updateNote } from "../store/actions/notes";

interface Props {
  note: NoteObj;
}

const TodoNote: React.FC<Props> = ({ note }) => {
  const [doneTodos, setDoneTodos] = useState<TodoObj[]>([]);
  const [unDoneTodos, setUnDoneTodos] = useState<TodoObj[]>([]);

  const dispatch = useDispatch();

  const handleCheck = (todo: TodoObj) => {
    const content = note.content as TodoObj[];

    const newNote = content.map((t) => {
      if (t === todo) {
        t.checked = !t.checked;
      }
      return t;
    });

    dispatch(updateNote({ ...note, content: newNote }));
  };

  useEffect(() => {
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
  }, [note.content]);

  return (
    <>
      <ul className="unfinished-todos items p-3 pb-0">
        {unDoneTodos.map((todo) => (
          <li
            key={todo.id}
            className="py-1 w-auto cursor-pointer flex items-center justify-start"
            onClick={() => handleCheck(todo)}
          >
            <div className="flex items-center">
              <input type="checkbox" className="mr-3 cursor-pointer" />
            </div>
            <div>{todo.item}</div>
          </li>
        ))}
      </ul>

      {doneTodos.length > 0 && (
        <div className="p-3 pt-0 mt-2">
          + {doneTodos.length} Completed Item(s)
        </div>
      )}
    </>
  );
};

export default TodoNote;
