import React, { useRef, useState } from "react";
import { LOGIN_URL } from "../../api/urls";
import LoadingOverlay from "../../containers/loading/loadingOverlay";
import "../../styles/login.css";
import API from "../../utils/request";
import MessageModalMain from "../../containers/modal/messageModalMain";
import { storageKeys } from "../../constants/storage";
import * as Storage from "../../utils/storage";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [passwordInvalid, setPasswordInvalid] = useState("");
  const [usernameInvalid, setUsernameInvalid] = useState("");
  const [username, setUsername] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const messageModalRef = useRef("rememberMe");
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem(storageKeys.USER)) {
      window.location.href = "/";
    }
  }, []);

  const handleHide = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      setUsernameInvalid("Please enter your username!");
      return false;
    }
    if (!password) {
      setPasswordInvalid("Please enter your password!");
      return false;
    }

    setLoading(true);
    API.post(LOGIN_URL, {
      username: username,
      password: password,
    })
      .then((res) => {
        setLoading(false);
        if (res.data) {
          Storage.setJson(storageKeys.USER, res.data);
          window.location.href = "/";
        } else {
          messageModalRef.current.showWarning("Username or password is incorrect");
          return false;
        }
      })
      .catch((err) => {
        console.log("Error", err);
        setLoading(false);
      });
  };
  if (localStorage.getItem(storageKeys.USER)) {
    return null;
  }
  return (
    <div className="" style={{ marginTop: "120px", marginBottom: "120px" }}>
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
              to="/login"
              className="headerh3"
              style={{
                fontWeight: `${location.pathname === "/login" ? "700" : "400"}`,
                color: "black",
                textDecoration: "none",
              }}
            >
              Login
            </Link>

            <div
              style={{
                width: "1px",
                height: "100%",
                backgroundColor: "black",
                marginLeft: "16px",
                marginRight: "16px",
              }}
            />

            <Link
              to="/register"
              className="headerh3"
              style={{
                fontWeight: `${
                  location.pathname === "/register" ? "700" : "400"
                }`,
                color: "black",
                textDecoration: "none",
              }}
            >
              Register
            </Link>
          </div>
          {loading ? <LoadingOverlay /> : null}
          <MessageModalMain textCentered ref={messageModalRef} />
          <form onSubmit={handleSubmit}>
            <div className="">
              <label className="labelTextLogin">
                Username/Email <span className="text-danger">*</span>
              </label>
              <div style={{ position: "relative" }}>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`form-control ${
                    usernameInvalid && !username ? "is-invalid" : ""
                  }`}
                  style={{
                    height: "50px",
                    marginBottom: "5px",
                  }}
                />
                <div className="invalid-feedback">
                  {usernameInvalid && !username ? usernameInvalid : ""}
                </div>
              </div>
            </div>
            <div>
              <label className="labelTextLogin">
                Password <span className="text-danger">*</span>
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={passwordShown ? "text" : "password"}
                  className={`form-control ${
                    passwordInvalid && !password ? "is-invalid" : ""
                  }`}
                  style={{
                    height: "50px",
                  }}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <div className="invalid-feedback">
                  {passwordInvalid && !password ? passwordInvalid : ""}
                </div>
                {passwordInvalid && !password ? (
                  ""
                ) : (
                  <div
                    onClick={() => handleHide()}
                    alt=""
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      margin: "15px 15px",
                      cursor: "pointer",
                    }}
                  >
                    {passwordShown ? (
                      <AiFillEye size={24} />
                    ) : (
                      <AiFillEyeInvisible size={24} />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="text-right mr-2 mt-4 text-center">
              <Link
                to="/forget-password"
                style={{ color: "black", fontSize: "16px", fontWeight: 700 }}
              >
                Forgot your Password?
              </Link>
            </div>
            <button
              className="button_auth button_body mb-5"
              style={{ marginTop: "32px" }}
              onSubmit={() => handleSubmit()}
            >
              <p
                style={{
                  fontWeight: "800",
                  fontSize: "16px",
                  marginBottom: "0",
                  color: "white",
                }}
              >
                Log In
              </p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
