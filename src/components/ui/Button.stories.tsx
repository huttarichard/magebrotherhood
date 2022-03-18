import { ComponentMeta, ComponentStory } from "@storybook/react";

import Button from "./Button";

export default {
  title: "components/ui/Button",
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

const defaultText = "Hello";

export const Default = Template.bind({});
Default.args = {
  text: defaultText,
};

export const Distorted = Template.bind({});
Distorted.args = {
  text: defaultText,
  distorted: true,
};

export const WithBorders = Template.bind({});
WithBorders.args = {
  text: defaultText,
  borders: true,
};

export const DistortedWithBorders = Template.bind({});
DistortedWithBorders.args = {
  text: defaultText,
  distorted: true,
  borders: true,
};
