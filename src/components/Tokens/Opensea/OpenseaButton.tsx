import BadgeButton, { BadgeButtonProps } from "components/ui/BadgeButton";
import { FullToken } from "hooks/useTokens";
import env from "lib/env";
import { contracts } from "lib/web3/contracts";

import Opensea from "./OpenseaIcon";

interface ButtonProps extends Omit<BadgeButtonProps, "icon"> {
  token: FullToken;
}

const PLAYABLES_ADDRESS = contracts.playables.address || "";

const urlOpenSea = (tokenId: string) => {
  if (env.NETWORK !== 1) {
    return `https://testnets.opensea.io/assets/${PLAYABLES_ADDRESS}/${tokenId}`;
  }
  return `https://opensea.io/assets/${PLAYABLES_ADDRESS}/${tokenId}`;
};

export default function OpenSea({ token, ...props }: ButtonProps) {
  return (
    <BadgeButton
      {...props}
      icon={
        <Opensea
          color={props.inverse ? "white" : "black"}
          style={{ height: "50px", width: "50px", transform: "scale(0.8)" }}
        />
      }
      onClick={() => {
        window.open(urlOpenSea(token.id), "_blank");
      }}
    >
      OpenSea
    </BadgeButton>
  );
}
