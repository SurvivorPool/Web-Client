import { FC } from "react";
import {
  AppShell,
  Avatar,
  Container,
  Group,
  Navbar,
  Text,
  Divider,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import {
  RiMessage2Line,
  RiCheckboxCircleLine,
  RiFlag2Line,
  RiGroup2Line,
  RiSearchLine,
  RiPlayListAddFill,
  RiSettings3Line,
  RiDatabase2Line,
  RiArrowRightSFill,
} from "react-icons/ri";
import { MdOutlineAddTask } from "react-icons/md";

const MenuButton: React.FC<{ onClick?: () => void }> = ({
  onClick = () => {},
  children,
}) => {
  const theme = useMantineTheme();
  return (
    <UnstyledButton
      onClick={onClick}
      sx={(theme) => ({
        "&:hover": { backgroundColor: theme.colors.gray[0] },
        width: "100%",
        padding: theme.spacing.xs,
      })}
    >
      {children}
    </UnstyledButton>
  );
};

const PageContainer: FC = ({ children }) => {
  const theme = useMantineTheme();

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
            <Divider label={"Account"} />
            <MenuButton>
              <Group>
                <RiMessage2Line fill={theme.colors.blue[9]} />
                <Text sx={(theme) => ({ color: theme.colors.dark[3] })}>
                  {"Messages"}
                </Text>
              </Group>
            </MenuButton>
            <MenuButton>
              <Group>
                <RiCheckboxCircleLine fill={theme.colors.green[9]} />
                <Text sx={(theme) => ({ color: theme.colors.dark[3] })}>
                  {"Picks"}
                </Text>
              </Group>
            </MenuButton>
            <MenuButton>
              <Group>
                <RiFlag2Line fill={theme.colors.red[4]} />
                <Text sx={(theme) => ({ color: theme.colors.dark[3] })}>
                  {"Teams"}
                </Text>
              </Group>
            </MenuButton>
            <MenuButton>
              <Group>
                <RiGroup2Line fill={theme.colors.orange[9]} />
                <Text sx={(theme) => ({ color: theme.colors.dark[3] })}>
                  {"Leagues"}
                </Text>
              </Group>
            </MenuButton>
            <MenuButton>
              <Group>
                <RiSettings3Line fill={theme.colors.indigo[6]} />
                <Text sx={(theme) => ({ color: theme.colors.dark[3] })}>
                  {"Preferences"}
                </Text>
              </Group>
            </MenuButton>

            <Divider
              label={"Play"}
              sx={(theme) => ({ marginTop: theme.spacing.lg })}
            />
            <MenuButton>
              <Group>
                <MdOutlineAddTask fill={theme.colors.orange[7]} />
                <Text sx={(theme) => ({ color: theme.colors.dark[3] })}>
                  {"Make a Pick"}
                </Text>
              </Group>
            </MenuButton>
            <MenuButton>
              <Group>
                <RiSearchLine fill={theme.colors.gray[9]} />
                <Text sx={(theme) => ({ color: theme.colors.dark[3] })}>
                  {"Find a League"}
                </Text>
              </Group>
            </MenuButton>
            <MenuButton>
              <Group>
                <RiPlayListAddFill fill={theme.colors.green[6]} />
                <Text sx={(theme) => ({ color: theme.colors.dark[3] })}>
                  {"Create a League"}
                </Text>
              </Group>
            </MenuButton>
            <Divider
              label={"Admin"}
              sx={(theme) => ({ marginTop: theme.spacing.lg })}
            />
            <MenuButton>
              <Group>
                <RiDatabase2Line fill={theme.colors.red[9]} />
                <Text sx={(theme) => ({ color: theme.colors.dark[3] })}>
                  {"Dashboard"}
                </Text>
              </Group>
            </MenuButton>
          </Navbar.Section>
          <Divider />
          <Navbar.Section
            sx={(theme) => ({
              marginBottom: theme.spacing.lg,
              padding: theme.spacing.xs,
            })}
          >
            <UnstyledButton
              sx={(theme) => ({
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: theme.colors.gray[0],
                },
                padding: "8px 16px",
              })}
            >
              <Group direction="row">
                <Avatar
                  src={
                    "https://lh4.googleusercontent.com/-Fpy6YNYE5Yc/AAAAAAAAAAI/AAAAAAAAElU/G7GQ9HiX7yg/photo.jpg"
                  }
                />
                <div style={{ flex: 1 }}>
                  <Text
                    size={"sm"}
                    weight={500}
                    sx={(theme) => ({
                      color: theme.colors.gray[5],
                    })}
                  >
                    {"Jimmy Timmons"}
                  </Text>
                  <Text
                    color={"dimmed"}
                    sx={(theme) => ({
                      fontSize: "8px",
                    })}
                  >
                    {"timmonsjg@gmail.com"}
                  </Text>
                </div>
                <RiArrowRightSFill
                  height={"16px"}
                  fill={theme.colors.dark[1]}
                />
              </Group>
            </UnstyledButton>
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

export default PageContainer;
