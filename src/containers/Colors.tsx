import React from "react";
import { useDispatch } from "react-redux";
import { COLORS } from "../shared/constants";
import { Dispatcher, NoteObj } from "../shared/types";

interface Props {
  note: NoteObj;
  setNote: Dispatcher<NoteObj>;
}

const Colors: React.FC<Props> = ({ note, setNote }) => {
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {};

  return (
    <ul className="colors cursor-default w-max grid grid-cols-4 grid-rows-3 gap-1 bg-white shadow rounded p-1.5 z-50">
      {COLORS.map((c) => (
        <li
          key={c}
          onClick={(e) => {
            e.preventDefault();
            setNote((prevValue) => {
              return {
                ...prevValue,
                color: c,
              };
            });
          }}
          className="color cursor-pointer w-6 h-6 rounded-full border hover:border-black flex items-center justify-center"
          style={{
            background: c,
          }}
        >
          {note.color === c && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon-sm text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Colors;
