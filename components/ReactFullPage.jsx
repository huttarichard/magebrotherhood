import ReactFullpage from "@fullpage/react-fullpage";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export default function FullPage({ ...props }) {
  const isBigScreen = useMediaQuery({ query: "(min-width: 992px)" });

  return (
    <ReactFullpage
      {...props}
      paddingTop={isBigScreen ? "0px" : "80px"}
      scrollOverflow
      licenseKey={`5949m7cV-Yeq5s7Sp-pKh9aLSJ-T8pshEbi`}
    />
  );
}

FullPage.Wrapper = ReactFullpage.Wrapper;
