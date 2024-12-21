// File path: /styles/left-sidebar-menu.scss

"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { Box, Typography } from "@mui/material";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#3a4252" : "#f6f7f9",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    // marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  // borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

interface LeftSidebarProps {
  toggleActive: () => void;
}

const LeftSidebarMenu: React.FC<LeftSidebarProps> = ({ toggleActive }) => {
  const pathname = usePathname();

  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      <div className="leftSidebarDark">
        <div className="left-sidebar-menu">
          <div className="logo">
            <Link href="/dashboard/ecommerce/">
              <Image
                src="/images/logo-icon.svg"
                alt="logo-icon"
                width={26}
                height={26}
              />
              <span>Fidelis</span>
            </Link>
          </div>

          <Box className="burger-menu" onClick={toggleActive}>
            <span className="top-bar"></span>
            <span className="middle-bar"></span>
            <span className="bottom-bar"></span>
          </Box>

          <div className="sidebar-inner">
            <div className="sidebar-menu">
  
              <Typography
                className="sub-title"
                sx={{
                  display: "block",
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                APPS
              </Typography>

              <Link
                href="/apps/calendar/"
                className={`sidebar-menu-link ${
                  pathname === "/apps/calendar/" ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">date_range</i>
                <span className="title">Calendar</span>
              </Link>

              <Link
                href="/apps/contacts/"
                className={`sidebar-menu-link ${
                  pathname === "/apps/contacts/" ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">contact_page</i>
                <span className="title">Contacts</span>
              </Link>

              <Link
                href="/apps/chat/"
                className={`sidebar-menu-link ${
                  pathname === "/apps/chat/" ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">chat</i>
                <span className="title">Chat</span>
              </Link>

              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
                className="mat-accordion"
              >
                <AccordionSummary
                  className="mat-summary"
                  aria-controls="panel3d-content"
                  id="panel3d-header"
                >
                  <i className="material-symbols-outlined">mail</i>
                  <span className="title">Email</span>
                  <span className="trezo-badge style-two">3</span>
                </AccordionSummary>

                <AccordionDetails className="mat-details">
                  <ul className="sidebar-sub-menu">
                    <li className="sidemenu-item">
                      <Link
                        href="/apps/email/"
                        className={`sidemenu-link ${
                          pathname === "/apps/email/" ? "active" : ""
                        }`}
                      >
                        Inbox
                      </Link>
                    </li>

                    <li className="sidemenu-item">
                      <Link
                        href="/apps/email/compose/"
                        className={`sidemenu-link ${
                          pathname === "/apps/email/compose/" ? "active" : ""
                        }`}
                      >
                        Compose
                      </Link>
                    </li>

                    <li className="sidemenu-item">
                      <Link
                        href="/apps/email/read/"
                        className={`sidemenu-link ${
                          pathname === "/apps/email/read/" ? "active" : ""
                        }`}
                      >
                        Read
                      </Link>
                    </li>
                  </ul>
                </AccordionDetails>
              </Accordion>

              <Link
                href="/apps/kanban-board/"
                className={`sidebar-menu-link ${
                  pathname === "/apps/kanban-board/" ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">team_dashboard</i>
                <span className="title">Kanban Board</span>
              </Link>

              <Typography
                className="sub-title"
                sx={{
                  display: "block",
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                OTHERS
              </Typography>

              <Link href="/user" className="sidebar-menu-link">
                <i className="material-symbols-outlined">account_circle</i>
                <span className="title">Users</span>
              </Link>

              <Accordion
                expanded={expanded === "panel23"}
                onChange={handleChange("panel23")}
                className="mat-accordion"
              >
                <AccordionSummary
                  className="mat-summary"
                  aria-controls="panel23d-content"
                  id="panel23d-header"
                >
                  <i className="material-symbols-outlined">settings</i>
                  <span className="title">Settings</span>
                </AccordionSummary>

                <AccordionDetails className="mat-details">
                  <ul className="sidebar-sub-menu">
                    <li className="sidemenu-item">
                      <Link
                        href="/settings/"
                        className={`sidemenu-link ${
                          pathname === "/settings/" ? "active" : ""
                        }`}
                      >
                        Account Settings
                      </Link>
                    </li>

                    <li className="sidemenu-item">
                      <Link
                        href="/settings/change-password/"
                        className={`sidemenu-link ${
                          pathname === "/settings/change-password/"
                            ? "active"
                            : ""
                        }`}
                      >
                        Change Password
                      </Link>
                    </li>

                    <li className="sidemenu-item">
                      <Link
                        href="/settings/connections/"
                        className={`sidemenu-link ${
                          pathname === "/settings/connections/" ? "active" : ""
                        }`}
                      >
                        Connections
                      </Link>
                    </li>

                    <li className="sidemenu-item">
                      <Link
                        href="/settings/privacy-policy/"
                        className={`sidemenu-link ${
                          pathname === "/settings/privacy-policy/"
                            ? "active"
                            : ""
                        }`}
                      >
                        Privacy Policy
                      </Link>
                    </li>

                    <li className="sidemenu-item">
                      <Link
                        href="/settings/terms-conditions/"
                        className={`sidemenu-link ${
                          pathname === "/settings/terms-conditions/"
                            ? "active"
                            : ""
                        }`}
                      >
                        Terms & Conditions
                      </Link>
                    </li>
                  </ul>
                </AccordionDetails>
              </Accordion>

              <Link
                href="/authentication/logout/"
                className="sidebar-menu-link"
              >
                <i className="material-symbols-outlined">logout</i>
                <span className="title">Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSidebarMenu;
