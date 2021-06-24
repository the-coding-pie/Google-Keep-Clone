import React from "react";
import { TEXT } from "../shared/constants";
import { Dispatcher, NoteObj } from "../shared/types";

interface Props {
  show: boolean;
  setShow: Dispatcher<boolean>;
  note: NoteObj;
  setNote: Dispatcher<NoteObj>;
}

const AddText: React.FC<Props> = ({ show, setShow, note, setNote }) => {
  return (
    <textarea
      value={note.content as string}
      onChange={(e) =>
        setNote((prevValue) => {
          return {
            ...prevValue,
            content: e.target.value,
          };
        })
      }
      onFocus={() => {
        setShow(true);
      }}
      name="take-a-note"
      placeholder="Take a note..."
      className={`bg-transparent px-2 w-full outline-none resize-none font-medium ${
        show === true
          ? note.type === TEXT
            ? "h-28 mb-2"
            : "hidden"
          : "h-6 mb-0"
      }`}
    ></textarea>
  );
};

export default AddText;
