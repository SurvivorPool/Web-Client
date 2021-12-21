import { FC } from "react";
import { AppShell, Container, Navbar, Text, Divider } from "@mantine/core";

import { Menu } from "../Menu";
import { UserPanel } from "../UserPanel";
import { ColorSchemeToggle } from "../ColorSchemeToggle";

export const PageContainer: FC = ({ children }) => {
  return (
    <AppShell
      padding={"md"}
      navbar={
        <Navbar width={{ base: 250 }} padding={"xs"}>
          <Navbar.Section sx={(theme) => ({ padding: theme.spacing.xs })}>
            <Container>
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
          <Navbar.Section
            grow
            mt={"lg"}
            sx={(theme) => ({
              padding: theme.spacing.xs,
              marginTop: theme.spacing.lg,
            })}
          >
            <Menu />
          </Navbar.Section>
          <Navbar.Section
            sx={(theme) => ({
              padding: theme.spacing.xs,
            })}
          >
            <UserPanel
              user={{
                firstName: "Jimmy",
                lastName: "Timmons",
                email: "timmonsjg@gmail.com",
                photoUrl:
                  "https://lh4.googleusercontent.com/-Fpy6YNYE5Yc/AAAAAAAAAAI/AAAAAAAAElU/G7GQ9HiX7yg/photo.jpg",
              }}
            />
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
    >
      {children}
    </AppShell>
  );
};
