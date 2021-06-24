import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TEXT, TODO } from "../shared/constants";
import AddText from "./AddText";
import AddTodo from "./AddTodo";
import { NoteObj } from "../shared/types";
import useClose from "../hooks/useClose";
import { addNote } from "../store/actions/notes";
import Extras from "./Extras";

interface Props {
  actualNote: NoteObj;
  fromNote: boolean;
}

const AddNote: React.FC<Props> = ({ actualNote, fromNote }) => {
  const [note, setNote] = useState(actualNote);
  const [show, setShow] = useState<boolean>(fromNote);

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote((prevValue) => {
      return {
        ...prevValue,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClose = () => {
    // if note is not empty, add it then reset it
    if (note.content !== "" || note.title !== "" || note.labels.length > 0) {
      dispatch(addNote(note));
    }

    setShow(false);

    setNote({
      id: (Math.random() * 10).toString(),
      type: TEXT,
      isPinned: false,
      title: "",
      content: "",
      color: "#FFFFFF",
      labels: [],
    });
  };

  const ref = useClose(() => handleClose());

  return (
    <form
      onSubmit={handleSubmit}
      ref={ref}
      className="px-3 py-2 mb-8 shadow rounded text-gray-600"
      style={{
        width: "600px",
        background: note.color,
      }}
    >
      {show === true && (
        // top title & pin btn part
        <div className="top flex justify-between items-center mb-3">
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={(e) => handleChange}
            placeholder="Title"
            className="bg-transparent w-full px-2 font-semibold"
          />
          {/* pin button */}
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();

              setNote((prevValue) => {
                return {
                  ...prevValue,
                  isPinned: !prevValue.isPinned,
                };
              });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`icon-sm transform ${
                note.isPinned === true ? "-rotate-45" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button>
        </div>
      )}

      {/* middle section */}
      <div className="middle flex justify-between items-center">
        {/* addText */}
        <AddText {...{ show, setShow, note, setNote }} />

        {/* todo toggle btn */}
        {show === false && (
          <div className="right-btns flex- items-center">
            <button
              className="btn check-box"
              onClick={() => {
                setShow(true);
                setNote((prevValue) => {
                  return {
                    ...prevValue,
                    type: TODO,
                  };
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon-sm"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </button>
          </div>
        )}

        {/* todo part */}
        {show === true && note.type === TODO && (
          <AddTodo {...{ note, setNote }} />
        )}
      </div>

      {/* labels */}
      <div className="labels">
        {note.labels.length > 0 && (
          <ul className="labels px-3 mt-4 flex items-center mb-1.5">
            {note.labels.map((label) => (
              <li
                key={label.id}
                className="label mr-1 mb-1 last:mr-0 last:mb-0 bg-gray-300 bg-opacity-50 rounded-full px-1 text-xs"
              >
                {label.name.length > 7
                  ? label.name.substring(0, 7) + "..."
                  : label.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* bottom */}
      {show === true && (
        <div className="bottom extras flex items-center text-gray-800">
          <div className="left relative z-50">
            <Extras {...{ note, setNote }} />
          </div>
          <div className="right flex-1 flex items-center justify-end">
            <button className="text-sm close-btn" onClick={() => handleClose()}>
              Close
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default AddNote;
