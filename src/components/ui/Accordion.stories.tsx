import { ComponentMeta, ComponentStory } from "@storybook/react";

import Accordion from "./Accordion";

export default {
  title: "components/ui/Accordion",
  component: Accordion,
  argTypes: {},
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => <Accordion {...args} />;

const items = [
  {
    title: "Hello",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur odit debitis fugiat, aperiam quidem voluptatem vel quam repellat sint dicta?",
  },
  {
    title: "Hello",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur odit debitis fugiat, aperiam quidem voluptatem vel quam repellat sint dicta?",
  },
  {
    title: "Hello",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur odit debitis fugiat, aperiam quidem voluptatem vel quam repellat sint dicta?",
  },
];

export const Default = Template.bind({});
Default.args = {
  items,
};
