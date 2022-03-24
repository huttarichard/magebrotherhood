import { ComponentMeta, ComponentStory } from "@storybook/react";

import TransactionStepper from "./TransactionStepper";

export default {
  title: "components/ui/TransactionStepper",
  component: TransactionStepper,
  argTypes: {},
} as ComponentMeta<typeof TransactionStepper>;

const Template: ComponentStory<typeof TransactionStepper> = (args) => <TransactionStepper {...args} />;

export const Default = Template.bind({});
Default.args = {
  activeStep: 1,
};
