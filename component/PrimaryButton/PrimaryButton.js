import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";
import styled from "styled-components";

const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.palette.lavender} !important;
  color: ${(props) => props.theme.palette.silver} !important;
  &:hover {
    background-color: ${(props) =>
      props.theme.palette["light-lavender"]} !important;
    color: ${(props) => props.theme.palette.silver} !important;
    transition: all ease-in 0.3s;
  }
`;

function PrimaryButton({ children, onClick, value }) {
  return (
    <StyledButton onClick={onClick} value={value}>
      {children}
    </StyledButton>
  );
}

PrimaryButton.defaultProps = {
  onClick: () => {},
  value: "",
};

PrimaryButton.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
};

export default PrimaryButton;
