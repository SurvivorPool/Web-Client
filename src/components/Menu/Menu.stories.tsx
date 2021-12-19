import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Group } from "@mantine/core";

import Providers from "../providers";
import { Menu } from "./Menu";

export default {
  title: "Menu",
  component: Menu,
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => (
  <Providers>
    <Group
      direction="column"
      sx={{ width: "350px", border: "1px dashed gray", padding: "8px" }}
    >
      <Menu />
    </Group>
  </Providers>
);

export const Default = Template.bind({});
