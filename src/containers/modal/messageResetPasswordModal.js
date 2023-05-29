import React, { useState, useRef } from "react";
import { MAIN_USER_URL } from "../../api/urls";
import API from '../../utils/request'
import '../../styles/changePassword.css'
import { validatePassword } from "../../utils/validation";
import MessageModalMain from "./messageModalMain";
import { Buffer } from 'buffer'
import LoadingOverlay from "../loading/loadingOverlay";
import { useLocation } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const MessageResetPasswordModal = (props) => {
    const { showModal, setResetPasswordModal } = props
    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")
    const [newPasswordInvalid, setNewPasswordInvalid] = useState("")
    const [rePasswordInvalid, setRePasswordInvalid] = useState("")
    const [isSubmit, setIsSubmit] = useState(false);
    const messageModalRef = useRef('');
    const [loading, setLoading] = useState(false)
    const location = useLocation()

    const handleChangePassword = () => {
        setIsSubmit(true);
        if (!password || !repassword) {
            return false;
        } else if (password !== repassword) {
            return false;
        } else if (!validatePassword(password)) {
            return false;
        }
        var userId = location.state._id;
        var params = {
            "userId": userId,
            "confPassword": Buffer.from(repassword).toString('base64'),
            "newPassword": Buffer.from(password).toString('base64'),
        }
        setLoading(true)
        API.post(MAIN_USER_URL + '/admin/change-password-id', params).then((res) => {
            setLoading(false);
            if (res.status === 1) {
                setPassword("")
                setRepassword("")
                setNewPasswordInvalid("")
                setRePasswordInvalid("")
                messageModalRef.current.showSuccess(res.message)
                setResetPasswordModal(false)
                setIsSubmit(false);

            }
        }).catch((err) => {
            messageModalRef.current.showWarning(err.message)
            setLoading(false)
        })

    }
    return (
        <>
            <Modal
                show={showModal}
                onHide={() => {
                    setResetPasswordModal(false)
                    setPassword("")
                    setRepassword("")
                    setNewPasswordInvalid("")
                    setRePasswordInvalid("")
                }}
                centered
                size="lg"
            >
                <div style={{ backgroundColor: "white" }}>
                    <IoIosCloseCircleOutline
                        onClick={() => {
                            setResetPasswordModal(false)
                        }}
                        size={24}
                        color="gray"
                        style={{ float: 'right', marginTop: '10px', marginRight: '10px', cursor: 'pointer' }}
                    />
                    <div className="p-5">
                        <div className="text-center">
                            <h1 style={{ fontSize: '24px', fontWeight: 'bloder' }}>Change Password</h1>
                            <p style={{ fontSize: '16px', color: "#8B8B8B" }}>Please fill out all fields</p>
                        </div>

                        <div className="">
                            <div >
                                <div className="row">
                                    <label className="labelTextLogin col-12 col-md-3 col-sm-12">New Password</label>
                                    <div style={{ position: 'relative' }} className="col-12 col-md-9 col-sm-12">
                                        <input
                                            type="password"
                                            autoComplete="new-password"
                                            className={`form-control newPassword ${isSubmit && (!password || (password && !validatePassword(password))) ? "is-invalid" : ""}`}
                                            style={{
                                                height: "50px",
                                            }}
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                            }}
                                        />
                                        <div className="invalid-feedback">
                                            {isSubmit && !password ? "The new password is required."
                                                : isSubmit && password && !validatePassword(password)
                                                    ? "New password should be 8 to 32 characters long, and include numbers, uppercase, and lowercase letters."
                                                    : ""
                                            }
                                        </div>
                                        {password && !validatePassword(password)
                                            ? null
                                            : <small className="" style={{ fontSize: "14px", color: '#949494', fontWeight: 400 }}>New password should be 8 to 32 characters long, and include numbers, uppercase, and lowercase letters</small>

                                        }
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <label className="labelTextLogin col-12 col-md-3 col-sm-12">Confirm New Password</label>
                                    <div style={{ position: 'relative' }} className="col-12 col-md-9 col-sm-12">
                                        <input
                                            type="password"
                                            autoComplete="new-password"
                                            className={`form-control newPassword ${isSubmit && !repassword || (password !== repassword) ? "is-invalid" : ""}`}
                                            style={{
                                                height: "50px",
                                            }}
                                            value={repassword}
                                            onChange={(e) => {
                                                setRepassword(e.target.value);
                                            }}
                                        />
                                        <div className="invalid-feedback">
                                            {
                                                isSubmit && !repassword ? "The confirm password is required." : isSubmit && (password !== repassword) ? "Password does not match." : "The confirm password is required."
                                            }
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="button_auth button_bodymesssage"
                                    style={{ marginTop: "32px" }}
                                    onClick={() => 
                                       {
                                        handleChangePassword()
                                       }
                                    }
                                >
                                    <p
                                        style={{
                                            fontWeight: "800",
                                            fontSize: "16px",
                                            marginBottom: "0",
                                            color: "white",
                                        }}
                                    >
                                        Submit
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            {loading ? <LoadingOverlay /> : null}
            <MessageModalMain textCentered ref={messageModalRef} />
        </>
    )
}

export default MessageResetPasswordModal;