import React from "react";
import "../../styles/login.css";
import { Link } from "react-router-dom";
import { storageKeys } from "../../constants/storage";
import * as Storage from "../../utils/storage";

const ConfimSuccessPage = () => {
  var username = Storage.getString(storageKeys.USER);
  const logoutHandler = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="" style={{ marginTop: "100px", marginBottom: "120px" }}>
      <div className="col-12 mt-5 carborderd auth_body bg-white">
        <div className="">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: "25px",
              marginTop: "20px",
            }}
          >
            <Link
              to="#!"
              className="headerh3"
              style={{
                fontWeight: "700",
                color: "black",
                textDecoration: "none",
              }}
            >
              Congratulations!
            </Link>
          </div>
          <div>
            <div className="text-center">
              <label
                className="labelTextLogin text-center"
                style={{ fontWeight: 400 }}
              >
                You have successfully set up your account.
              </label>
            </div>
            <button
              className="button_auth button_body mb-5"
              style={{ marginTop: "32px" }}
              onClick={() => {
                logoutHandler();
              }}
            >
              <p
                style={{
                  fontWeight: "800",
                  fontSize: "16px",
                  marginBottom: "0",
                  color: "white",
                }}
              >
                Back to Log in
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfimSuccessPage;
