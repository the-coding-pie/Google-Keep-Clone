import React from "react";
import { NoteObj } from "../shared/types";
import AddNote from "./AddNote";

interface Props {
  modalProps: Object;
}

const NoteModal: React.FC<Props> = ({ modalProps }) => {
  const { actualNote, fromNote } = modalProps as {
    actualNote: NoteObj;
    fromNote: boolean;
  };
  return <AddNote {...{ actualNote, fromNote }} />;
};

export default NoteModal;
