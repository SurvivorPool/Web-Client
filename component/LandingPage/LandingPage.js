import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";

import Hero from "./Hero";
import Navbar from "../Navbar/Navbar";
import LoginModal from "../LoginModal/LoginModal";
import Profile from "../Profile/Profile";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import HowToPlay from "./HowToPlay";

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.palette.silver};
  transition: all 1s ease-in-out;
`;

const StyledLink = styled(Link)`
  font-size: 16px;
  white-space: nowrap;
  display: block;
  line-height: 1;
  color: ${(props) => props.theme.palette.lavender};
  font-weight: bold;

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.palette["light-lavender"]};
  }
`;

function LandingPage(props) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const isLoggedIn = false; // TODO;
  return (
    <Page>
      <Navbar isSimple={true} isVisible={!isLoggingIn}>
        <StyledLink to={"Overview"} smooth={true}>
          {"How to Play"}
        </StyledLink>
        {isLoggedIn ? (
          <Profile currentPage={"/"} />
        ) : (
          <PrimaryButton onClick={() => setIsLoggingIn(true)}>
            {"Sign In"}
          </PrimaryButton>
        )}
      </Navbar>
      <Hero />
      <LoginModal
        isOpen={isLoggingIn}
        onClose={() => setIsLoggingIn(!isLoggingIn)}
      />
      <HowToPlay />
    </Page>
  );
}
export default LandingPage;
