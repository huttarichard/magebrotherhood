import styled from "@emotion/styled";
import { faHexagonVerticalNft } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BadgeButton, { BadgeButtonProps } from "components/ui/BadgeButton";
import Modal from "components/ui/Modal";
import { FullToken } from "hooks/useTokens";
import { useWeb3TransactionPresenter } from "hooks/useWeb3Transaction";
import { useState } from "react";

// const PriceWrapper = styled.div`
//   background: #e4e4e4;
//   height: 50px;
//   width: 240px;
//   display: flex;
//   justify-content: space-between;
//   border-radius: 4px;
// `;

// const Card = styled.div`
//   background: white;
//   width: 400px;
//   color: black;
//   padding: 5px 20px;
//   padding-bottom: 15px;
//   font-size: 18px;

//   position: absolute;
//   bottom: 1rem;
//   right: 1rem;
//   border-radius: 5px;

//   @media (min-width: 992px) {
//     bottom: 2rem;
//     right: 3rem;
//   }
// `;

interface ButtonProps extends Omit<BadgeButtonProps, "icon"> {
  token: FullToken;
}

const Code = styled.div`
  pre {
    max-width: 600px;
    overflow-y: scroll;
    font-size: 15px;
  }

  h1 {
    margin-top: 10px;
  }
`;

export default function MintButton({ token, ...props }: ButtonProps) {
  const { mint } = useWeb3TransactionPresenter();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <BadgeButton
        {...props}
        icon={
          <FontAwesomeIcon
            style={{ height: "50px", width: "50px", transform: "scale(0.6)" }}
            icon={faHexagonVerticalNft}
          />
        }
        onClick={() => {
          setOpen(true);
        }}
      >
        Mint NFT
      </BadgeButton>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Code>
          <h1>IPFS Data</h1>
          <pre>{JSON.stringify(token, null, 2)}</pre>
        </Code>
      </Modal>
    </>
  );
}
