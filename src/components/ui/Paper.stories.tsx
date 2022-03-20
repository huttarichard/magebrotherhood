import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PrimaryCard } from "./Paper";

export default {
  title: "components/ui/Card",
  component: PrimaryCard,
  argTypes: {},
} as ComponentMeta<typeof PrimaryCard>;

const Template: ComponentStory<typeof PrimaryCard> = () => <PrimaryCard>Hello</PrimaryCard>;

export const Default = Template.bind({});
Default.args = {
  children: "Hello",
  padding: "10px",
};
