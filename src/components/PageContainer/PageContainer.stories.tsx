import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Providers from "../providers";
import PageContainer from "./PageContainer";

export default {
  title: "PageContainer",
  component: PageContainer,
} as ComponentMeta<typeof PageContainer>;

const Template: ComponentStory<typeof PageContainer> = (args) => (
  <Providers>
    <PageContainer />
  </Providers>
);

export const Default = Template.bind({});
