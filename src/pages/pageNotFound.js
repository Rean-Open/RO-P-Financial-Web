import React from 'react'
import '../styles/pageNotFound.css'
import notfound from "../assets/images/notfound.svg"
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <div className='notfound_body'>
            <div className='notfound_content'>
                <img src={notfound} alt='' />
                <div className='text_content container'>
                    <p id='pagenotfound'>Page not found</p>
                    <p id='sorrynotfound'>Sorry, we can't find the page that you are looking for...</p>
                    <button className='btnReturn' onClick={() => {
                        navigate('/')
                    }} >
                        Return to Homepage
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound