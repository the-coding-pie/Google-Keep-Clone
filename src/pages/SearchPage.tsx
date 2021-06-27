import { useSelector } from "react-redux";
import AddNote from "../containers/AddNote";
import { TEXT, TODO } from "../shared/constants";
import { NoteObj, TodoObj } from "../shared/types";
import { RootState } from "../store/reducers";
import Note from "../containers/Note";
import Masonry from "react-masonry-css";
import { RouteComponentProps } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { todosToText } from "../shared/utils";

const SearchPage: React.FC<RouteComponentProps> = ({ match }) => {
  const { params } = match;

  const { search } = params as {
    search: string;
  };

  let { notes: n } = useSelector((state: RootState) => state.notes);
  //   copy of original notes
  const initNotes = n;

  const [notes, setNotes] = useState(n);

  useEffect(() => {
    const newNotes = initNotes.filter((note) => {
      if (note.content.length > 0 && note.content !== null) {
        const content: any =
          note.type === TODO
            ? todosToText(note.content as TodoObj[])
            : note.content;
        let labels = "";

        note.labels.forEach((l) => {
          labels += l.name;
        });

        return (
          note.title.includes(search) ||
          content.includes(search) ||
          labels.includes(search)
        );
      }
    });

    if (newNotes.length > 0) {
      setNotes(newNotes);
    } else {
      if (search === "" || search === undefined) {
        setNotes(initNotes);
      } else {
        setNotes([]);
      }
    }
  }, [search]);

  const pinnedNotes = notes.filter((note) => note.isPinned === true);
  const otherNotes = notes.filter((note) => note.isPinned !== true);

  return (
    <div
      className="m-auto"
      style={{
        width: "1100px",
      }}
    >
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
        <div>Oops No Notes Found</div>
      )}
    </div>
  );
};

export default SearchPage;
