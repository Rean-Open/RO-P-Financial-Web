import React from 'react'
import { Modal } from 'react-bootstrap';
import '../../styles/loadingOverlay.css'

const LoadingOverlay = () => {
    return (
        <Modal show={true} centered size="lg" backdropClassName="loading-modal-backdrop" className="loading-modal">
            <center>
                <div className="spinner" style={{ marginBottom: '37px' }}></div>
            </center>
        </Modal>
    )
}

export default LoadingOverlay;