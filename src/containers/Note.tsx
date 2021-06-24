import React from "react";
import { useDispatch } from "react-redux";
import { NOTE_MODAL, TEXT } from "../shared/constants";
import { NoteObj } from "../shared/types";
import { showModal } from "../store/actions/modal";
import TodoNote from "./TodoNote";
import Extras from "./Extras";

interface Props {
  note: NoteObj;
}

const Note: React.FC<Props> = ({ note }) => {
  const dispatch = useDispatch();

  // if note is empty
  const EmptyComponent = (
    <div className="pt-4 px-3 text-xl text-gray-400">Emtpy Note</div>
  );

  return (
    <div
      id="note"
      className="note relative rounded shadow w-64 text-gray-900 cursor-default"
      style={{
        background: note.color,
      }}
      onClick={(e) => {
        const event = e.target as HTMLElement;

        if (event.parentElement!.id === "note") {
          dispatch(
            showModal({
              modalType: NOTE_MODAL,
              modalProps: {
                id: note.id,
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
        note.content !== "" ? (
          <div className="text p-3" contentEditable={false}>
            {note.content}
          </div>
        ) : (
          EmptyComponent
        )
      ) : note.content.length > 0 ? (
        <TodoNote {...{ note }} />
      ) : (
        EmptyComponent
      )}

      {/* lables section */}
      {note.labels.length > 0 && (
        <ul className="labels px-3 mt-2 flex items-center">
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
      <div className="extras flex px-2 justify-between items-center h-10">
        <div className="options z-50">
          <Extras {...{ note }} />
        </div>
      </div>
    </div>
  );
};

export default Note;
