import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export interface HeadProps {
  headline: string;
  description: string;
}

const Wrapper = styled.div`
  border-bottom: 1px solid #303030;
  padding: 15px;
  padding-bottom: 30px;
`;

export function Head({ headline, description }: HeadProps) {
  return (
    <Wrapper>
      <Typography variant="h3">{headline}</Typography>
      <br />
      <Typography variant="body1">{description}</Typography>
    </Wrapper>
  );
}
