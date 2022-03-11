import styled from "@emotion/styled";
import { Box } from "rebass";

const Card = styled(Box)<{ width?: string; padding?: string; border?: string; $borderRadius?: string }>`
  width: ${({ width }) => width ?? "100%"};
  padding: ${({ padding }) => padding ?? "1rem"};
  border-radius: ${({ $borderRadius, theme }) => $borderRadius ?? theme.borderRadius};
  border: ${({ border }) => border};
`;

export default Card;

export const LightCard = styled(Card)`
  color: ${({ theme }) => theme.text2};
  background-color: ${({ theme }) => theme.bg1};
`;

export const DarkCard = styled(Card)`
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg2};
`;

export const PrimaryCard = styled(Card)`
  color: ${({ theme }) => theme.text1};
  background: linear-gradient(${({ theme }) => theme.primary2}, ${({ theme }) => theme.primary1});
  background: -webkit-linear-gradient(${({ theme }) => theme.primary2}, ${({ theme }) => theme.primary1});
`;

export const BlueCard = styled(Card)`
  background-color: ${({ theme }) => theme.primary1};
  color: ${({ theme }) => theme.blue};
  border-radius: 12px;
`;
