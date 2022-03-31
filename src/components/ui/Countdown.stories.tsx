import { ComponentMeta, ComponentStory } from "@storybook/react";

import CountDown from "./CountDown";

export default {
  title: "components/ui/CountDown",
  component: CountDown,
  argTypes: {},
} as ComponentMeta<typeof CountDown>;

const Template: ComponentStory<typeof CountDown> = (args) => <CountDown {...args} />;

export const Default = Template.bind({});
Default.args = {
  countDownDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
  small: false,
};
