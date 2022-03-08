import styled from "@emotion/styled";
import Image from "next/image";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  background-color: #eee;
  overflow: hidden;
`;

export default function Polygon() {
  return <Wrapper>{/* <Image src="/images/polygon.png" alt="Polygon" /> */}</Wrapper>;
}
