import React from "react";
import { Link } from "react-router-dom";
import { AppHeader, Paragraph } from "@dynatrace/strato-components-preview";
import { ExternalLinkIcon, SecurityIcon } from "@dynatrace/strato-icons"

export const Header = () => {
  return (
    <AppHeader>
      <AppHeader.NavItems>
        <AppHeader.AppNavLink appName="AppSec Unit Calculator" as={Link} to="/" />
      </AppHeader.NavItems>
      <AppHeader.ActionItems>
          <AppHeader.ActionButton
            prefixIcon={<ExternalLinkIcon/>}
          >
            <a href="https://www.dynatrace.com/support/help/shortlink/application-security-units" target="_blank"><Paragraph>Documentation</Paragraph></a>
          </AppHeader.ActionButton>
        </AppHeader.ActionItems>
    </AppHeader>
  );
};
