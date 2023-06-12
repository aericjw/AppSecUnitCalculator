import React from "react";
import { Link } from "react-router-dom";
import { AppHeader } from "@dynatrace/strato-components-preview";

export const Header = () => {
  return (
    <AppHeader>
      <AppHeader.NavItems>
        <AppHeader.AppNavLink appName="AppSec Unit Calculator" as={Link} to="/" />
        <AppHeader.NavItem as={Link} to="https://www.dynatrace.com/support/help/shortlink/application-security-units">
          Application Security Unit Information
        </AppHeader.NavItem>
      </AppHeader.NavItems>
    </AppHeader>
  );
};
