import React from "react";
import styled from "styled-components";

import logo from "../../assets/image/logo.png";

const HeroHeader = styled.header`
  position:relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
  background: transparent;
  display: flex;
  justify-content: center;
  border-bottom: ${props => props.theme.layout.border};
`;

const HeroContainer = styled.div`
  position: relative;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  vertical-align: middle;

  @media ${props => props.theme.breakpoints.mobile} {
    width: 100%;
  }
`;

const HeroImage = styled.img`
  margin: auto;
  height: 325px;
  object-fit: cover;
  animation: ${props => props.theme.animations.popIn} .8s cubic-bezier(0, 0.9, 0.3, 1.4) forwards;

  @media ${props => props.theme.breakpoints.mobile} {
     height: 200px;
  }
`;

function Hero() {
    return (
        <HeroHeader>
            <HeroContainer>
                <HeroImage src={logo} />
            </HeroContainer>
        </HeroHeader>
    );
}

export default Hero;