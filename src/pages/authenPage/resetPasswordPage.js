import React, { useRef, useState } from "react";
import { RESET_PASSWORD } from "../../api/urls";
import LoadingOverlay from "../../containers/loading/loadingOverlay";
import "../../styles/login.css";
import API from "../../utils/request";
import MessageModalMain from "../../containers/modal/messageModalMain";
import { storageKeys } from "../../constants/storage";
import * as Storage from "../../utils/storage";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/validation";

const ResetPasswordPage = (props) => {
  const [emailInvalid, setEmailInvalid] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const messageModalRef = useRef("rememberMe");
  const [emailValidate, setEmailValidate] = useState("");

  //   const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem(storageKeys.USER)) {
      window.location.href = "/";
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailInvalid("Please enter your email!");
      return false;
    }
    if (email) {
      if (!validateEmail(email)) {
        setEmailValidate("Email is Invalid!");
        setLoading(false);
        return false;
      }
    }
    setLoading(true);
    API.get(`${RESET_PASSWORD}?email=${email}`)
      .then((res) => {
        setLoading(false);
        if (res.data) {
          Storage.setJson(storageKeys.USER, res.data);
          window.location.href = "/verification-methods";
        } else {
          messageModalRef.current.showWarning(res.data.msg);
          return false;
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div className="" style={{ marginTop: "100px", marginBottom: "120px" }}>
      <div className="col-12 mt-3 carborderd auth_body bg-white">
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
              Verification Account
            </Link>
          </div>
          {loading ? <LoadingOverlay /> : null}
          <MessageModalMain textCentered ref={messageModalRef} />
          <form onSubmit={handleSubmit}>
            <div className="">
              <label className="labelTextLogin">
                Email <span className="text-danger">*</span>
              </label>
              <div style={{ position: "relative" }}>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailValidate("");
                  }}
                  className={`form-control ${
                    (emailInvalid && !email) || emailValidate
                      ? "is-invalid"
                      : ""
                  }`}
                  style={{
                    height: "50px",
                    marginBottom: "5px",
                  }}
                />
                <div className="invalid-feedback">
                  {emailInvalid && !email
                    ? emailInvalid
                    : emailValidate
                    ? emailValidate
                    : ""}
                </div>
              </div>
            </div>
            <button
              className="button_auth button_body mt-5 mb-5"
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
                Continue
              </p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
