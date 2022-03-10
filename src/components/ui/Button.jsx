import styled from "@emotion/styled";

const StyledButton = styled.button`
  position: relative;
  padding: 0 40px;
  border: 0;
  background: #fff;
  text-transform: uppercase;
  line-height: 50px;
  border-left: solid 7px #00ff29;
  border-right: solid 7px #ec12f9;
  clip-path: polygon(22px 0%, 100% 0, 100% 27px, calc(100% - 23px) 100%, 0 100%, 0 22px);
  font-family: "Bebas Neue", sans-serif;
  font-size: 22px;
  letter-spacing: 0.12em;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 25px 25px 0 0;
    border-color: #00ff29 transparent transparent transparent;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 25px 25px;
    border-color: transparent transparent #ec12f9 transparent;
  }
`;

export default function Button(props) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}
