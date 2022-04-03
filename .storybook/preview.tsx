import * as NextImage from "next/image";
import { addDecorator } from "@storybook/react";
import ThemeProvider from '../src/components/ui/ThemeProvider'
import { css, Global } from "@emotion/react";
import { IntlProvider } from "react-intl";
import messages from "../src/translations/en.json"

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "mage",
    values: [
      {
        name: "mage",
        value: "#111111",
      },
    ],
  },
};

addDecorator((story) => (
  <>
    <Global
      styles={css`
        body {
          font-family: "Barlow Condensed", sans-serif;
        }
        
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: "Barlow Condensed", sans-serif;
          font-weight: 700;
        }
      `}
    />

    <div className="wrapper">{story()}</div>
  </>
));

addDecorator((storyFn) => <ThemeProvider>{storyFn()}</ThemeProvider>);

addDecorator((storyFn) => {
  return (<IntlProvider messages={messages} locale="en" defaultLocale="en">{storyFn()}</IntlProvider>)
});
