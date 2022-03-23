import styled from "@emotion/styled";
import { default as MuiAccordion } from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

interface AccordionItem {
  title: string;
  text: string | JSX.Element;
}

interface AccordionProps {
  items: AccordionItem[];
}

const StyledAccordionSummary = styled(AccordionSummary)`
  font-size: 2rem;

  &.Mui-expanded {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export default function Accordion({ items }: AccordionProps) {
  return (
    <>
      {items.map((item) => (
        <MuiAccordion key={item.title}>
          <StyledAccordionSummary>{item.title}</StyledAccordionSummary>
          <AccordionDetails>{item.text}</AccordionDetails>
        </MuiAccordion>
      ))}
    </>
  );
}
