import { useState } from "react";
import { useDispatch } from "react-redux";
import useClose from "../hooks/useClose";
import { TEXT, TODO } from "../shared/constants";
import { Dispatcher, NoteObj, TodoObj } from "../shared/types";
import { textToTodos, todosToText } from "../shared/utils";
import { hideModal } from "../store/actions/modal";
import { deleteNote, updateNote } from "../store/actions/notes";
import Colors from "./Colors";
import Labels from "./Labels";

interface Props {
  note: NoteObj;
  setNote?: Dispatcher<NoteObj>;
  fromNote: boolean;
}

const Extras: React.FC<Props> = ({ note, setNote, fromNote }) => {
  const [showColors, setShowColors] = useState<boolean>(false);
  const [showLabels, setShowLabels] = useState<boolean>(false);
  const dispatch = useDispatch();

  const labelsRef = useClose(() => setShowLabels(false));

  return (
    <div className="extra-options flex-1 flex items-center">
      {/* add color btn */}
      <button
        aria-label="color change btn"
        className="btn add-color relative"
        onClick={(e) => e.preventDefault()}
        onMouseEnter={() => setShowColors(true)}
        onMouseLeave={() => setShowColors(false)}
      >
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
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
        {/* colors */}
        {showColors === true && (
          <div className="absolute -left-9 right-0 bottom-5">
            <Colors {...{ note, setNote, fromNote }} />
          </div>
        )}
      </button>
      {/* labels button */}
      <div
        className="labels relative flex items-center justify-between"
        ref={labelsRef}
      >
        <button
          aria-label="label button"
          className="btn add-color"
          onClick={(e) => {
            e.preventDefault();
            setShowLabels(!showLabels);
          }}
        >
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
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
        </button>

        {/* labels */}
        {showLabels === true && (
          <div className="absolute left-3 top-4 z-50">
            <Labels {...{ note, setNote, fromNote }} />
          </div>
        )}
      </div>
      {note.type === TEXT ? (
        <button
          aria-label="toggle todo to text and vice versa"
          className="hover:bg-gray-100 hover:bg-opacity-50 hover:text-gray-900 text-gray-700 p-1 rounded-full"
          onClick={(e) => {
            e.preventDefault();

            if (!setNote) {
              const newNote: NoteObj = {
                ...note,
                type: TODO,
                content: textToTodos(note.content as string),
              };

              dispatch(updateNote(newNote));
            } else {
              if (fromNote === true) {
                const newNote: NoteObj = {
                  ...note,
                  type: TODO,
                  content: textToTodos(note.content as string),
                };

                dispatch(updateNote(newNote));
              }
              setNote((prevValue: any) => {
                return {
                  ...prevValue,
                  type: TODO,
                  content: textToTodos(prevValue.content as string),
                };
              });
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-600"
            width="21"
            height="21"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M17 19H7C5.89543 19 5 18.1046 5 17V7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7V17C19 18.1046 18.1046 19 17 19ZM7 7V17H17V7H7ZM11 15.362L8.3 12.715L9.7 11.285L11 12.556L14.3 9.289L15.7 10.711L11 15.361V15.362Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      ) : (
        <button
          aria-label="toggle todo to text and vice versa"
          className="hover:bg-gray-100 hover:bg-opacity-50 hover:text-gray-900 text-gray-700 p-1.5 rounded-full"
          onClick={(e) => {
            e.preventDefault();

            if (!setNote) {
              const newNote: NoteObj = {
                ...note,
                type: TEXT,
                content: todosToText(note.content as TodoObj[])!,
              };
              dispatch(updateNote(newNote));
            } else {
              if (fromNote === true) {
                const newNote: NoteObj = {
                  ...note,
                  type: TEXT,
                  content: todosToText(note.content as TodoObj[])!,
                };
                dispatch(updateNote(newNote));
              }
              setNote((prevValue: any) => {
                return {
                  ...prevValue,
                  type: TEXT,
                  content: todosToText(note.content as TodoObj[]),
                };
              });
            }
          }}
        >
          <svg
            className="text-gray-600"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM5 5V19H19V5H5ZM17 13H7V11H17V13Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      )}

      {/* delete-btn */}
      {fromNote === true && (
        <button
          className="btn"
          aria-label="delete button"
          onClick={(e) => {
            e.preventDefault();

            dispatch(deleteNote(note.id));

            if (setNote) {
              dispatch(hideModal());
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon-xs text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Extras;
