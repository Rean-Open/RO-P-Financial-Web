import React from "react";
import { storageKeys } from "../constants/storage";
import MainSideBar from "./mainSideBar";
import * as Storage from "../utils/storage";

const menusidebar = [
  {
    target: "_blank",
    link: "/",
    title: "Dashboard",
    icon: require("../assets/images/dashboard.svg").default,
    iconb: require("../assets/images/dashboard.svg").default,
    subMenu: [{}],
  },
  {
    target: "_blank",
    link: "/income",
    title: "Income",
    icon: require("../assets/images/income.svg").default,
    iconb: require("../assets/images/income.svg").default,
    subMenu: [{}],
  },
  {
    target: "_blank",
    link: "/expenses",
    title: "Expenses",
    icon: require("../assets/images/expense.svg").default,
    iconb: require("../assets/images/expense.svg").default,
    subMenu: [{}],
  },
  {
    target: "_blank",
    link: "/all-reports",
    title: "All Reports",
    icon: require("../assets/images/allReport.svg").default,
    iconb: require("../assets/images/allReport.svg").default,
    subMenu: [{}],
  },
  {
    target: "_blank",
    link: "#!",
    title: "Settings",
    icon: require("../assets/images/setting.svg").default,
    iconb: require("../assets/images/setting.svg").default,
    subMenu: [
      {
        target: "_blank",
        link: "/account",
        title: "Account",
        icon: require("../assets/images/account.svg").default,
        iconb: require("../assets/images/account.svg").default,
      },
      {
        target: "_blank",
        link: "/manage-category",
        title: "Manage Category",
        icon: require("../assets/images/manageCategory.svg").default,
        iconb: require("../assets/images/manageCategory.svg").default,
      },
      {
        target: "_blank",
        link: "/currency",
        title: "Currency",
        icon: require("../assets/images/currency.svg").default,
        iconb: require("../assets/images/currency.svg").default,
      },
      {
        target: "_blank",
        link: "/payment-menthod",
        title: "Payment Method",
        icon: require("../assets/images/payment.svg").default,
        iconb: require("../assets/images/payment.svg").default,
      },
    ],
  },
];

const downloadApp = {
  link: "#",
  title: "Download App",
};

class MainLayout extends React.Component {
  constructor(props) {
    super(props);

    if (!localStorage.getItem(storageKeys.TOKEN)) {
    }

    this.state = {
      activeMenu: "/",
      loading: false,
      minHeight: window.innerHeight - 130,
      lng: "",
      showSidebar: true,
      isShow: false,
      localToken: localStorage.getItem(storageKeys.TOKEN),
      showDrop: false,
    };
  }

  requesGetLoggedInUser() {}

  handleChatboxPreset() {
    this.chatboxRef.showChatbot();
  }

  render() {
    const { children, user } = this.props;
    const {
      activeMenu,
      loading,
      minHeight,
      showSidebar,
    } = this.state;
    const LocationPathname = window.location.pathname;
    var username = Storage.getString(storageKeys.USER);
    return (
      <div onMouseOver={() => {}}>
        <div>
          {user  ? (
            <MainSideBar
              user={user}
              LocationPathname={LocationPathname}
              downloadApp={downloadApp}
              menus={menusidebar}
              activeMenu={activeMenu}
              minHeight={minHeight}
              loading={loading}
              showSidebar={showSidebar}
              onClickSidebar={(m) => {
                if (m.link === "#") {
                  this.qrCodeModalRef.show();
                } else if (m.link === "#referral") {
                  this.referralModalRef.show();
                } else {
                  this.setState({
                    activeMenu: m.link,
                  });
                }
              }}
              handleShowSidebar={() => {
                this.setState({
                  showSidebar: !showSidebar,
                });
              }}
            ></MainSideBar>
          ) : (
            ""
          )}
          <div
            className="content"
            style={{
              marginLeft: `${username? (showSidebar ? "250" : "64") : "0"}px`,
              paddingTop: `${username  ? "0px" : "70px"}`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default MainLayout;
