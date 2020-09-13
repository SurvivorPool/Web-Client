import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Icon, Button, Divider } from "semantic-ui-react";
import ReactModal from "react-modal";

import PrimaryButton from "../PrimaryButton/PrimaryButton";

const noop = () => {};

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LoginSection = styled.div`
  height: 40%;
  padding: 15px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const LoginHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100px;
  color: ${(props) => props.theme.palette["burnt-orange"]};
  align-items: center;
`;

const LoginHeader = styled.h1`
  margin: 0;
`;

const StyledButtonGroup = styled(Button.Group)`
  margin-top: 15px;
  @media ${(props) => props.theme.breakpoints.desktop} {
    width: 60%;
    align-self: center;
  }
`;

const StyledModal = styled(ReactModal)`
  min-height: 300px;
  width: 30%;
  padding: 15px 30px 30px 30px;
  background-color: $silver;
  border-radius: 4px;
  box-shadow: 2px 6px 25px rgba(0, 0, 0, 0.1);

  @media ${(props) => props.theme.breakpoints.mobile} {
    height: 100%;
    width: 100%;
  }

  &:focus {
    outline: none;
  }
`;

function LoginModal(props) {
  const onFacebookClick = useCallback(() => {
    console.log("facebook clicked");
  }, []);
  const onGoogleClick = useCallback(() => {
    console.log("google clicked");
  }, []);

  const onGithubClick = useCallback(() => {
    console.log("github clicked");
  }, []);

  return (
    <StyledModal isOpen={props.isOpen} closeTimeoutMS={150}>
      <Content>
        <Controls>
          <PrimaryButton onClick={props.onClose}>{"Close"}</PrimaryButton>
        </Controls>
        <LoginSection>
          <LoginHeaderContainer>
            <LoginHeader>{"Sign In"}</LoginHeader>
          </LoginHeaderContainer>
          <Divider />
          <StyledButtonGroup vertical>
            <Button color={"facebook"} onClick={onFacebookClick}>
              <Icon name={"facebook"} />
              {"Facebook"}
            </Button>
            <Button color={"google plus"} onClick={onGoogleClick}>
              <Icon name={"google"} />
              {"Google"}
            </Button>
            <Button color={"grey"} onClick={onGithubClick}>
              <Icon name={"github"} />
              {"Github"}
            </Button>
          </StyledButtonGroup>
        </LoginSection>
      </Content>
    </StyledModal>
  );
}

LoginModal.defaultProps = {
  isOpen: false,
  onClose: noop,
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default LoginModal;
