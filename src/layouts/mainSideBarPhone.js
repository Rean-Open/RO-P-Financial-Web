import moment from "moment";
import React from "react";
import { Image, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { userSelector } from "../../modules/auth/selector";
import { getDonorThumbnail } from "../../utils/donor";
import { Trans, withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { TouchableOpacity } from "react-native-web";
import { ANDROID_STORE_LINK, IOS_STORE_LINK } from "../../config/download";
import { WEB_BASE_URL } from "../../config/api";
import "./MainSideBarPhone.css"

class MainSideBarPhone extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: false,
            minHeight: window.innerHeight - 230,
            isDropShow: false,
            isshowChil: null
        }
    }

    render() {
        const { handleClose, isShow, activeMenu, LocationPathname, doLogout, menus, user, onClickSidebar, menusidebar, localToken, isExpire } = this.props;

        const { isDropShow, isshowChil } = this.state;
        return (
            <div className="overlay" style={{ width: isShow ? '100%' : '0%' }} id="myNav" >
                <div style={{ padding: '20px' }}>
                    <div className="d-flex justify-content-end">
                        <img alt="" style={{ cursor: 'pointer' }} width={24} src={require("../../assets/icons/CloseIcon.svg")} onClick={() => { handleClose() }} />
                    </div>
                    <div>
                        {
                            localToken ? (
                                <div className="d-flex flex-row align-items-center">
                                    <Image width={60} height={60} src={getDonorThumbnail(user ? user : '')} roundedCircle />
                                    <div style={{ marginLeft: '16px' }}>
                                        <p style={{ fontWeight: '700', fontSize: '18px', marginBottom: '4px' }}>{user ? user.firstName + ' ' + user.lastName : null}</p>
                                        <p style={{ fontWeight: '400', fontSize: '14px', marginBottom: '0' }}>Member since: <span style={{ fontWeight: '700', fontSize: '14px' }}>{user ? moment(user.creationTS).format('MMMM YYYY') : null}</span></p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{ marginTop: '38px' }}>
                        {localToken ?
                            <div className="d-flex flex-row align-items-center" style={{ marginBottom: '32px', cursor: 'pointer' }} onClick={() => {
                                doLogout()
                                handleClose()
                            }}>
                                <div style={{ width: '36px' }}>
                                    <img alt="" width={24} src={require("../../assets/icons/LogoutIcon.svg")} />
                                </div>
                                <p style={{ fontWeight: '400', fontSize: '16px', marginBottom: '0' }}>Log out</p>
                            </div>
                            : null}
                        <Link className="d-flex flex-row align-items-center" style={{ color: 'black' }} onClick={() => {
                            handleClose()
                            if (localToken) {
                                if (user.locations) {
                                    window.open(`${WEB_BASE_URL}/center/${user && user.locations && user.locations.locationID}`)
                                } else {
                                    window.open(`${WEB_BASE_URL}/find-a-donation-center`)
                                }
                            } else {
                                window.open(`${WEB_BASE_URL}/find-a-donation-center`)
                            }
                        }} to="#">
                            <div style={{ width: '36px' }}>
                                <img alt="" width={18} src={require("../../assets/icons/CenterIcon.svg")} />
                            </div>
                            {!localToken && <p style={{ fontWeight: '400', fontSize: '16px', marginBottom: '0' }}>Find Nearest Center</p>}
                            {
                                localToken &&
                                <>
                                    {user && user.locations ? <p style={{ fontWeight: '400', fontSize: '16px', marginBottom: '0' }}>{user.locations.name}</p> :
                                        <p style={{ fontWeight: '400', fontSize: '16px', marginBottom: '0' }}>Find Nearest Center</p>
                                    }
                                </>
                            }
                        </Link>
                    </div>
                    <div style={{ marginTop: '32px' }}>
                        <div onClick={() => {
                            this.setState({
                                isDropShow: !isDropShow
                            })
                        }} className="d-flex align-items-start" style={{ cursor: 'pointer' }}>
                            <p style={{ fontWeight: '700', fontSize: '18px', marginBottom: '0', marginRight: '12px' }}>Menu</p>
                            <div>
                                {
                                    isDropShow ? <img alt="" width={20} src={require("../../assets/icons/ArrowUp.svg")} /> : <img alt="" width={20} src={require("../../assets/icons/ArrowDown.svg")} />
                                }
                            </div>
                        </div>
                        <div style={{ border: '1px' }} className={`collapse ${isDropShow ? 'show' : ''}`} data-parent="#accordion">
                            {
                                menus.map((m, index) => (
                                    <div key={index}>
                                        <Nav.Item
                                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}
                                        >
                                            <Link
                                                className={m.link === activeMenu ? 'active' : ''}
                                                onClick={() => {
                                                    onClickSidebar(m)
                                                    handleClose()
                                                    window.open(m.link)
                                                }}
                                                style={{
                                                    position: 'relative'
                                                    , fontWeight: '400', fontSize: '16px', marginBottom: '0', marginTop: '24px', color: 'black'
                                                }}>
                                                <Trans>{m.title}</Trans>
                                            </Link>
                                            {m.children && m.children.length > 0 && <>
                                                {isshowChil === index + 1 ? <img style={{ marginTop: '24px' }} alt="" width={20} src={require("../../assets/icons/ArrowUp.svg")} onClick={() => {
                                                    if (isshowChil !== index + 1) {
                                                        this.setState({
                                                            isshowChil: index + 1
                                                        })
                                                    } else {
                                                        this.setState({
                                                            isshowChil: null
                                                        })
                                                    }
                                                }} size={24} color="#000000" className="float-right MontserratReg16" />
                                                    : <img style={{ marginTop: '24px' }} alt="" width={20} src={require("../../assets/icons/ArrowDown.svg")} onClick={() => {
                                                        if (isshowChil !== index + 1) {
                                                            this.setState({
                                                                isshowChil: index + 1
                                                            })
                                                        } else {
                                                            this.setState({
                                                                isshowChil: null
                                                            })
                                                        }
                                                    }} size={24} color="#000000" className="float-right MontserratReg16" />} </>
                                            }
                                        </Nav.Item>
                                        {isshowChil === index + 1 &&
                                            m.children && <p style={{
                                                border: '1px solid rgba(0,0,0,0.15)',
                                                borderRadius: '0.25rem',
                                                padding: '1rem 0.5rem',
                                                marginBottom: '0',
                                                marginTop: '16px'
                                            }}>{m.children.map((ch, Inch) => (
                                                <Link
                                                    className="mr-lg-4 MontserratReg16"
                                                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'black' }}
                                                    // key={ch.link}
                                                    key={Inch}
                                                >
                                                    <Nav.Item
                                                        className={ch.link === activeMenu ? 'active' : ''}
                                                        onClick={() => {
                                                            onClickSidebar(ch)
                                                            handleClose()
                                                            window.open(ch.link)
                                                        }}
                                                        style={{
                                                            position: 'relative',
                                                        }}>
                                                        <Image style={{ height: 24, marginRight: '7px' }} src={ch.icon} />
                                                        <Trans>{ch.title}</Trans>
                                                    </Nav.Item>
                                                </Link>
                                            ))}</p>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '1.5px', marginTop: '32px', marginBottom: '32px', backgroundColor: '#E2DFDA' }} />
                    {
                        localToken ? (
                            <>
                                <div>
                                    {
                                        menusidebar.map(item => (
                                            <Link
                                                key={item.link}
                                                to={item.link}
                                                onClick={() => {
                                                    onClickSidebar(item)
                                                    handleClose()
                                                }} className="d-flex flex-row align-items-center" style={{ marginBottom: '32px', color: 'black' }}>
                                                <div style={{ width: '36px' }}>
                                                    <div className={`${item.type === 'notification' && isExpire === true ? "colorNotfMobile": '' }`}/>
                                                    <img alt="" width={24} src={item.icon} />
                                                </div>
                                                <p style={{ fontWeight: '400', fontSize: '16px', marginBottom: '0' }}>{item.title}</p>
                                            </Link>
                                        ))
                                    }
                                </div>
                                <div style={{ width: '100%', height: '1.5px', marginTop: '32px', marginBottom: '32px', backgroundColor: '#E2DFDA' }} />
                            </>
                        ) : null
                    }
                    <div className="d-flex flex-column">
                        <p style={{ fontWeight: '700', fontSize: '16px', marginBottom: '16px' }}>Download App</p>
                        <TouchableOpacity onPress={() => {
                            window.open(IOS_STORE_LINK)
                        }}>
                            <img width={164} alt="" src={require('../../assets/icons/AppStoreSvg.svg')} />
                        </TouchableOpacity>
                        <div style={{ height: '5px' }} />
                        <TouchableOpacity onPress={() => {
                            window.open(ANDROID_STORE_LINK)
                        }}>
                            <img width={164} alt="" src={require('../../assets/icons/AndroidAppSvg.svg')} />
                        </TouchableOpacity>
                    </div>
                </div>
            </div >
        )
    }
}

const mapDispatchToProps = dispatch => ({ dispatch })

const mapStateToProps = state => ({
    user: userSelector(state)
})

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(MainSideBarPhone));