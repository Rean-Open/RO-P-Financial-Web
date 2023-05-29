import React, { useState } from "react";
import "../../styles/account.css";
import { validatePassword } from "../../utils/validation";
import { CHANGE_PASSWORD } from "../../api/urls";
import API from "../../utils/request";
import LoadingOverlay from "../../containers/loading/loadingOverlay";
import MessageModalMain from "../../containers/modal/messageModalMain";
import { useRef } from "react";

const Account = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordInvalid, setCurrentPasswordInvalid] = useState("");
  const [repassword, setRepassword] = useState("");
  const [password, setPassword] = useState("");
  const [rePasswordInvalid, setRePasswordInvalid] = useState("");
  const [newPasswordInvalid, setNewPasswordInvalid] = useState("");
  const [emptyField, setEmptyField] = useState("");
  const [loading, setLoading] = useState(false);
  const messageModalRef = useRef("rememberMe");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword) {
      setCurrentPasswordInvalid("Please enter an current password!");
      return false;
    }
    if (!password || !repassword) {
      setEmptyField("This field cannot be empty");
      return false;
    } else if (password !== repassword) {
      setRePasswordInvalid("Please make sure the password matches");
      return false;
    } else if (!validatePassword(password)) {
      setNewPasswordInvalid(
        "New password should be 8 to 32 characters long, and include numbers, uppercase, and lowercase letters"
      );
      return false;
    }
    setLoading(true);
    API.get(
      `${CHANGE_PASSWORD}?id=${1}&oldPassword=${currentPassword}&newPassword=${repassword}`
    )
      .then((res) => {
        setLoading(false);
        if (res.data === "success") {
          messageModalRef.current.showSuccess("You have successfully");
          setCurrentPassword("");
          setPassword("");
          setRepassword("");
        } else {
          messageModalRef.current.showWarning("Old Password is incorrect");
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        return false;
      });
  };
  return (
    <div
      className="container"
      style={{
        marginLeft: "10px",
        paddingRight: "40px",
        marginTop: "80px",
        marginBottom: "40px",
      }}
    >
      {loading ? <LoadingOverlay /> : null}
      <div className="pb-5 pt-5" style={{ marginLeft: "25%" }}>
        <div className="pt-5">
          <h2 htmlFor="basic-url" className="size20700 mt-3">
            Change Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 col-md-8 col-sm-12">
                <label className="labelTextLogin">
                  Current Password <span className="text-danger">*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="password"
                    className={`form-control ${
                      currentPasswordInvalid && !currentPassword
                        ? "is-invalid"
                        : ""
                    }`}
                    style={{
                      height: "50px",
                      paddingLeft: "15px",
                      paddingRight: "15px",
                    }}
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                    }}
                  />
                  <div className="invalid-feedback">
                    {currentPasswordInvalid && !currentPassword
                      ? currentPasswordInvalid
                      : ""}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-8 col-sm-12">
                <label className="labelTextLogin">
                  Current Password <span className="text-danger">*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="password"
                    autocomplete="new-password"
                    className={`form-control newPassword ${
                      (emptyField && !password) || newPasswordInvalid
                        ? "is-invalid"
                        : ""
                    }`}
                    style={{
                      height: "50px",
                    }}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setEmptyField("");
                      setNewPasswordInvalid("");
                    }}
                  />
                  <div className="invalid-feedback">
                    {emptyField && !password
                      ? emptyField
                      : newPasswordInvalid
                      ? newPasswordInvalid
                      : ""}
                  </div>
                  {newPasswordInvalid ? null : (
                    <small
                      className=""
                      style={{
                        fontSize: "14px",
                        color: "#949494",
                        fontWeight: 400,
                      }}
                    >
                      New password should be 8 to 32 characters long, and
                      include numbers, uppercase, and lowercase letters
                    </small>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-8 col-sm-12">
                <label className="labelTextLogin">
                  Current Password <span className="text-danger">*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="password"
                    autocomplete="new-password"
                    className={`form-control newPassword ${
                      (emptyField && !repassword) || rePasswordInvalid
                        ? "is-invalid"
                        : ""
                    }`}
                    style={{
                      height: "50px",
                    }}
                    value={repassword}
                    onChange={(e) => {
                      setRepassword(e.target.value);
                      setEmptyField("");
                      setRePasswordInvalid("");
                    }}
                  />
                  <div className="invalid-feedback">
                    {emptyField && !repassword
                      ? emptyField
                      : rePasswordInvalid
                      ? rePasswordInvalid
                      : ""}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-8 col-sm-12">
              <button
                className="button_auth button_body"
                style={{ marginTop: "32px" }}
                onClick={(e) => {
                  handleSubmit(e);
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
                  Save
                </p>
              </button>
            </div>
          </form>
        </div>
      </div>
      <MessageModalMain textCentered ref={messageModalRef} />
    </div>
  );
};

export default Account;
