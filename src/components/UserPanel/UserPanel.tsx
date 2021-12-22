import React from "react";
import { useSession, signIn } from "next-auth/react";
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

interface IUserPanel {
  onClick: () => void;
}

export const UserPanel: React.FC<IUserPanel> = ({ onClick }) => {
  const theme = useMantineTheme();
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
          width: "100%",
        })}
        onClick={onClick}
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
