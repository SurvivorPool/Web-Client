import React from "react";
import {
  Divider,
  Group,
  Text,
  useMantineTheme,
  UnstyledButton,
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
        "&:hover": {
          backgroundColor: theme.colors.gray[0],
        },
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.md,
      })}
    >
      {children}
    </UnstyledButton>
  );
};

export const Menu: React.FC = () => {
  const theme = useMantineTheme();

  return (
    <>
      <Divider label={"Account"} />
      <MenuButton>
        <Group>
          <RiMessage2Line fill={theme.colors.blue[9]} />
          <Text>{"Messages"}</Text>
        </Group>
      </MenuButton>
      <MenuButton>
        <Group>
          <RiCheckboxCircleLine fill={theme.colors.green[9]} />
          <Text>{"Picks"}</Text>
        </Group>
      </MenuButton>
      <MenuButton>
        <Group>
          <RiFlag2Line fill={theme.colors.red[4]} />
          <Text>{"Teams"}</Text>
        </Group>
      </MenuButton>
      <MenuButton>
        <Group>
          <RiGroup2Line fill={theme.colors.orange[9]} />
          <Text>{"Leagues"}</Text>
        </Group>
      </MenuButton>
      <MenuButton>
        <Group>
          <RiSettings3Line fill={theme.colors.indigo[6]} />
          <Text>{"Preferences"}</Text>
        </Group>
      </MenuButton>
      <Divider
        label={"Play"}
        sx={(theme) => ({ marginTop: theme.spacing.lg })}
      />
      <MenuButton>
        <Group>
          <MdOutlineAddTask fill={theme.colors.orange[7]} />
          <Text>{"Make a Pick"}</Text>
        </Group>
      </MenuButton>
      <MenuButton>
        <Group>
          <RiSearchLine fill={theme.colors.gray[9]} />
          <Text>{"Find a League"}</Text>
        </Group>
      </MenuButton>
      <MenuButton>
        <Group>
          <RiPlayListAddFill fill={theme.colors.green[6]} />
          <Text>{"Create a League"}</Text>
        </Group>
      </MenuButton>
      <Divider
        label={"Admin"}
        sx={(theme) => ({ marginTop: theme.spacing.lg })}
      />
      <MenuButton>
        <Group>
          <RiDatabase2Line fill={theme.colors.red[9]} />
          <Text>{"Dashboard"}</Text>
        </Group>
      </MenuButton>
    </>
  );
};
