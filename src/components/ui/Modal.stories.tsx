import { ComponentMeta, ComponentStory } from "@storybook/react";

import Modal from "./Modal";

export default {
  title: "components/ui/Modal",
  component: Modal,
  argTypes: {},
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args}>
    <h2>Title</h2>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque beatae temporibus velit non quaerat nihil quasi
      ratione facilis distinctio adipisci.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum, necessitatibus! Nesciunt autem sed sit numquam
      praesentium saepe earum vitae aliquam ipsum perspiciatis a error, modi quod voluptatibus deserunt recusandae
      accusantium eos suscipit eveniet consequatur officiis est magnam rem? Saepe, nesciunt.
    </p>
  </Modal>
);

export const Default = Template.bind({});
Default.args = {
  modalProps: {
    open: true,
    children: <></>,
  },
};
