import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducers";

const Colors = ({ note, setNote, fromNote }) => {
  const colors = [
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

  const handleClicke = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {};

  return <div>
      Colors
  </div>
};

export default Colors;
