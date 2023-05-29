import React from 'react'
import '../styles/footerNavigation.css'
import { FaLinkedinIn, FaTwitter, FaYoutube, FaFacebookF } from 'react-icons/fa'
import AppStore from '../assets/images/appStore.png'
import GooglePlay from '../assets/images/googlePlay.png'
import PresonalIcome from '../assets/images/logo_Presonal_Income.png'
import FooterNavigationMobile from './footerNavigationMobile'

const FooterNavigation = () => {
    const helpData = [
        {
            title: "Contact Us",
            link: "/contact-us"
        },
        {
            title: "FAQs",
            link: "/faq"
        }
    ]

    return (
        <div>
            <footer className='footer-main'>

                {/* Primary Footer */}
                <div className='d-md-block d-none'>
                    <section className='footer-primary'>
                        <div className='row container'>
                            <div className='col-lg-12'>
                                <div className='row'>
                                    <ul className='col-lg-5 col-6' style={{ listStyle: 'none', paddingLeft: '0px' }}>
                                        <li className='mb-3'>
                                            <p className='footer_title_desktop'>Company</p>
                                        </li>
                                        <p className='font_navigation_desktop'>
                                            A personal budget spreadsheet offers an individual
                                            a way to determine the state of his finances and help
                                            him or her plan spending over the course of a period
                                            of usually a month or a year.</p>
                                    </ul>
                                    <div className='col-lg-3 col-3 mt-lg-0 mt-4'>
                                        <div className='d-flex flex-row'>
                                            <a href='#!' rel="noopener noreferrer" className='text-decoration-none link-dark'>
                                                <FaLinkedinIn size={20} />
                                            </a>
                                            <a href='#!' rel="noopener noreferrer" className='text-decoration-none link-dark'>
                                                <FaTwitter size={20} style={{ marginRight: '15px', marginLeft: '15px' }} />
                                            </a>
                                            <a href='#!' rel="noopener noreferrer" className='text-decoration-none link-dark'>
                                                <FaYoutube size={20} />
                                            </a>
                                            <a href='#!' rel="noopener noreferrer" className='text-decoration-none link-dark'>
                                                <FaFacebookF size={20} style={{ marginLeft: '15px' }} />
                                            </a>
                                        </div>
                                        <div className='mt-3' style={{ fontSize: "18px" }}>Download the App</div>
                                        <div className='d-flex flex-lg-row flex-col  mt-1'>
                                            <a href='#!' rel="noopener noreferrer" className='text-decoration-none link-dark h-100 me-lg-2'>
                                                <img src={AppStore} height="auto" width="100px" alt="appstore_png"></img>
                                            </a>
                                            <a href='#!' rel="noopener noreferrer" className='text-decoration-none link-dark h-100 mt-lg-0 mt-4'>
                                                <img src={GooglePlay} height="auto" width="100px" alt="googleplay"></img>
                                            </a>
                                        </div>
                                    </div>
                                    <ul className='col-lg-2 col-2 mt-lg-0 mt-4 ml-2' style={{ listStyle: 'none', paddingLeft: '50px' }}>
                                        <li className='mb-3'>
                                            <p className='footer_title_desktop'>Help</p>
                                        </li>
                                        {
                                            helpData.map((item, index) => (
                                                <li key={index} className='mb-2'>
                                                    <a href="#!" rel="noopener noreferrer" className='text-decoration-none link-dark'>
                                                        <p className='font_navigation_desktop'>{item.title}</p>
                                                    </a>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <div className='col-2' style={{ display: 'flex' }}>
                                        <a href="" rel="noopener noreferrer">
                                            <img width="150px" height="auto" src={PresonalIcome} alt="PresonalIcome" />
                                            {/* <img alt='' src={PresonalIcome} width='135px' className="mx-lg-4 mx-0 my-lg-0 my-4" /> */}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </footer>
            <FooterNavigationMobile />
        </div>
    )
}

export default FooterNavigation