import React from 'react'
import '../styles/footerNavigationMobile.css'
import { FaLinkedinIn, FaTwitter, FaYoutube, FaFacebookF } from 'react-icons/fa'
import AppStore from '../assets/images/appStore.png'
import GooglePlay from '../assets/images/googlePlay.png'
import PresonalIcome from '../assets/images/logo_Presonal_Income.png'

const FooterNavigationMobile = () => {

    const companyData = [
        {
            title: "About Us",
            link: "/about-us"
        },
        {
            title: "Innovation",
            link: "/donation-experience-reimagined"
        },
        {
            title: "Newsroom",
            link: "/newsroom"
        },
        {
            title: "Media",
            link: "/media"
        }
    ]

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
        <div className='d-md-none d-block'>
            <section className='footer-primary_mobile'>
                <div className='row container p-0 g-4'>
                    <div className='col-lg-9 p-0'>
                        <div className='row'>
                            <ul className='col-lg-2 col-6' style={{ listStyle: 'none' }}>
                                <li className='mb-3'>
                                    <p className='footer_title_mobile'>Company</p>
                                </li>
                                <p className='font_navigation_desktop'>
                                    A personal budget spreadsheet offers an individual
                                    a way to determine the state of his finances and help
                                    him or her plan spending over the course of a period
                                    of usually a month or a year.</p>
                            </ul>
                            <ul className='col-lg-3 col-6 mt-lg-0' style={{ listStyle: 'none' }}>
                                <li className='mb-3'>
                                    <p className='footer_title_mobile'>Help</p>
                                </li>
                                {
                                    helpData.map((item, index) => (
                                        <li key={index} className='mb-2'>
                                            <a href="#!" className='text-decoration-none link-dark' rel="noreferrer">
                                                <p className='footer_navigation_mobile'>{item.title}</p>
                                            </a>
                                        </li>
                                    ))
                                }
                            </ul>
                            <div className='col-lg-4 col-6 mt-lg-0 mt-4'>
                                <div className='d-flex flex-row'>
                                    <a href='#!' className='text-decoration-none link-dark' rel="noreferrer">
                                        <FaLinkedinIn size={18} />
                                    </a>
                                    <a href='#!' className='text-decoration-none link-dark' rel="noreferrer">
                                        <FaTwitter size={18} style={{ marginRight: '26px', marginLeft: '26px' }} />
                                    </a>
                                    <a href='#!' className='text-decoration-none link-dark' rel="noreferrer">
                                        <FaYoutube size={18} />
                                    </a>
                                    <a href='#!' className='text-decoration-none link-dark' rel="noreferrer">
                                        <FaFacebookF size={18} style={{ marginLeft: '26px' }} />
                                    </a>
                                </div>
                                <div className='mt-3' style={{ fontSize: "18px" }}>Download the App</div>
                                <div className='app_download_mobile'>
                                    <a href='#!' className='text-decoration-none link-dark' rel="noreferrer">
                                        <img className='w-100 h-100' style={{ objectFit: 'cover' }} alt='appstore' src={AppStore} />
                                    </a>
                                    <a href='#!' className='text-decoration-none link-dark' rel="noreferrer">
                                        <img className='w-100 h-100' style={{ objectFit: 'cover', marginTop: '10px' }} alt='googleplay' src={GooglePlay} />
                                    </a>
                                </div>
                            </div>
                            <div className='col-3' style={{ marginTop: '70px' }}>
                                <a href="" rel="noreferrer">
                                    <img width="150px" height="auto" src={PresonalIcome} alt="PresonalIcome" />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default FooterNavigationMobile