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
        <img src={Avatar} alt="avatar" className="w-8" />
      </div>
    </nav>
  );
};

export default Navbar;
