import type { NextPage } from "next";

import { Center, Container, Text, useMantineTheme } from "@mantine/core";

const Login: NextPage = () => {
  const theme = useMantineTheme();
  return (
    <Container style={{ height: "100vh" }}>
      <Center style={{ height: "100vh" }}>
        <Container
          style={{
            border: `1px solid ${theme.colors.gray[3]}`,
            width: "100%",
            maxHeight: "540px",
          }}
        >
          <Text>{"Login"}</Text>
        </Container>
      </Center>
    </Container>
  );
};
export default Login;
