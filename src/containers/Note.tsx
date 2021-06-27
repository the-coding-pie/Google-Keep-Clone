import React from "react";
import { useDispatch } from "react-redux";
import { NOTE_MODAL, TEXT } from "../shared/constants";
import { NoteObj } from "../shared/types";
import { showModal } from "../store/actions/modal";
import TodoNote from "./TodoNote";
import Extras from "./Extras";
import { updateNote } from "../store/actions/notes";
import { useState } from "react";

interface Props {
  note: NoteObj;
  fromNote: boolean;
}

const Note: React.FC<Props> = ({ note, fromNote }) => {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);

  // if note is empty
  const EmptyComponent = (
    <div className="pt-4 px-3 pb-4 text-xl text-gray-400">Emtpy Note</div>
  );

  return (
    <div
      id="note"
      className="note relative rounded shadow w-64 text-gray-900 cursor-default"
      style={{
        background: note.color,
      }}
      onMouseEnter={(e) => setHover(true)}
      onMouseLeave={(e) => setHover(false)}
      onClick={(e) => {
        const event = e.target as HTMLElement;

        if (event.parentElement!.id === "note") {
          dispatch(
            showModal({
              modalType: NOTE_MODAL,
              modalProps: {
                actualNote: note,
                fromNote,
              },
            })
          );
        }
      }}
    >
      {/* title */}
      {note.title !== "" && (
        <h3 className="font-semibold text-lg pt-3 px-3">{note.title}</h3>
      )}

      {/* content */}
      {/* if content is text */}
      {note.type === TEXT ? (
        note.content !== "" || note.title !== "" ? (
          <div className="text p-3 break-all mr-6" contentEditable={false}>
            {note.content}
          </div>
        ) : (
          EmptyComponent
        )
      ) : note.content.length > 0 || note.title !== "" ? (
        <TodoNote {...{ note }} />
      ) : (
        EmptyComponent
      )}

      {/* lables section */}
      {note.labels.length > 0 && (
        <ul className="labels px-3 mt-2 flex items-center flex-wrap">
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

      {/* extras */}
      <div className="extras flex px-2 justify-end mt-3 items-center h-10">
        <div className="options">
          {hover === true && <Extras {...{ note, fromNote }} />}
        </div>
      </div>

      <div className="pin-btn">
        {hover === true && (
          <button
            className="btn absolute right-1 top-1"
            onClick={(e) => {
              e.preventDefault();

              dispatch(
                updateNote({
                  ...note,
                  isPinned: !note.isPinned,
                })
              );
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
        )}
      </div>
    </div>
  );
};

export default Note;
