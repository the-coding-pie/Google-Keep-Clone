import React from "react";
import { useDispatch } from "react-redux";
import { TEXT } from "../shared/constants";
import { Dispatcher, NoteObj } from "../shared/types";
import { updateNote } from "../store/actions/notes";

interface Props {
  show: boolean;
  setShow: Dispatcher<boolean>;
  note: NoteObj;
  setNote: Dispatcher<NoteObj>;
  fromNote: boolean;
}

const AddText: React.FC<Props> = ({
  show,
  setShow,
  note,
  setNote,
  fromNote,
}) => {
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (fromNote === true) {
      const newNote = {
        ...note,
        content: e.target.value,
      };

      dispatch(updateNote(newNote));
    }
    setNote((prevValue) => {
      return {
        ...prevValue,
        content: e.target.value,
      };
    });
  };

  return (
    <textarea
      value={note.content as string}
      onChange={(e) => handleChange(e)}
      onFocus={() => {
        setShow(true);
      }}
      name="take-a-note"
      placeholder="Take a note..."
      className={`bg-transparent px-2 w-full outline-none resize-none font-medium ${
        show === true
          ? note.type === TEXT
            ? "h-24 mb-2"
            : "hidden"
          : "h-6 mb-0"
      }`}
    ></textarea>
  );
};

export default AddText;
