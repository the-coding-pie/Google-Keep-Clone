import { useSelector } from "react-redux";
import AddNote from "../containers/AddNote";
import { TEXT } from "../shared/constants";
import { NoteObj } from "../shared/types";
import { RootState } from "../store/reducers";
import Note from "../containers/Note";
import Masonry from "react-masonry-css";
import { RouteComponentProps } from "react-router-dom";

const LabelFilter: React.FC<RouteComponentProps> = ({ match }) => {
  const { params } = match;

  const { label } = params as {
    label: string;
  };

  const actualNote: NoteObj = {
    id: (Math.random() * 10).toString(),
    type: TEXT,
    isPinned: false,
    title: "",
    content: "",
    color: "#FFFFFF",
    labels: [],
  };

  let { notes } = useSelector((state: RootState) => state.notes);

  if (label !== "") {
    let notesWithLabel: NoteObj[] = [];

    notes.forEach((note) => {
      note.labels.forEach((l) => {
        if (l.name === label) {
          notesWithLabel.push(note);
        }
      });
    });

    if (notesWithLabel.length > 0) {
      notes = notesWithLabel;
    }
  }

  const pinnedNotes = notes.filter((note) => note.isPinned === true);
  const otherNotes = notes.filter((note) => note.isPinned !== true);

  return (
    <div
      className="m-auto"
      style={{
        width: "1100px",
      }}
    >
      <div className="add-box flex items-center justify-center">
        {/* direct */}
        <AddNote {...{ actualNote, fromNote: false }} />
      </div>

      {notes.length > 0 ? (
        <div className="body w-full flex flex-col">
          {pinnedNotes.length > 0 && (
            <div className="pinned-notes mb-12">
              {/* pinned notes */}
              <h2 className="font-semibold pl-2 text-xs mb-2 text-gray-700">
                PINNED
              </h2>
              {/* notes */}
              <div className="notes">
                <Masonry
                  breakpointCols={{
                    default: 4,
                    1200: 4,
                    1024: 3,
                    768: 2,
                    576: 1,
                  }}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {pinnedNotes.map((note) => (
                    // indirect
                    <Note key={note.id} {...{ note, fromNote: true }} />
                  ))}
                </Masonry>
              </div>
            </div>
          )}

          {/* other notes */}
          {otherNotes.length > 0 && (
            <div className="pinned-notes">
              {/* other notes */}
              {pinnedNotes.length > 0 && (
                <h2 className="font-semibold pl-2 text-xs mb-2 text-gray-700">
                  OTHERS
                </h2>
              )}
              {/* notes */}
              <div className="notes">
                <Masonry
                  breakpointCols={{
                    default: 4,
                    1200: 4,
                    1024: 3,
                    768: 2,
                    576: 1,
                  }}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {otherNotes.map((note) => (
                    <Note key={note.id} {...{ note, fromNote: true }} />
                  ))}
                </Masonry>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center text-gray-700">Wow, such empty!</div>
      )}
    </div>
  );
};

export default LabelFilter;
