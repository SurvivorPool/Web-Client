import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Center } from "@mantine/core";

import Providers from "../providers";
import PageContainer from "./PageContainer";

export default {
  title: "PageContainer",
  component: PageContainer,
} as ComponentMeta<typeof PageContainer>;

const Template: ComponentStory<typeof PageContainer> = (args) => (
  <Providers>
    <PageContainer>
      <Center
        sx={(theme) => ({
          height: "100vh",
          backgroundColor: theme.colors.dark[1],
        })}
      >
        CONTENT
      </Center>
    </PageContainer>
  </Providers>
);

export const Default = Template.bind({});
