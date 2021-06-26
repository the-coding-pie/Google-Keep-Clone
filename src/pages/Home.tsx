import { useSelector } from "react-redux";
import AddNote from "../containers/AddNote";
import { TEXT } from "../shared/constants";
import { NoteObj } from "../shared/types";
import { RootState } from "../store/reducers";
import Note from "../containers/Note";

const Home = () => {
  const actualNote: NoteObj = {
    id: (Math.random() * 10).toString(),
    type: TEXT,
    isPinned: false,
    title: "",
    content: "",
    color: "#FFFFFF",
    labels: [],
  };

  const { notes } = useSelector((state: RootState) => state.notes);

  const pinnedNotes = notes.filter((note) => note.isPinned === true);
  const otherNotes = notes.filter((note) => note.isPinned !== true);

  return (
    <div>
      <div className="add-box flex items-center justify-center">
        {/* direct */}
        <AddNote {...{ actualNote, fromNote: false }} />
      </div>

      <div className="body px-4 flex flex-col items-center">
        {pinnedNotes.length > 0 && (
          <div className="pinned-notes mb-12">
            {/* pinned notes */}
            <h2 className="font-semibold pl-2 text-xs mb-2 text-gray-700">
              PINNED
            </h2>
            {/* notes */}
            <div className="notes items-start justify-items-center grid grid-cols-4 gap-4">
              {pinnedNotes.map((note) => (
                // indirect
                <Note key={note.id} {...{ note, fromNote: true }} />
              ))}
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
            <div className="notes items-start justify-items-center grid grid-cols-4 gap-4">
              {otherNotes.map((note) => (
                <Note key={note.id} {...{ note, fromNote: true }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
