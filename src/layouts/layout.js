import React, { Fragment } from "react";
import DesktopHeader from "./desktopHeader";
import MobileHeader from "./mobileHeader";
import FooterNavigation from "./footerNavigation";
import MainLayout from "./mainLayout";

const Layout = (props) => {
  const {user} = props;
  return (
    <Fragment>
      <DesktopHeader user={user} />
      <MobileHeader user={user} />
      <MainLayout user={user} children={props.children} />
      <FooterNavigation user={user} />
    </Fragment>
  );
};

export default Layout;
