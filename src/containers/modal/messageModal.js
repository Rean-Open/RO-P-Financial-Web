import React from "react";
import { Modal } from 'react-bootstrap';
import '../.../../../styles/messageModal.css'


const MessageModal = (props) => {
    const { icon, title, description, showModal, setMessageModal, deleteUser } = props;
    return (
        <Modal
            show={showModal}
            onHide={() => setMessageModal(false)}
            centered
        >
            <div style={{
                backgroundColor: "white",
                borderTop: "5px solid #ff5e24",
                padding: "5px 0px 0px 0px",
                borderRadius: '4px'

            }}>
                <div className="p-4">
                    <div className="text-center">
                        <img src={icon} />
                        <h1 style={{ fontSize: '24px', fontWeight: 700 }} className="mt-3">{title}</h1>
                        <p style={{ fontSize: '16px' }}>{description}</p>
                    </div>
                    <div className="row btnWarning">
                    <button
                                className="btnMessage"
                                style={{ marginTop: "32px" }}
                                onClick={() => deleteUser()}
                            >
                                <p
                                    style={{
                                        fontWeight: "800",
                                        fontSize: "16px",
                                        marginBottom: "0",
                                        color: "white",
                                    }}
                                >
                                    Delete
                                </p>
                            </button>
                            <button
                                className="btnMessageWarning ml-5"
                                style={{ marginTop: "32px" }}
                                onClick= {() => setMessageModal(false)}
                            >
                                <p
                                    style={{
                                        fontWeight: "800",
                                        fontSize: "16px",
                                        marginBottom: "0",
                                        color: "white",
                                    }}
                                >
                                    Cancel
                                </p>
                            </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default MessageModal;