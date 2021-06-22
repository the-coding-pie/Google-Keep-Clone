import Logo from "../assets/images/logo.png";
import Searchbox from "./Searchbox";
import Avatar from "../assets/images/default.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import React from "react";
import { toggleSidebar } from "../store/actions/sidebar";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // toggle sidebar
    dispatch(toggleSidebar());
  };

  return (
    <nav className="h-14 fixed top-0 left-0 right-0 px-4 bg-white shadow z-50 flex justify-between items-center">
      <div className="left flex items-center">
        <button
          aria-label="Sidebar Toggle"
          className="hover:bg-gray-100 p-1 rounded-full mr-2"
          onClick={handleClick}
        >
          <svg
            className="icon text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 18H3V16H21V18ZM21 13H3V11H21V13ZM21 8H3V6H21V8Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>

        <Link to="/">
          <img
            src={Logo}
            alt="logo with note icon and note text"
            className="w-24"
          />
        </Link>
      </div>

      <Searchbox />

      <div className="right flex items-center">
        <button aria-label="Reload">
          <svg
            className="icon text-gray-500 mr-3"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.995 4.00001C7.8362 3.99432 4.36664 7.17599 4.01299 11.3197C3.65933 15.4634 6.53955 19.187 10.6391 19.8862C14.7387 20.5853 18.6903 18.0267 19.73 14H17.649C16.6318 16.8771 13.617 18.5324 10.6434 17.8465C7.66989 17.1605 5.68488 14.3519 6.03079 11.3199C6.3767 8.28792 8.94332 5.99856 11.995 6.00001C13.5845 6.00234 15.1064 6.64379 16.218 7.78002L13 11H20V4.00001L17.649 6.35002C16.1527 4.84464 14.1175 3.99873 11.995 4.00001Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
        <img src={Avatar} alt="avatar" className="w-8" />
      </div>
    </nav>
  );
};

export default Navbar;
