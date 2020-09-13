import React from "react";
import styled from "styled-components";
import { Image, Card } from "semantic-ui-react";
import { Element } from "react-scroll";

import MobileLandingImage from "../../public/image/mobileLanding.png";

const Section = styled.section`
  width: 100%;
  height: auto;
  padding: 60px 0 0 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-top: ${(props) => props.theme.layout.border};
  border-bottom: ${(props) => props.theme.layout.border};
  background-color: ${(props) => props.theme.palette["light-green"]};
`;

const Title = styled.h2`
  text-align: center;
  margin: 30px;
  color: ${(props) => props.theme.palette.silver};
  font-weight: bold;
  font-size: 72px;
  font-family: Happy-Fox;
  letter-spacing: 8px;
  text-shadow: 3px 3px 0 ${(props) => props.theme.palette["burnt-orange"]},
    -1px -1px 0 ${(props) => props.theme.palette["burnt-orange"]},
    1px -1px 0 ${(props) => props.theme.palette["burnt-orange"]},
    -1px 1px 0 ${(props) => props.theme.palette["burnt-orange"]},
    1px 1px 0 ${(props) => props.theme.palette["burnt-orange"]};
`;

const Content = styled.div`
  padding: 70px 15px 0 15px;
  width: 100%;
  display: flex;
  justify-content: center;

  @media ${(props) => props.theme.breakpoints.mobile} {
    flex-direction: column-reverse;
  }
`;

const StyledCardGroup = styled(Card.Group)`
  margin-bottom: 30px !important;
`;

const StyledCard = styled(Card)`
  margin-right: 30px !important;
  margin-left: 30px !important;
  box-shadow: 2px 6px 25px rgba(0, 0, 0, 0.1) !important;
`;

const StyledCardHeader = styled(Card.Header)`
  font-size: 24px !important;
  text-align: center;
  font-family: Raleway !important;
  font-weight: normal !important;
  padding: 15px 15px !important;
`;

const StyledCardContent = styled(Card.Content)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: Raleway;
`;

function HowToPlay(props) {
  return (
    <Section>
      <Element name={"Overview"} />
      <Title>{"How to Play"}</Title>
      <Content>
        <Image size={"large"} src={MobileLandingImage} />
        <StyledCardGroup centered>
          <StyledCard>
            <Card.Content>
              <StyledCardHeader>{"Pick a Team"}</StyledCardHeader>
            </Card.Content>
            <StyledCardContent>
              <p>
                {
                  "Choose one team as your pick for the week. You can only select a team once.."
                }
              </p>
            </StyledCardContent>
          </StyledCard>
          <StyledCard>
            <Card.Content>
              <StyledCardHeader>{"Battle Other Players"}</StyledCardHeader>
            </Card.Content>
            <StyledCardContent>
              <p>
                {
                  "If your team wins that week, you advance on to the next. Lose and you're sunk."
                }
              </p>
            </StyledCardContent>
          </StyledCard>
          <StyledCard>
            <Card.Content>
              <StyledCardHeader>{"Survive"}</StyledCardHeader>
            </Card.Content>
            <StyledCardContent>
              <p>{"Don't sink and be crowned the season champion."}</p>
            </StyledCardContent>
          </StyledCard>
        </StyledCardGroup>
      </Content>
    </Section>
  );
}

export default HowToPlay;
