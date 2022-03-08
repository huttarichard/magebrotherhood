import styled from "@emotion/styled";
import Image from "next/image";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  background-color: #111;
`;

export default function Scheme() {
  return (
    <Wrapper>
      <Image src="/images/scheme.png" layout="fill" objectFit="contain" alt="Scheme" />
    </Wrapper>
  );
}
