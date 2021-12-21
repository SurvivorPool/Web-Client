import React from "react";
import { useRouter } from "next/router";
import {
  Avatar,
  Button,
  Center,
  UnstyledButton,
  Group,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { RiArrowRightSFill } from "react-icons/ri";

import { User } from "types";

interface IUserPanel {
  user?: User;
  onClick?: () => void;
}

export const UserPanel: React.FC<IUserPanel> = ({ user = null }) => {
  const theme = useMantineTheme();
  const router = useRouter();

  if (user) {
    return (
      <UnstyledButton
        sx={(theme) => ({
          "&:hover": {
            cursor: "pointer",
            backgroundColor: theme.colors.gray[0],
          },
          padding: "8px 16px",
          borderRadius: theme.radius.md,
        })}
      >
        <Group direction="row">
          <Avatar src={user.photoUrl} />
          <div style={{ flex: 1 }}>
            <Text
              size={"sm"}
              weight={500}
              sx={(theme) => ({
                color: theme.colors.gray[5],
              })}
            >
              {`${user.firstName} ${user.lastName}`}
            </Text>
            <Text
              color={"dimmed"}
              sx={(theme) => ({
                fontSize: "8px",
              })}
            >
              {user.email}
            </Text>
          </div>
          <RiArrowRightSFill height={"16px"} fill={theme.colors.dark[1]} />
        </Group>
      </UnstyledButton>
    );
  }

  return (
    <Center style={{ padding: theme.spacing.xs }}>
      <Button
        onClick={() => router.push("/login")}
        variant="gradient"
        gradient={{ from: "orange", to: "red" }}
        fullWidth
      >
        {"Login"}
      </Button>
    </Center>
  );
};
