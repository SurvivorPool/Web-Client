import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import { Icon } from "semantic-ui-react";
import breakpoints from "../../styles/breakpoints";

import logo from "../../public/image/logo.png";

const HeroHeader = styled.header`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 400px;
  background: transparent;
  display: flex;
  justify-content: center;
  border-bottom: ${(props) => props.theme.layout.border};
`;

const HeroContainer = styled.div`
  position: relative;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  vertical-align: middle;

  @media ${(props) => props.theme.breakpoints.mobile} {
    width: 100%;
  }
`;

const HeroImage = styled.img`
  margin: auto;
  height: 325px;
  object-fit: cover;
  animation: ${(props) => props.theme.animations.popIn} 0.8s
    cubic-bezier(0, 0.9, 0.3, 1.4) forwards;

  @media ${(props) => props.theme.breakpoints.mobile} {
    height: 200px;
  }
`;

const StyledIcon = styled(Icon)`
  position: relative;
  bottom: 15vh;
  animation: pulse 2s 3s ease-out infinite;
  &:hover {
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  display: hidden;
`;

function Hero() {
  return (
    <HeroHeader>
      <HeroContainer>
        <HeroImage src={logo} />
        <StyledLink to={"Overview"} smooth={true}>
          <StyledIcon name={"chevron down"} size={"huge"} color={"orange"} />
        </StyledLink>
      </HeroContainer>
    </HeroHeader>
  );
}

export default Hero;
