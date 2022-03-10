import type { fullpageApi, fullpageOptions } from "@fullpage/react-fullpage";
import ReactFullpage from "@fullpage/react-fullpage";
import { useMediaQuery } from "react-responsive";

interface FullPageProps extends fullpageOptions {
  licenseKey?: string;
  render: (comp: { state: any; fullpageApi: fullpageApi }) => React.ReactElement | void;
  debug?: boolean;
  pluginWrapper?: () => void;
}

type OmmitedProps = "licenseKey" | "paddingTop" | "scrollOverflow" | "cards" | "cardsOptions";
type Props = Omit<FullPageProps, OmmitedProps>;
export type RenderProps = { state: any; fullpageApi: fullpageApi };

//
export default function FullPage<E extends Props>({ ...props }: E) {
  const isBigScreen = useMediaQuery({ query: "(min-width: 992px)" });

  return (
    <ReactFullpage
      {...props}
      cards={false}
      cardsOptions={{
        fadeBackground: false,
        fadeContent: false,
        perspective: 0,
      }}
      paddingTop={isBigScreen ? "0px" : "80px"}
      scrollOverflow
      licenseKey={`5949m7cV-Yeq5s7Sp-pKh9aLSJ-T8pshEbi`}
    />
  );
}

FullPage.Wrapper = ReactFullpage.Wrapper;
