import React, { useRef, useState } from "react";
import { VERIFY_OPT } from "../../api/urls";
import LoadingOverlay from "../../containers/loading/loadingOverlay";
import "../../styles/login.css";
import API from "../../utils/request";
import MessageModalMain from "../../containers/modal/messageModalMain";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";

const VerificationPage = (props) => {
  const {user} = props
  const [loading, setLoading] = useState(false);
  const [errorCode, setErrorCode] = useState(false);
  const [codeInvalid, setCodeInvalid] = useState("");
  const messageModalRef = useRef("rememberMe");

  const [code, setCode] = useState();
  const handleChangeCode = (code) => {
    setCode(code);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    API.get(`${VERIFY_OPT}?userId=${16}&otp=${code}`)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          messageModalRef.current.showSuccess(res.msg);
          window.location.href = "/confirmSuccess";
        } else {
          messageModalRef.current.showWarning(res.status.message);
        }
      })
      .catch((err) => {
        messageModalRef.current.showWarning(err.message);
        setLoading(false);
      });
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
              Verification
            </Link>
          </div>
          {loading ? <LoadingOverlay /> : null}
          <MessageModalMain textCentered ref={messageModalRef} />
          <form onSubmit={handleSubmit}>
            <div className="">
              <label
                className="labelTextLogin text-center"
                style={{ fontWeight: 400 }}
              >
                A 6 digit numeric code has been send to your email.Please allow
                up to 5 minutes before attempting to reset the code.
              </label>
              <center
                style={{
                  justifyContent: "center",
                  display: "flex",
                  marginTop: "20px",
                }}
              >
                <OtpInput
                  value={code}
                  onChange={handleChangeCode}
                  numInputs={6}
                  separator={<span style={{ width: "8px" }}></span>}
                  inputStyle={{
                    border: "1px solid transparent",
                    borderRadius: "4px",
                    width: "52px",
                    height: "52px",
                    fontSize: "20px",
                    color: "red",
                    fontWeight: "bold",
                    fontWeight: "bold",
                    border: "1px solid #E2DFDA",
                    backgroundColor: "#F1EFEA",
                  }}
                  focusStyle={{
                    border: "2px solid #E2DFDA",
                    outline: "none",
                    color: "#000000",
                  }}
                />
              </center>
              {errorCode && !code ? (
                <div>
                  <p
                    className="text-danger"
                    style={{
                      marginBottom: "0",
                      marginTop: "5px",
                      fontWeight: "400",
                      fontSize: "12px",
                    }}
                  >
                    Please enter a 6-digit verification code
                  </p>
                </div>
              ) : codeInvalid ? (
                <div>
                  <p
                    className="text-danger"
                    style={{
                      marginBottom: "0",
                      marginTop: "5px",
                      fontWeight: "400",
                      fontSize: "12px",
                    }}
                  >
                    {codeInvalid}
                  </p>
                </div>
              ) : null}
            </div>
            <div className="text-right mr-2 mt-4 text-center">
              <span
                style={{ color: "black", fontSize: "16px", fontWeight: 400 }}
              >
                Didn’t received code?{" "}
                <Link
                  to="/forget-password"
                  style={{ color: "black", fontSize: "16px", fontWeight: 700 }}
                >
                  Resend code again
                </Link>
              </span>
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
                Verify
              </p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
