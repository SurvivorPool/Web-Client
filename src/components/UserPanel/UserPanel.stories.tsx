import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Box } from "@mantine/core";

import Providers from "../providers";
import { UserPanel } from "./UserPanel";

export default {
  title: "UserPanel",
  component: UserPanel,
} as ComponentMeta<typeof UserPanel>;

const Template: ComponentStory<typeof UserPanel> = (args) => (
  <Providers>
    <Box sx={(theme) => ({ padding: theme.spacing.xl })}>
      <UserPanel {...args} />
    </Box>
  </Providers>
);

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {
    firstName: "Jimmy",
    lastName: "Timmons",
    email: "timmonsjg@gmail.com",
    photoUrl:
      "https://lh4.googleusercontent.com/-Fpy6YNYE5Yc/AAAAAAAAAAI/AAAAAAAAElU/G7GQ9HiX7yg/photo.jpg",
  },
};
