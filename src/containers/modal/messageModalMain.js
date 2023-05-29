import React from 'react'
import { Modal, Form } from 'react-bootstrap'
import '../.../../../styles/messageModal.css'

class MessageModalMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            message: "",
            type: "danger",
            handleOnHide: null,
            title: null
        }
    }

    show(message, title) {
        this.setState({
            visible: true,
            message,
            handleOnHide: null,
            title
        })
    }

    showError(message, onHide) {
        this.setState({
            visible: true,
            message,
            type: "Danger",
            handleOnHide: onHide,
            title: ''
        })
    }

    showSuccess(message, onHide, title) {
        this.setState({
            visible: true,
            message,
            type: "Success",
            handleOnHide: onHide,
            title
        })
    }

    showWarning(message, onHide, title) {
        this.setState({
            visible: true,
            message,
            type: "Warning",
            handleOnHide: onHide,
            title
        })
    }

    render() {
        const { message, visible, type, handleOnHide, title } = this.state;
        const { textCentered } = this.props;

        let icon = require('../../assets/images/warning.png');
        if (type === 'Success') {
            icon = require('../../assets/images/success.png');
        } else if (type === 'Warning') {
            icon = require('../../assets/images/warning.png');
        }

        return (
            <Modal
                show={visible}
                onHide={() => {
                    if (handleOnHide) {
                        handleOnHide()
                    }
                }}
                centered
                dialogClassName="modal-600px"
            >
                <div
                    style={{
                        backgroundColor: "white",
                        borderTop: `5px solid red`,
                        borderRadius: "4px",
                    }}
                >

                    <Form.Text className="primary_title">
                        {title}
                    </Form.Text>
                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end'
                    }}>
                    </div>
                    <div className="mr-4 ml-4 mb-1" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        {
                            type !== 'danger' ? <div className="mt-4" style={{ display: 'flex', justifyContent: 'center' }}><img style={{ objectFit: 'cover', height:"54px" }} src={icon} alt="" /></div> : null
                        }

                        <Form.Text style={{ fontSize: '24px', fontWeight: 700, color:'#000000' }} className={`text-center primary_title text-${type}-`}>
                            {
                                type === 'danger' ? 'Oops!' : type + '!'
                            }

                        </Form.Text>
                        <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '1.3', textAlign: textCentered ? "center" : "inherit", marginTop: '18px' }}>{(typeof message) === 'string' ? message : message}</p>
                    </div>
                    <div className="pb-4 text-center">
                        <button
                                className="btnMessage ml-5"
                                style={{ marginTop: "32px" }}
                                onClick={() => {
                                    this.setState({ visible: false })
                                    if (handleOnHide) {
                                        handleOnHide()
                                    }
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
                                   Close
                                </p>
                            </button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default MessageModalMain