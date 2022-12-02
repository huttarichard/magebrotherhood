import { Box } from "@mui/material";
import { PageLayoutWithHead } from "components/Layout/Layout";
import { Card } from "components/Tokens/Card";
import { SpinnerBlock } from "components/ui/Spinner";
import { useTokens } from "hooks/useTokens";

const TITLE = "Tokens";

const DESCRIPTION = `
  Explore collection of MageBrotherhood NFT tokens. Starting with our genesis collection,
  we are introducing Dark Knights. Collection of first well crafted characters from the MargeBrotherhood universe.
`;

export default function TokensIndexPage() {
  const tokens = useTokens({
    metadata: true,
  });
  console.log(tokens);
  if (tokens.error) {
    throw tokens.error;
  }

  if (tokens.loading) {
    return (
      <PageLayoutWithHead layout="FullpageColumn" title={TITLE} description={DESCRIPTION}>
        <Box component="div" padding={4}>
          <SpinnerBlock>Loading Tokens...</SpinnerBlock>
        </Box>
      </PageLayoutWithHead>
    );
  }

  const items = tokens.data.map((item) => (
    <Card key={item.id} token={item} padding={1} ar mint studio description labels />
  ));

  return (
    <PageLayoutWithHead layout="FullpageColumn" title={TITLE} description={DESCRIPTION}>
      <Box padding={2} component="div">
        {items}
      </Box>
      <br />
    </PageLayoutWithHead>
  );
}
