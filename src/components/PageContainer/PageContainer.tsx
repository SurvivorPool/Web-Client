import { FC } from "react";
import { AppShell, Navbar, Header, Text } from "@mantine/core";

const PageContainer: FC = ({ children }) => {
  return (
    <AppShell
      padding={"md"}
      navbar={
        <Navbar width={{ base: 300 }} height={500} padding={"xs"}>
          <Text>{"My Picks"}</Text>
          <Text>{"My Teams"}</Text>
          <Text>{"My Leagues"}</Text>
        </Navbar>
      }
      header={
        <Header height={60} padding={"xs"}>
          <Text
            variant={"gradient"}
            gradient={{
              from: "brand",
              to: "brand",
              deg: 135,
            }}
          >
            SurvivorPool
          </Text>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export default PageContainer;
