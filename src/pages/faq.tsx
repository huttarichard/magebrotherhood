import styled from "@emotion/styled";
import { default as MuiAccordion } from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { FormattedMessage } from "react-intl";

import Layout from "../components/Layout/Layout";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 100%;
  padding-top: 30px;
  max-width: 800px;
  margin: 0 auto;

  .head {
    padding: 20px;
  }
`;

const Accord = styled(MuiAccordion)`
  background-color: #141414;
`;

const StyledAccordionSummary = styled(AccordionSummary)`
  font-size: 1.2rem;
  padding: 0 20px;
  border-radius: 0;

  ${(props) => props.theme.breakpoints.up("lg")} {
    border-radius: 5px;
  }

  &.Mui-expanded {
    background-color: ${({ theme }) => theme.palette.primary.main};
    font-size: 1.2rem;
  }
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  font-size: 1.2rem;
`;

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

export default function FAQ() {
  return (
    <>
      <NextSeo
        title="MageBrotherhood - FAQ"
        description="FAQ section with most common questions about MageBrotherhood. Join our discord community to get help and to get involved."
      />

      <Layout>
        <Main>
          <div className="head">
            <Typography variant="h3">
              <FormattedMessage defaultMessage="FAQ" id="faq_page_title" />
            </Typography>
            <br />
            <Typography variant="body1">
              <FormattedMessage
                defaultMessage="Some of the most frequented questions asked are answered here. We understand that not every curious mind
              will simply be happy with this list, so for such a beings there is"
                id="faq_page_description"
              />
              &nbsp;
              <Link href="/">
                <a>
                  <FormattedMessage defaultMessage="Discord" id="faq_page_description_link_text" />
                </a>
              </Link>
              .
            </Typography>
          </div>

          <br />

          <div>
            {items.map((item) => (
              <Accord key={item.title}>
                <StyledAccordionSummary>{item.title}</StyledAccordionSummary>
                <StyledAccordionDetails>{item.text}</StyledAccordionDetails>
              </Accord>
            ))}
          </div>
        </Main>
      </Layout>
    </>
  );
}
