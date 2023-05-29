import React from "react";
import PresonalIcome from "../assets/images/logo_Presonal_Income.png";
import "../styles/desktopHeader.css";
import { Link } from "react-router-dom";
import { storageKeys } from "../constants/storage";
import * as Storage from "../utils/storage";
import { FiLogOut } from "react-icons/fi";

var username = Storage.getString(storageKeys.USER);

const DesktopHeader = () => {
  const logoutHandler = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="desktop_header d-lg-flex d-none sidebars">
      <div
        className="container d-flex flex-row align-items-center p-0"
        style={{ marginLeft: "1%" }}
      >
        <Link
          to="/"
          rel="noopener noreferrer"
          className="h-100 d-flex align-items-center"
        >
          <img
            alt=""
            src={PresonalIcome}
            style={{ width: "110px", marginLeft: "20px" }}
          />
        </Link>
      </div>
      {username ? (
        <div
          className="nav-form"
          style={{ padding: "4px 0px", display: "flex", marginRight: "1.8%" }}
        >
          <Link
            style={{
              display: "flex",
              alignItems: "center",
              float: "left",
              textDecoration: "none",
            }}
            onClick={() => {
              logoutHandler();
            }}
          >
            <FiLogOut color="black" size={18} style={{ marginRight: "5px" }} />
            <span
              className="mr-1 ml-1 nav-item"
              style={{
                color: "#000000",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              Logout
            </span>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default DesktopHeader;
