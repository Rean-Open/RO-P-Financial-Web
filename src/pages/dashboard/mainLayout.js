import React from 'react'
import { storageKeys } from '../constants/storage';
import MainSideBar from './mainSideBar';


const menusidebar = [
    {
        target: "_blank",
        link: "/",
        title: "Dashboard",
        icon: require('../assets/images/dashboard.svg').default,
        iconb: require('../assets/images/dashboard.svg').default,
        subMenu: [
            {
                
            },
        ]
    },
    {
        target: "_blank",
        link: "/income",
        title: "Income",
        icon: require('../assets/images/income.svg').default,
        iconb: require('../assets/images/income.svg').default,
        subMenu: [
            {
                
            },
        ]
    },
    {
        target: "_blank",
        link: "/expenses",
        title: "Expenses",
        icon: require('../assets/images/expense.svg').default,
        iconb: require('../assets/images/expense.svg').default,
        subMenu: [
            {
                
            },
        ]
    },
    {
        target: "_blank",
        link: "/all-reports",
        title: "All Reports",
        icon: require('../assets/images/allReport.svg').default,
        iconb: require('../assets/images/allReport.svg').default,
        subMenu: [
            {
                
            },
        ]
        
    },
    {
        target: "_blank",
        link: "#!",
        title: "Settings",
        icon: require('../assets/images/setting.svg').default,
        iconb: require('../assets/images/setting.svg').default,
        subMenu: [
            {
                target: "_blank",
                link: "/account",
                title: "Account",
                icon: require('../assets/images/account.svg').default,
                iconb: require('../assets/images/account.svg').default,
            },
            {
                target: "_blank",
                link: "/manage-category",
                title: "Manage Category",
                icon: require('../assets/images/manageCategory.svg').default,
                iconb: require('../assets/images/manageCategory.svg').default,
            },
            {
                target: "_blank",
                link: "/currency",
                title: "Currency",
                icon: require('../assets/images/currency.svg').default,
                iconb: require('../assets/images/currency.svg').default,
            },
            {
                target: "_blank",
                link: "/payment-menthod",
                title: "Payment Method",
                icon: require('../assets/images/payment.svg').default,
                iconb: require('../assets/images/payment.svg').default,
            },
            
        ]
    },
]

const downloadApp = {
    link: "#",
    title: "Download App"
};

class MainLayout extends React.Component {
    constructor(props) {
        super(props)

        if (!localStorage.getItem(storageKeys.USER)) {
        }

        this.state = {
            activeMenu: "/",
            loading: false,
            minHeight: window.innerHeight - 130,
            lng: "",
            showSidebar: true,
            isShow: false,
            localToken: localStorage.getItem(storageKeys.USER),
            showDrop: false
        }
    }

    requesGetLoggedInUser() {
    }



    handleChatboxPreset() {
        this.chatboxRef.showChatbot()
    }

    render() {
        const { children, isFromMobile, notificationReducer } = this.props;
        const { activeMenu, loading, minHeight, lng, showSidebar, isShow, showDrop } = this.state;
        const LocationPathname = window.location.pathname;
        var token ="sss"
        return (
            <div onMouseOver={() => { }}>
                {loading ? null :
                    <>
                        {/* {token ? */}
                        <MainSideBar LocationPathname={LocationPathname} downloadApp={downloadApp} menus={menusidebar} activeMenu={activeMenu} minHeight={minHeight} loading={loading} showSidebar={showSidebar}
                            onClickSidebar={(m) => {
                                if (m.link === "#") {
                                    this.qrCodeModalRef.show();
                                } else if (m.link === "#referral") {
                                    this.referralModalRef.show();
                                } else {
                                    this.setState({
                                        activeMenu: m.link
                                    })
                                }
                            }}
                            handleShowSidebar={() => {
                                this.setState({
                                    showSidebar: !showSidebar
                                })
                            }} />
                        {/* : null} */}
                        {/* <div style={{ display: `${LocationPathname === "/donorcare/form" && "/donor-care-form/app" ? "block" : "none"}` }}>
                            <FaqMobileDropdown />
                        </div> */}
                        <div className='content' style={{ marginLeft: `${token ? showSidebar ? '250' : '64' : '0'}px` }}>
                            <div className={`#ff5e24 ${LocationPathname === "/donorcare/form" && "/donor-care-form/app" ? 'pt-lg-4 pt-0' : 'pt-4'} pb-5`} style={{
                                width: '100%',
                            }}>
                                {children}
                            </div>
                        </div>
                        {/* <MainSideBarPhone
                            isShow={isShow}
                            isExpire={isExpire}
                            downloadApp={downloadApp}
                            localToken={token}
                            menusidebar={menusidebar}
                            activeMenu={activeMenu}
                            LocationPathname={LocationPathname}
                            menus={menus}
                            lng={lng}
                            // doLogout={() => { this.doLogout() }}
                            handleClose={() => { this.setState({ isShow: !isShow }) }}
                            // toggleLanguage={() => { this.toggleLanguage() }}
                            onClickSidebar={(m) => {
                                if (m.link === "#") {
                                    this.qrCodeModalRef.show();
                                } else if (m.link === "#referral") {
                                    this.referralModalRef.show();
                                } else {
                                    this.setState({
                                        activeMenu: m.link
                                    })
                                }
                            }}
                            handleShowSidebar={() => {
                                this.setState({
                                    showSidebar: !showSidebar
                                })
                            }}
                        /> */}
                        {/* {token && <OneTrustCookies />}
                        <MainFooter localToken={token} showSidebar={showSidebar} /> */}
                    </>
                }
                {/* <DownloadAppQRCodeModal ref={ref => this.qrCodeModalRef = ref} /> */}
                {/* <ReferralModal t={this.props.t} ref={ref => this.referralModalRef = ref} /> */}
                {/* <ChatboxPresetPage
                    ref={ref => {
                        this.chatboxRef = ref;
                    }}
                /> */}
            </div>
        )
    }
}

export default MainLayout;