import styled from "@emotion/styled";
import ModelViewerDynamic from "components/ui/ModelViewerDynamic";
import { FullToken } from "hooks/useTokens";

import { ARButton, MetadataButton, MintButton, OpenseaButton } from "./Buttons";

export interface ItemProps {
  token: FullToken;
  studio?: boolean;
}

const Wrapper = styled.div`
  position: relative;
  height: 100%;

  .Hotspot {
  }

  .Hotspot:not([data-visible]) {
    background: transparent;
    border: 4px solid #fff;
    box-shadow: none;
    height: 32px;
    pointer-events: none;
    width: 32px;
  }

  .Hotspot > * {
    opacity: 1;
    transform: translateY(-50%);
  }

  .HotspotAnnotation {
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    color: rgba(0, 0, 0, 0.8);
    display: block;
    font-family: Futura, Helvetica Neue, sans-serif;
    font-size: 18px;
    font-weight: 700;
    left: calc(100% + 1em);
    max-width: 128px;
    overflow-wrap: break-word;
    padding: 0.5em 1em;
    position: absolute;
    top: 50%;
    width: max-content;
  }

  .Hotspot:not([data-visible]) > * {
    opacity: 0;
    pointer-events: none;
    transform: translateY(calc(-50% + 4px));
    transition: transform 0.3s, opacity 0.3s;
  }
`;

// const Actions = styled.div`
//   position: absolute;
//   top: 1rem;
//   right: 1rem;

//   @media (min-width: 992px) {
//     top: 2rem;
//     right: 3rem;
//   }
// `;

/* <Card>
        <b>{item.name}</b>
        <p>{item.description}</p>
        <div>
          <PriceWrapper>
            <span
              style={{
                fontSize: "1.2rem",
                padding: "0 12px",
                height: "49px",
                lineHeight: "45px",
                fontFamily: "monospace",
              }}
            >
              {item.priceETH} ETH
            </span>
            <Button
              small
              style={{ height: "50px", width: "115px", borderRadius: "4px" }}
              text="Mint"
              onClick={() => {
                mint(item.id, 1);
              }}
            />
          </PriceWrapper>
        </div>
      </Card> */

const ActionArea = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px;

  .button {
    margin-bottom: 10px;
  }
`;

export default function Studio({ token, children }: React.PropsWithChildren<ItemProps>) {
  return (
    <Wrapper>
      <ModelViewerDynamic
        style={{ width: "100%", height: "100%" }}
        src={token.models.glb}
        environment-image="neutral"
        skybox-image="/assets/studio.hdr"
        max-camera-orbit="Infinity 90deg 5m"
        camera-orbit="0deg 75deg 4m"
        min-field-of-view="0deg"
        camera-controls
        autoplay
        bounds="tight"
        minimum-render-scale="1"
        // enable-pan
      >
        {children}
      </ModelViewerDynamic>

      <ActionArea>
        <ARButton className="button" folded inverse token={token} />
        <MetadataButton className="button" folded inverse token={token} />
        <MintButton className="button" folded inverse token={token} />
        <OpenseaButton className="button" folded inverse token={token} />
      </ActionArea>
    </Wrapper>
  );
}
