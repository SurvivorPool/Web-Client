import React from "react";
import { signIn } from "next-auth/react";
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

import { useLogin } from "@/utils/useLogin";

interface IUserPanel {
  onClick: () => void;
}

export const UserPanel: React.FC<IUserPanel> = ({ onClick }) => {
  const theme = useMantineTheme();
  const { isLoggedIn, user } = useLogin();

  if (isLoggedIn) {
    return (
      <UnstyledButton
        sx={(theme) => ({
          "&:hover": {
            cursor: "pointer",
            backgroundColor: theme.colors.gray[0],
          },
          padding: "8px 16px",
          borderRadius: theme.radius.md,
          width: "100%",
        })}
        onClick={onClick}
      >
        <Group direction="row">
          {user?.image ? (
            <Avatar src={user.image} />
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
          <RiArrowRightSFill fontSize={28} fill={theme.colors.orange[6]} />
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
