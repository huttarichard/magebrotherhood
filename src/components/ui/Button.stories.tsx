import { ComponentMeta, ComponentStory } from "@storybook/react";

import Button from "./Button";

export default {
  title: "components/ui/Button",
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Hello",
};
