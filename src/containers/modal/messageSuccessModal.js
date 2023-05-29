import React from "react";
import { Modal } from 'react-bootstrap';
import '../.../../../styles/messageModal.css'


const MessageSuccessModal = (props) => {
    const { icon, title, description, showModal, setMessageSuccessModal } = props;
    return (
        <Modal
            show={showModal}
            onHide={() => setMessageSuccessModal(false)}
            centered
        >
            <div style={{
                backgroundColor: "white",
                borderTop: "5px solid red",
                padding: "5px 0px 0px 0px",
                borderRadius: '4px'

            }}>
                <div className="p-4">
                    <div className="text-center">
                        <img src={icon} />
                        <h1 style={{ fontSize: '24px', fontWeight: 700 }} className="mt-3">{title}</h1>
                        <p style={{ fontSize: '16px' }}>{description}</p>
                    </div>
                    <div className="row">
                        <button
                            className="button_auth button_body"
                            style={{ marginTop: "32px" }}
                            onClick={() => setMessageSuccessModal(true)}
                        >
                            <p
                                style={{
                                    fontWeight: "800",
                                    fontSize: "16px",
                                    marginBottom: "0",
                                    color: "white",
                                }}
                            >
                                Close
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default MessageSuccessModal;