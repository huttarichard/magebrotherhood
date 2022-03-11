import { ComponentMeta, ComponentStory } from "@storybook/react";

import Modal, { ModalProps } from "./Modal";

export default {
  title: "components/ui/Modal",
  component: Modal,
  argTypes: {},
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (props: ModalProps) => (
  <Modal {...props} isOpen={true}>
    Hello
  </Modal>
);

export const Default = Template.bind({});
Default.args = {
  children: "Hello",
};

export const Mobile = Template.bind({});
Mobile.args = {
  mobile: true,
};
