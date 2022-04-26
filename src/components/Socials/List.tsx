import styled from "@emotion/styled";
import Discord from "components/Socials/Discord";
import Twitter from "components/Socials/Twitter";

const SocialLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;

  li {
    margin-right: 2rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export default function List() {
  return (
    <SocialLinks>
      <li>
        <Twitter />
      </li>
      <li>
        <Discord />
      </li>
    </SocialLinks>
  );
}
