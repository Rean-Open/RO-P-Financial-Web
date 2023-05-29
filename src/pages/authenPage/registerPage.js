import React, { useRef, useState } from "react";
import { LOGIN_URL, REGISTER_URL } from "../../api/urls";
import LoadingOverlay from "../../containers/loading/loadingOverlay";
import '../../styles/login.css'
import { Buffer } from 'buffer'
import API from '../../utils/request'
import MessageModalMain from "../../containers/modal/messageModalMain";
import { storageKeys } from "../../constants/storage";
import * as Storage from "../../utils/storage";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/validation";


const RegisterPage = () => {

    const [password, setPassword] = useState("");
    const [usernameInvalid, setUsernameInvalid] = useState("")
    const [username, setUsername] = useState("");
    const [emailInvalid, setEmailInvalid] = useState("")
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)
    const messageModalRef = useRef('rememberMe');
    const [passwordShown, setPasswordShown] = useState(false)
    const [newPasswordInvalid, setNewPasswordInvalid] = useState("")
    const [emptyField, setEmptyField] = useState("")
    const [emailValidate, setEmailValidate] = useState("")
    const [repassword, setRepassword] = useState("")
    const [rePasswordInvalid, setRePasswordInvalid] = useState("")

    const location = useLocation()

    useEffect(() => {
        if (localStorage.getItem(storageKeys.TOKEN)) {
            window.location.href = "/";
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!username) {
            setUsernameInvalid("Please enter your username!")
            return false
        }
        if (!email) {
            setEmailInvalid("Please enter your email!")
            return false
        }
        if (email) {
            if (!validateEmail(email)) {
                setEmailValidate("Email is Invalid!")
                setLoading(false)
                return false;
            }
        }
        if (!password || !repassword) {
            setEmptyField("This field cannot be empty")
            return false;
        }
        else if (password !== repassword) {
            setRePasswordInvalid("Please make sure the password matches")
            return false;
        } else if (!validatePassword(password)) {
            setNewPasswordInvalid("New password should be 8 to 32 characters long, and include numbers, uppercase, and lowercase letters")
            return false;
        }
        setLoading(false)
        
        API.post(REGISTER_URL, {
            "user_name": username,
            "password": password,
            "email": email

        })
            .then((res) => {
                setLoading(false)
                if (res.status === 200) {
                    // Storage.setString(storageKeys.TOKEN, res.token);
                    // Storage.setJson(storageKeys.USER, res.data.userName);
                    // Storage.setJson(storageKeys.FIRSTNAME, res.data.firstName);
                    // Storage.setJson(storageKeys.LASTNAME, res.data.lastName);
                    window.location.href = "/verification";
                } else {
                    messageModalRef.current.showWarning(res.msg);
                }
            })
            .catch((err) => {
                messageModalRef.current.showWarning(err.message);
                setLoading(false)
            })
    }
    if (localStorage.getItem(storageKeys.TOKEN)) {
        return null;
    }
    return (
        <div className="" style={{ marginTop: "100px", marginBottom: '120px' }}>
            <div className='col-12 mt-5 carborderd auth_body bg-white'>
                <div className="">
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '25px',
                        marginTop: '20px'
                    }}>
                        <Link to="/login" className="headerh3" style={{ fontWeight: `${location.pathname === "/login" ? '700' : '400'}`, color: "black", textDecoration: 'none' }}>
                            Login
                        </Link>

                        <div style={{ width: '1px', height: '100%', backgroundColor: 'black', marginLeft: '16px', marginRight: '16px' }} />

                        <Link to="/Register" className="headerh3" style={{ fontWeight: `${location.pathname === "/register" ? '700' : '400'}`, color: "black", textDecoration: 'none' }}>
                            Register
                        </Link>
                    </div>
                    {loading ? <LoadingOverlay /> : null}
                    <MessageModalMain textCentered ref={messageModalRef} />
                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <label className="labelTextLogin">Username <span className="text-danger">*</span></label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className={`form-control ${(usernameInvalid && !username) ? "is-invalid" : ""}`}
                                    style={{
                                        height: "50px",
                                        marginBottom: '5px'
                                    }}
                                />
                                <div className="invalid-feedback">{usernameInvalid && !username ? usernameInvalid : ""}</div>
                            </div>
                        </div>
                        <div className="">
                            <label className="labelTextLogin">Email <span className="text-danger">*</span></label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setEmailValidate("")
                                    }}
                                    className={`form-control ${emailInvalid && !email || emailValidate ? "is-invalid" : ""}`}
                                    style={{
                                        height: "50px",
                                        marginBottom: '5px'
                                    }}
                                />
                                <div className="invalid-feedback">{emailInvalid && !email ? emailInvalid : emailValidate ? emailValidate : ""}</div>
                            </div>
                        </div>
                        <div>
                            <label className="labelTextLogin">Password <span className="text-danger">*</span></label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={passwordShown ? "text" : "password"}
                                    className={`form-control newPassword ${(emptyField && !password) || newPasswordInvalid ? "is-invalid" : ""}`}
                                    style={{
                                        height: "50px",
                                    }}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setEmptyField("")
                                        setNewPasswordInvalid("")
                                    }}
                                />
                                <div className="invalid-feedback">{emptyField && !password ? emptyField : newPasswordInvalid ? newPasswordInvalid : ""}</div>
                                {
                                    newPasswordInvalid ? null : <small className="" style={{ fontSize: "14px", color: '#949494', fontWeight: 400 }}>New password should be 8 to 32 characters long, and include numbers, uppercase, and lowercase letters</small>
                                }
                            </div>
                        </div>
                        <div>
                            <label className="labelTextLogin">Confirm Password <span className="text-danger">*</span></label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={passwordShown ? "text" : "password"}
                                    autocomplete="new-password"
                                    className={`form-control newPassword ${(emptyField && !repassword) || rePasswordInvalid ? "is-invalid" : ""}`}
                                    style={{
                                        height: "50px",
                                    }}
                                    value={repassword}
                                    onChange={(e) => {
                                        setRepassword(e.target.value);
                                        setEmptyField("")
                                        setRePasswordInvalid("")
                                    }}
                                />
                                <div className="invalid-feedback">{emptyField && !repassword ? emptyField : rePasswordInvalid ? rePasswordInvalid : ""}</div>

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
                                Register
                            </p>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;
