import React, { useState } from "react";
import styled from "styled-components";
import { Image, Card, Icon } from "semantic-ui-react";
import { Link, Element } from "react-scroll";

const Page = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.palette.silver};
  transition: all 1s ease-in-out;
`;

function LandingPage(props) {
  return <Page></Page>;
}
export default LandingPage;
