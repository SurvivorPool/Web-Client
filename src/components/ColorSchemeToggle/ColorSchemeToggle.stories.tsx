import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Box, Text, useMantineColorScheme } from "@mantine/core";

import Providers from "../providers";
import { ColorSchemeToggle } from "./ColorSchemeToggle";

export default {
  title: "ColorSchemeToggle",
  component: ColorSchemeToggle,
} as ComponentMeta<typeof ColorSchemeToggle>;

const Scheme: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  return <Text>{colorScheme}</Text>;
};

const Template: ComponentStory<typeof ColorSchemeToggle> = (args) => {
  return (
    <Providers>
      <Box sx={(theme) => ({ padding: theme.spacing.lg })}>
        <ColorSchemeToggle {...args} />
        <Scheme />
      </Box>
    </Providers>
  );
};
export const Default = Template.bind({});
