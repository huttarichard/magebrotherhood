import type { fullpageApi, fullpageOptions } from "@fullpage/react-fullpage";
import ReactFullpage from "@fullpage/react-fullpage";
import useMediaQuery from "@mui/material/useMediaQuery";

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
  const isBigScreen = useMediaQuery("(min-width: 992px)");

  return (
    <ReactFullpage
      {...props}
      cards={false}
      cardsOptions={{
        fadeBackground: false,
        fadeContent: false,
        perspective: 0,
      }}
      menu
      scrollOverflow
      licenseKey={`5949m7cV-Yeq5s7Sp-pKh9aLSJ-T8pshEbi`}
    />
  );
  // paddingTop={isBigScreen ? "0px" : "60px"}
}

FullPage.Wrapper = ReactFullpage.Wrapper;
