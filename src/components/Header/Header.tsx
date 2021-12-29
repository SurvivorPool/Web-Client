import { FC } from "react";
import { signIn, useSession } from "next-auth/react";

import {
  Header as MantineHeader,
  Avatar,
  Button,
  Group,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";

import { useLogin } from "@/utils/useLogin";

interface IHeader {
  onClick: () => void;
}

export const Header: FC<IHeader> = ({ children, onClick }) => {
  const { data: session } = useSession();
  const theme = useMantineTheme();
  const { isLoggedIn, user } = useLogin();
  return (
    <MantineHeader height={70} padding={"md"}>
      <Group
        direction="row"
        position="apart"
        style={{ width: "auto", marginRight: "32px" }}
      >
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {children}
        </div>
        {isLoggedIn && user?.image ? (
          <UnstyledButton onClick={onClick}>
            <Avatar src={user.image} />
          </UnstyledButton>
        ) : (
          <Button
            onClick={() => signIn()}
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
          >
            {"Login"}
          </Button>
        )}
      </Group>
    </MantineHeader>
  );
};
