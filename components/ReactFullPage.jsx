import ReactFullpage from "@fullpage/react-fullpage";

export default function FullPage({ ...props }) {
  return <ReactFullpage {...props} scrollOverflow licenseKey={`5949m7cV-Yeq5s7Sp-pKh9aLSJ-T8pshEbi`} />;
}

FullPage.Wrapper = ReactFullpage.Wrapper;
