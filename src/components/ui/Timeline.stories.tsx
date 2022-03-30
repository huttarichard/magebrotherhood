import { ComponentMeta, ComponentStory } from "@storybook/react";

import Timeline from "./Timeline";

export default {
  title: "components/ui/Timeline",
  component: Timeline,
  argTypes: {},
} as ComponentMeta<typeof Timeline>;

const Template: ComponentStory<typeof Timeline> = (args) => <Timeline {...args} />;

const items = [
  {
    title: "Freelancer",
    period: "2013 - present",
    desc: "My current employment. Way better than the position before!",
  },
  {
    title: "Apple Inc.",
    period: "2011 - 2013",
    desc: "My first employer. All the stuff I&apos;ve learned and projects I&apos;ve been working on.",
  },
  {
    title: "Apple Inc.",
    period: "2011 - 2013",
    desc: "My first employer. All the stuff I&apos;ve learned and projects I&apos;ve been working on.",
  },
  {
    title: "Apple Inc.",
    period: "2011 - 2013",
    desc: "My first employer. All the stuff I&apos;ve learned and projects I&apos;ve been working on.",
  },
  {
    title: "Apple Inc.",
    period: "2011 - 2013",
    desc: "My first employer. All the stuff I&apos;ve learned and projects I&apos;ve been working on.",
  },
];

export const Default = Template.bind({});
Default.args = {
  items,
};
