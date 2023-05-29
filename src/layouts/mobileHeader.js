import React, { useState } from 'react'
import PresonalIcome from '../assets/images/logo_Presonal_Income.png'
import '../styles/mobileHeader.css'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineAccountCircle } from 'react-icons/md'
import { Link } from 'react-router-dom'

const MobileHeader = () => {

    const [active, setActive] = useState(false)
    const [isshowChild, setIsshowChild] = useState(null)

    const onClickActive = () => {
        setActive(!active)
        setIsshowChild(null)
    }

    if (active === true) {
        document.body.style.overflow = 'visable	';
    } else {
        document.body.style.overflow = 'unset';
    }

    const menus = [
        {
            target: "_blank",
            link: "/dashboard",
            title: "Dashboard",
        },
    ]

    return (
        <nav className='navbar sidebars navbar-expand-lg navbar-light text-dark bg-light d-lg-none d-flex'>
            <a href="#!" target='_blank' rel="noopener noreferrer" className='mx-5'>
                <img alt='' src={PresonalIcome} style={{ width: '60px' }} />
            </a>
        </nav>
    )
}

export default MobileHeader