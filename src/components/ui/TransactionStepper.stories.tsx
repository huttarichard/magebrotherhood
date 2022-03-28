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
  activeStep: 0,
  steps: [
    {
      error: false,
      label: "Initiating",
      labelOptional: "GO!",
      content: (
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis veritatis quia eligendi ipsum ex tempore
          sapiente ea consequatur quisquam fugiat corrupti minima, aut omnis. Reprehenderit non facilis repellendus
          praesentium architecto.
        </p>
      ),
    },
    {
      error: false,
      label: "Waiting for confirmation",
      labelOptional: "Wait for it...",
      content: (
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati autem quisquam similique magni architecto
          voluptatibus qui eius sit iure eveniet libero eum, quia, sapiente minima molestias eaque modi ducimus
          voluptatum?
        </p>
      ),
    },
    {
      error: false,
      label: "Finalizing",
      labelOptional: "Almost there!",
      labelErrorOptional: "Failed!",
      content: (
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, aut officia et possimus ratione, in provident
          magnam minus qui hic odit quis enim praesentium numquam deleniti adipisci aperiam optio quasi? Ipsam inventore
          consequatur accusantium ex? Magni animi, adipisci doloremque temporibus distinctio commodi consequuntur
          tenetur?
        </p>
      ),
    },
  ],
};
