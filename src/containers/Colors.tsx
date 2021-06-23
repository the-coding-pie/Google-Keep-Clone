import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatcher, Note } from "../shared/types";

interface Props {
  note: Note;
  setNote: Dispatcher<Note>;
  fromNote: boolean;
}

const Colors: React.FC<Props> = ({ note, setNote, fromNote }) => {
  const colors: string[] = [
    "#FFFFFF",
    "#F28B82",
    "#FBBD33",
    "#FEF175",
    "#C8F08F",
    "#A5F8EA",
    "#CBF0F8",
    "#AECBFA",
    "#D7AEFB",
    "#F8CFE7",
    "#E6C9A8",
    "#E8EAED",
  ];

  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {};

  return <div>Colors</div>;
};

export default Colors;
