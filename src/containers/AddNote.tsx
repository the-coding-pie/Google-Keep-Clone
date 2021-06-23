import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatcher, Note } from "../shared/types";

interface Props {
  actualNote: Note;
  setNote: Dispatcher<Note>;
  fromNote: boolean;
}

const AddNote: React.FC<Props> = ({ actualNote, fromNote }) => {
    const [note, setNote] = useState(actualNote)
  const [show, setShow] = useState<boolean>(fromNote);

  const dispatch = useDispatch();

  const handleChange = ((e: React.ChangeEvent<HTMLInputElement>) => {
      setNote(prevValue => {
          return {
              ...prevValue,
              [e.target.name]: e.target.value
          }
      })
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
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
            onChange={e => handleChange}
            placeholder="Title"
            className="bg-transparent w-full px-2 font-semibold"
          />
          {/* pin button */}
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();

              setNote(prevValue => {
                  return {
                      ...prevValue,
                      isPinned: !prevValue.isPinned
                  }
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
    </form>
  );
};

export default AddNote;
