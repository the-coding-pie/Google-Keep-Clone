import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteLabel, updateLabel } from "../store/actions/labels";
import { LabelObj } from "../shared/types";
import { RootState } from "../store/reducers";

interface Props {
  label: LabelObj;
}

const LabelTodo: React.FC<Props> = ({ label }) => {
  const initialValue = label.name;

  const { labels } = useSelector((state: RootState) => state.labels);
  const [labelName, setLabelName] = useState(label.name);
  const [readOnly, setReadOnly] = useState(true);

  const dispatch = useDispatch();

  const handleUpdate = () => {
    let oldLabel = labels.filter((label) => label.name === labelName.trim());
    
    if (labelName.trim() !== initialValue && oldLabel.length === 0 && labelName.trim() !== "") {
      // some updates have been performed
      dispatch(
        updateLabel({
          id: label.id,
          name: labelName.trim(),
        })
      );
    } else {
      setLabelName(initialValue);
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    dispatch(deleteLabel(label.id));
  };

  useEffect(() => {
    const handler = setTimeout(() => handleUpdate(), 500);

    return () => {
      clearTimeout(handler);
    };
  }, [labelName]);

  return (
    <div className="flex items-center">
      {/* delete btn */}
      <button className="delete-btn" onClick={handleDelete}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon-sm text-gray-400 hover:text-gray-500 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <input
        type="text"
        value={labelName}
        onChange={(e) => setLabelName(e.target.value)}
        className="p-2"
        readOnly={readOnly}
        contentEditable={readOnly}
        onFocus={() => setReadOnly(false)}
        onBlur={() => setReadOnly(true)}
      />

      {/* update-btn */}
      {readOnly === false && (
        <button onClick={() => handleUpdate()}>
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default LabelTodo;
