import { Children, FC, useState } from "react";
import {
  AppShell,
  Burger,
  Center,
  MediaQuery,
  Navbar,
  Image,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core";
import { useSession, signIn } from "next-auth/react";

import { Menu } from "@/components/Menu";
import { UserPanel } from "@/components/UserPanel";
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle";
import { LogoutDrawer } from "@/components/LogoutDrawer";
import { Header } from "@/components/Header";

export const PageContainer: FC = ({ children }) => {
  const { status } = useSession();
  const theme = useMantineTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutDrawerOpen, setLogoutDrawerOpen] = useState(false);
  const isLoggedIn = status === "authenticated";

  return (
    <AppShell
      padding={"md"}
      fixed
      navbarOffsetBreakpoint="sm"
      style={{ minHeight: "calc(100vh - 70px)" }}
      sx={{ "& > div > main": { minHeight: "calc(100vh - 70px)" } }}
      navbar={
        <Navbar
          width={{
            lg: 300,
            md: 300,
            sm: "100%",
          }}
          padding={"xs"}
          hiddenBreakpoint={"md"}
          hidden={!isMenuOpen}
        >
          <LogoutDrawer
            isOpen={isLogoutDrawerOpen}
            onClose={() => setLogoutDrawerOpen(false)}
          />
          <MediaQuery largerThan={"md"} styles={{ display: "none" }}>
            <Navbar.Section sx={(theme) => ({ padding: theme.spacing.xs })}>
              <Center>
                <Image
                  width={"125px"}
                  height={"auto"}
                  fit={"contain"}
                  src={
                    "https://jimmydotdev.s3.us-east-2.amazonaws.com/SP+Logo.png"
                  }
                  alt={"Survivor Pool Logo"}
                />
              </Center>
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
          <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
            <Navbar.Section
              sx={(theme) => ({
                padding: theme.spacing.xs,
              })}
            >
              <UserPanel onClick={() => setLogoutDrawerOpen(true)} />
            </Navbar.Section>
          </MediaQuery>
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
        <Header
          onClick={
            isLoggedIn ? () => setLogoutDrawerOpen(true) : () => signIn()
          }
        >
          <MediaQuery smallerThan={"lg"} styles={{ display: "none" }}>
            <Burger
              opened={isMenuOpen}
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
              style={{ zIndex: 101 }}
            />
          </MediaQuery>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};
