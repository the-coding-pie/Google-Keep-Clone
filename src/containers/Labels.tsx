import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useClose from "../hooks/useClose";
import { Dispatcher, LabelObj, NoteObj } from "../shared/types";
import { addLabel } from "../store/actions/labels";
import { updateNote } from "../store/actions/notes";
import { RootState } from "../store/reducers";

interface Props {
  note: NoteObj;
  setNote?: Dispatcher<NoteObj>;
  fromNote: boolean;
}

const Labels: React.FC<Props> = ({ note, setNote, fromNote }) => {
  const [label, setLabel] = useState("");
  const { labels } = useSelector((state: RootState) => state.labels);

  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const event = e.target as HTMLInputElement;
    const newLabel = event.value.trim();

    let oldLabel = labels.filter((label) => label.name === newLabel);

    // if no label like this exists, then only add it
    if (oldLabel.length === 0) {
      const l = {
        id: (Math.random() * 10).toString(),
        name: newLabel,
      };
      dispatch(addLabel(l));

      const n = {
        ...note,
        labels: [...note.labels, l],
      };

      if (!setNote) {
        dispatch(updateNote(n));
      } else {
        if (fromNote === true) {
          // dispatch
          dispatch(updateNote(n));
        }

        setNote(n);
      }
      setLabel("");
    }
  };

  const keyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleCheck = (label: LabelObj) => {
    // already present, then remove it or vice versa
    const n = note;
    const oldLabel = n.labels.filter((l) => l.name === label.name);

    if (oldLabel.length > 0) {
      // already present, so remove it
      n.labels = n.labels.filter((l) => l.name !== label.name);
    } else {
      n.labels.push(label);
    }

    if (!setNote) {
      dispatch(updateNote(n));
    } else {
      if (fromNote === true) {
        dispatch(updateNote(n));
      }
      setNote((prevValue) => {
        return {
          ...prevValue,
          n,
        };
      });
    }
  };

  return (
    <ul className="labels bg-white rounded p-2 shadow-lg text-gray-800 z-50">
      <div className="top mb-2 border-b pb-2">
        <h3 className="text-base font-bold mb-2">Label note</h3>
        <form
          className="text-sm flex items-center justify-between"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Enter label name"
            onKeyDown={keyHandler}
            autoFocus
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon-sm text-gray-600"
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
        </form>
      </div>

      <div className="max-h-52 w-full z-50 overflow-y-auto text-sm">
        {labels.length > 0 &&
          labels.map((label) => {
            return (
              <li id={label.id} className="flex items-center py-1">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={
                    note.labels.filter((l) => l.name === label.name).length > 0
                      ? true
                      : false
                  }
                  onChange={() => {
                    handleCheck(label);
                  }}
                />
                <span>{label.name}</span>
              </li>
            );
          })}
      </div>
    </ul>
  );
};

export default Labels;
