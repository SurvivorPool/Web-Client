import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 75px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: flex-end;
  z-index: 6;
  position: absolute;
  top: 0px;

  @media ${(props) => props.theme.breakpoints.desktop} {
    position: initial;
    top: 20px;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 15px 40px 0 0;

  @media ${(props) => props.theme.breakpoints.desktop} {
    width: 500px;
    border: 1px solid ${(props) => props.theme.palette.silver};
    border-radius: 6px;
    background-color: ${(props) => (props.isSimple ? "transparent" : "white")};
    padding: 5px;
    box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12),
      0 2px 10px 0 rgba(34, 36, 38, 0.15);
  }

  @media ${(props) => props.theme.breakpoints.mobile} {
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: ${(props) => props.theme.palette.silver};
    border-bottom: 1px solid ${(props) => props.theme.palette.gray};
  }
`;

function Navbar({ children, isVisible }) {
  return isVisible ? (
    <Container>
      <Controls>{children}</Controls>
    </Container>
  ) : null;
}

Navbar.defaultProps = {
  isVisible: true,
  isSimple: false,
};

Navbar.propTypes = {
  isVisible: PropTypes.bool,
  isSimple: PropTypes.bool,
};

export default Navbar;
