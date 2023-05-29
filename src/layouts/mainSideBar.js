import React, { useEffect, useState } from "react"
import { Navbar, Image, Nav, FormLabel } from 'react-bootstrap';
import { TouchableOpacity } from "react-native-web";
import { connect } from "react-redux";
// import { ANDROID_STORE_LINK, IOS_STORE_LINK } from '../../config/download';
import { colors } from "../constants/theme";
// import { userSelector } from "../../modules/auth/selector";
// import { getDonorThumbnail } from "../../utils/donor";
// import moment from 'moment';
import { Link } from "react-router-dom";

function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}
const WidtHeight = (props) => {
    const { minHeight } = props
    const [windowSize, setWindowSize] = useState(getWindowSize())

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
            minHeight(getWindowSize())
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <span style={{ display: 'none' }}>{windowSize.innerHeight}</span>
    )
}

class MainSideBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            minHeight: window.innerHeight - 300,
            lng: "",
            showSidebar: true
        }
    }

    render() {
        const { downloadApp, activeMenu, LocationPathname, loading, menus, user, onClickSidebar, showSidebar, handleShowSidebar, isExpire } = this.props;

        const { minHeight } = this.state;


        return (
            <div className="sidebar bg-white" style={{
                borderRight: `1px solid ${colors.borderColor}`,
                width: `${showSidebar ? '250' : '64'}px`,
                paddingLeft: `${showSidebar ? '25' : '0'}px`
            }}>
                <div className='circle' style={{
                    justifyContent: 'center',
                    marginTop: `${minHeight / 1.5}px`,
                    cursor: 'pointer'
                }}>
                    <Image onClick={() => {
                        handleShowSidebar()
                    }} width={60} height={60} src={showSidebar ? require('../assets/images/circle.svg').default : require('../assets/images/circle1.svg').default} />
                </div>
                <div style={{
                    minHeight: minHeight,
                    marginTop: '1em'
                }}>
                    {loading ? null :
                        <Navbar bg="white" className='flex-column fixed' expand="lg" style={{
                            backgroundColor: '#fff !important'
                        }}>
                            <div className="logo-name-wrapp" style={{ display: 'flex', paddingBottom: showSidebar ? '' : '37px' }}>
                                <Image
                                    style={{
                                        minHeight: showSidebar ? '64px' : '24px',
                                        minWidth: showSidebar ? '64px' : '24px',
                                        maxHeight: showSidebar ? '64px' : '24px',
                                        maxWidth: showSidebar ? '64px' : '24px'
                                    }}
                                    width={showSidebar ? 64 : 24}
                                    src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                                    // height={showSidebar ? 64 : 24} src={getDonorThumbnail(user ? user : '')} 
                                    roundedCircle />
                            </div>
                            <div style={{ display: showSidebar ? '' : 'none', paddingLeft: showSidebar && '0px' }} className="transaction">
                                <FormLabel className="mt-0 mb-1 third_desc">{user.user_name? user.user_name : ''}</FormLabel>
                            </div>
                            <Nav className="main-nav flex-column" style={{ width: '100%', marginTop: '0.9em' }}>
                                {
                                    menus.map(m => (
                                        <Link
                                            className={`${showSidebar ? 'mr-lg-4' : ''} line-height MontserratReg16 coloHeader`}
                                            style={{
                                                display: 'flex',
                                                textDecoration: 'none',
                                            }}
                                            key={m.link}
                                            to={m.link}
                                            onClick={() => {
                                                onClickSidebar(m)
                                            }}>

                                            <Nav.Item className={`features-item ${m.link === LocationPathname ? 'active' : ''} coloHeader`} style={{ position: 'relative' }}>
                                                <div className={`${m.type === 'notification' && isExpire === true ? "colorNotf" : ''}`} ></div>
                                                <Image style={{ height: m.link === LocationPathname ? 24 : 24, marginLeft: showSidebar ? '7px' : '18px', marginRight: '7px' }} src={m.icon} />
                                                <span className={`features-item-text ${showSidebar ? '' : 'opacity'}`}>{m.title}</span>

                                                {m.link === activeMenu ?
                                                    <div style={{
                                                        display: 'flex',
                                                        position: 'absolute',
                                                        width: '100%',
                                                        justifyContent: 'center'
                                                    }}><span className="dot" /></div> :
                                                    null
                                                }
                                                <div style={{ marginTop: '220px' }}>
                                                    {
                                                        m.subMenu.map(sb => (
                                                            <Link
                                                                style={{
                                                                    display: 'flex',
                                                                    textDecoration: 'none',
                                                                }}
                                                                key={sb.link}
                                                                to={sb.link}
                                                                onClick={() => {
                                                                    onClickSidebar(sb)
                                                                }}
                                                            >
                                                                <Nav.Item className={`features-item ${sb.link === LocationPathname ? 'active' : ''} coloHeader`} style={{ position: 'relative', paddingBottom: '0px', marginBottom: "15px" }}>
                                                                    <div style={{ marginLeft: "-80px" }}>
                                                                        <Image className={`${showSidebar ? '' : 'opacity'}`} style={{ height: sb.link === LocationPathname ? 20 : 20, marginLeft: showSidebar ? '7px' : '0px', marginRight: '7px' }} src={sb.icon} />
                                                                        <span className={`features-item-text ${showSidebar ? '' : 'opacity'}`} style={{fontSize:"14px"}}>{sb.title}</span>
                                                                        {sb.link === activeMenu ?
                                                                            <div style={{
                                                                                display: 'flex',
                                                                                position: 'absolute',
                                                                                width: '100%',
                                                                                justifyContent: 'center'
                                                                            }}><span className="dot" /></div> :
                                                                            null
                                                                        }
                                                                    </div>
                                                                </Nav.Item>
                                                            </Link>
                                                        ))
                                                    }
                                                </div>
                                            </Nav.Item>
                                        </Link>
                                    ))

                                }
                            </Nav>
                        </Navbar>
                    }
                </div>

                <Navbar style={{
                    // justifyContent: 'center',
                    display: showSidebar ? 'block' : 'none',
                }}>
                    {/* <div >
                        <h5
                            style={{ cursor: 'pointer', width: '196px' }}
                            className='bold_desc'
                            onClick={() => {
                                // onClickSidebar(downloadApp)
                            }}>{downloadApp.title}</h5>
                        <TouchableOpacity onPress={() => {
                            window.open(IOS_STORE_LINK)
                        }}>
                            <Image style={{ height: 50 }} className="img-header" src={require('../../assets/img/app_download.svg')} />
                        </TouchableOpacity>
                        <div style={{ height: '5px' }} />
                        <TouchableOpacity onPress={() => {
                            window.open(ANDROID_STORE_LINK)
                        }}>
                            <Image className="mr-2 img-header" style={{ height: 50 }} alt="ddd" src={require('../../assets/img/playStore_download.svg')} />
                        </TouchableOpacity>
                    </div> */}
                </Navbar>
                <WidtHeight
                    minHeight={(winWH) => {
                        this.setState({
                            minHeight: winWH.innerHeight - 300
                        })
                    }} />
            </div>
        )
    }
}

export default MainSideBar;