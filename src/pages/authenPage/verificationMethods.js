import React from "react";
import '../../styles/login.css'
import { Link } from "react-router-dom";


const VerificationMethods = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        window.location.href = "/";
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
                        <Link to="#!" className="headerh3" style={{ fontWeight: '700', color: "black", textDecoration: 'none' }}>
                            Verification Account
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="text-center">
                            <label className="labelTextLogin text-center" style={{ fontWeight: 400 }}>A verify link was sent to your email. Please check you email and 
click on verify link. Thank you!</label>
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
                                Back to Log in
                            </p>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default VerificationMethods;
