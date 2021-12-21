import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
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
import { RiArrowRightSFill, RiUserLine } from "react-icons/ri";

import { User } from "types";

export const UserPanel: React.FC = () => {
  const theme = useMantineTheme();
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
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
        onClick={() => signOut()}
      >
        <Group direction="row">
          {session.user?.image ? (
            <Avatar src={session.user.image} />
          ) : (
            <Avatar color="blue" radius="sm">
              <RiUserLine />
            </Avatar>
          )}
          <div style={{ flex: 1 }}>
            <Text
              size={"sm"}
              weight={500}
              sx={(theme) => ({
                color: theme.colors.orange[6],
              })}
            >
              {"Logout"}
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
        onClick={() => signIn()}
        variant="gradient"
        gradient={{ from: "orange", to: "red" }}
        fullWidth
      >
        {"Login"}
      </Button>
    </Center>
  );
};
