import styled from "@emotion/styled";
import { NativeSelect, NativeSelectProps } from "@mui/material";

const AmountSelect = styled(NativeSelect)`
  min-width: 100px;
  height: 40px;
  color: white;
  margin-right: 30px;
  font-size: 1.2rem;
  border-radius: 4px;

  select {
    padding: 5px 20px;
  }
`;

export default function AmountSelector({ amount, ...props }: { amount: number } & NativeSelectProps) {
  return (
    <AmountSelect
      defaultValue={0}
      inputProps={{
        name: "age",
        id: "uncontrolled-native",
      }}
      {...props}
    >
      <option key={0}>Select amount</option>
      {[...Array(amount).keys()].map((e) => (
        <option value={e + 1} key={e + 1}>
          {(e + 1).toString()}
        </option>
      ))}
    </AmountSelect>
  );
}
