import { FC } from "react";
import { signOut } from "next-auth/react";

import {
  Button,
  Center,
  Drawer,
  Group,
  Title,
  useMantineTheme,
} from "@mantine/core";

interface ILogoutDrawer {
  isOpen: boolean;
  onClose: () => void;
}
export const LogoutDrawer: FC<ILogoutDrawer> = ({ isOpen, onClose }) => {
  const theme = useMantineTheme();
  return (
    <Drawer opened={isOpen} onClose={onClose} padding={"xl"} size={"xl"}>
      <Group direction={"column"} style={{ height: "100%" }} spacing={"xl"}>
        <Title
          style={{
            color: theme.colors.orange[5],
            marginBottom: theme.spacing.xl,
            maxWidth: 400,
          }}
        >
          {"Are you sure you want to logout?"}
        </Title>
        <Button
          onClick={() => signOut()}
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          fullWidth
          style={{ height: "60px" }}
        >
          {"Logout"}
        </Button>
      </Group>
    </Drawer>
  );
};
