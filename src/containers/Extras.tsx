import { useState } from "react";
import useClose from "../hooks/useClose";
import { Dispatcher, NoteObj } from "../shared/types";
import Colors from "./Colors";
import Labels from "./Labels";

interface Props {
  note: NoteObj;
  setNote?: Dispatcher<NoteObj>;
}

const Extras: React.FC<Props> = ({ note, setNote }) => {
  const [showColors, setShowColors] = useState<boolean>(false);
  const [showLabels, setShowLabels] = useState<boolean>(false);

  const labelsRef = useClose(() => setShowLabels(false));

  return (
    <div className="extra-options flex-1 flex items-center">
      {/* add color btn */}
      <button
        aria-label="color change btn"
        className="btn add-color relative"
        onClick={(e) => e.preventDefault()}
        onMouseEnter={() => setShowColors(true)}
        onMouseLeave={() => setShowColors(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon-xs"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
        {/* colors */}
        {showColors === true && (
          <div className="absolute -left-9 right-0 bottom-5">
            <Colors {...{ note, setNote }} />
          </div>
        )}
      </button>
      {/* labels button */}
      <div className="labels relative" ref={labelsRef}>
        <button
          aria-label="label button"
          className="btn add-color"
          onClick={(e) => {
            e.preventDefault();
            setShowLabels(!showLabels);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon-xs"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
        </button>
        {/* labels */}
        {showLabels === true && (
          <div className="absolute left-3 top-4 z-50">
            <Labels {...{ note, setNote, setShowLabels }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Extras;
