import { FC, useState } from "react";
import {
  AppShell,
  Burger,
  Container,
  Header,
  MediaQuery,
  Navbar,
  Text,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core";

import { Menu } from "../Menu";
import { UserPanel } from "../UserPanel";
import { ColorSchemeToggle } from "../ColorSchemeToggle";

export const PageContainer: FC = ({ children }) => {
  const theme = useMantineTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppShell
      padding={"md"}
      fixed
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar
          width={{
            lg: 300,
            md: 300,
            sm: "100%",
          }}
          padding={"xs"}
          hiddenBreakpoint={"md"}
          hidden={!isOpen}
        >
          <MediaQuery largerThan={"md"} styles={{ display: "none" }}>
            <Navbar.Section sx={(theme) => ({ padding: theme.spacing.xs })}>
              <Container
                style={{
                  marginBottom: theme.spacing.lg,
                }}
              >
                <Text
                  size={"xl"}
                  variant={"gradient"}
                  gradient={{
                    from: "brand",
                    to: "brand",
                    deg: 135,
                  }}
                >
                  {"SurvivorPool"}
                </Text>
              </Container>
            </Navbar.Section>
          </MediaQuery>
          <Navbar.Section
            grow
            component={ScrollArea}
            mt={"lg"}
            sx={(theme) => ({
              padding: theme.spacing.xs,
            })}
          >
            <Menu />
          </Navbar.Section>
          <Navbar.Section
            sx={(theme) => ({
              padding: theme.spacing.xs,
            })}
          >
            <UserPanel />
          </Navbar.Section>
          <Navbar.Section
            sx={(theme) => ({
              padding: theme.spacing.lg,
              marginTop: theme.spacing.md,
            })}
          >
            <ColorSchemeToggle />
          </Navbar.Section>
        </Navbar>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      header={
        <Header height={70} padding={"md"}>
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
              <Burger
                opened={isOpen}
                onClick={() => setIsOpen((open) => !open)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};
