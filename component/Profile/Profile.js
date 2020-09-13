import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Image, Dropdown, Icon, Label } from "semantic-ui-react";
import Link from "next/link";

const paths = {
  dashboard: "/dashboard",
  admin: "/admin",
  league: "/league",
  settings: "/settings",
  messages: "/messages",
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StyledDropdown = styled(Dropdown)`
  font-size: 16px;
  color: ${(props) => props.theme.palette.lavender};
  font-weight: bold;
  position: relative;
`;

function Profile({ currentPage }) {
  const userName = "Jimmy"; // TODO
  const isAdmin = true; // TODO

  const onLogoutClick = () => {
    console.log("TODO");
  };

  const links = useMemo(() => {
    let reducedPaths = [];

    if (![paths.dashboard, paths.league].includes(currentPage)) {
      reducedPaths.push({ name: "Dashboard", href: paths.dashboard });
    }

    if (currentPage !== paths.admin && isAdmin) {
      reducedPaths.push({ name: "Admin Dashboard", href: paths.admin });
    }

    if (currentPage !== paths.settings) {
      reducedPaths.push({ name: "Settings", href: paths.settings });
    }

    if (![paths.messages, paths.dashboard].includes(currentPage)) {
      reducedPaths.push({ name: "Message", href: paths.messages });
    }

    return reducedPaths;
  }, [isAdmin, currentPage]);

  return (
    <Container>
      <StyledDropdown className={"icon"} text={userName} labeled>
        <Dropdown.Menu>
          {links.map((link) => (
            <DropdownLink key={link.href} href={link.href} name={link.name} />
          ))}
          <Dropdown.Item onClick={onLogoutClick}>{"Log Out"}</Dropdown.Item>
        </Dropdown.Menu>
      </StyledDropdown>
    </Container>
  );
}

function DropdownLink({ name, href }) {
  return (
    <Dropdown.Item>
      <Link href={href}>
        {href === paths.messages ? <MessagesCount /> : name}
      </Link>
    </Dropdown.Item>
  );
}

function MessagesCount() {
  // const unreadCount = useSelector() TODO
  const unreadCount = 5;
  return unreadCount > 0 ? (
    <Label color={"orange"} horizontal>
      {"Messages"}
      <Label.Detail>{unreadCount}</Label.Detail>
    </Label>
  ) : (
    "Messages"
  );
}

Profile.propTypes = {
  currentPage: PropTypes.string.isRequired,
};

export default Profile;
