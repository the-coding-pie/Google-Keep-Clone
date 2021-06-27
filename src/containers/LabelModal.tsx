import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLabel } from "../store/actions/labels";
import { hideModal } from "../store/actions/modal";
import { RootState } from "../store/reducers";
import LabelTodo from "./LabelTodo";

const LabelModal = () => {
  const { labels } = useSelector((state: RootState) => state.labels);
  const [name, setName] = useState<string>("");

  const dispatch = useDispatch();

  const keyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newLabel = name.trim();
      let oldLabel = labels.filter((label) => label.name === newLabel);

      if (name !== "" && oldLabel.length === 0) {
        dispatch(addLabel(newLabel));
        setName("");
      }
    }
  };

  return (
    <div className="bg-white p-3 max-h-96 overflow-y-auto rounded w-min h-full">
      <h3 className="text-base font-semibold mb-3 text-gray-800">
        Edit labels
      </h3>

      <form className="flex items-center mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon-sm mr-1 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <input
          type="text"
          value={name}
          onKeyDown={keyHandler}
          onChange={(e) => setName(e.target.value)}
          placeholder="Create new label"
          className="p-2"
          autoFocus
        />
      </form>

      <div className="labels text-gray-800">
        {labels.length > 0 &&
          labels.map((label) => <LabelTodo key={label.id} label={label} />)}
      </div>

      <div className="close-btn flex mt-4 justify-end">
        <button className="close-btn" onClick={() => dispatch(hideModal())}>
          Close
        </button>
      </div>
    </div>
  );
};

export default LabelModal;
