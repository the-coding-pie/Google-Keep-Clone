import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { showModal } from "../store/actions/modal";
import { LABEL_MODAL } from "../shared/constants";
import { RootState } from "../store/reducers";

const Sidebar = () => {
  const { labels } = useSelector((state: RootState) => state.labels);

  const dispatch = useDispatch();

  return (
    <aside className="fixed w-52 h-screen bg-white shadow left-0 top-14 bottom-0 right-0">
      <ul className="main border-b mb-2.5">
        <li>
          <NavLink
            exact
            to="/"
            className="flex items-center w-full px-4 py-3 text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon-sm mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="mt-0.5 text-sm">Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/settings"
            className="flex items-center w-full px-4 py-3 text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon-sm mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="mt-0.5 text-sm">Settings</span>
          </NavLink>
        </li>
      </ul>

      {/* labels */}
      <ul>
        <div className="title flex justify-between items-center px-4 mb-1">
          <h3 className="text-xs font-semibold text-gray-700">LABELS</h3>
          {/* edit label button */}
          <button
            aria-label="Edit labels"
            className="rounded-full p-2 hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                showModal({
                  modalType: LABEL_MODAL,
                  modalProps: {},
                })
              );
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon-xs text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        </div>

        {/* tags */}
        <ul className="tags text-gray-700 text-sm">
          {labels.length > 0 &&
            labels.map((label) => (
              <li key={label.id}>
                <NavLink
                  exact
                  to={`/label/${label.name}`}
                  className="flex items-center px-4 py-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon-xs mr-2"
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
                  <span>
                    {label.name.length > 14
                      ? label.name.substring(0, 14) + "..."
                      : label.name}
                  </span>
                </NavLink>
              </li>
            ))}
        </ul>
      </ul>
    </aside>
  );
};

export default Sidebar;
