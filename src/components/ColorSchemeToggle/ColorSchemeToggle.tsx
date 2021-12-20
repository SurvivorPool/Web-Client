import React from "react";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { RiSunLine, RiMoonClearLine } from "react-icons/ri";

export const ColorSchemeToggle: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ActionIcon
      variant={"outline"}
      color={isDark ? "yellow" : "white"}
      onClick={() => toggleColorScheme()}
      size={"lg"}
      title={`Toggle ${isDark ? "light" : "dark"} color scheme`}
    >
      {isDark ? <RiSunLine /> : <RiMoonClearLine />}
    </ActionIcon>
  );
};
