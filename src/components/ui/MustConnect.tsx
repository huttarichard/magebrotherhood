import Alert from "@mui/material/Alert";
import useWeb3 from "hooks/useWeb3";
import { useIntl } from "react-intl";

import Spinner from "./Spinner";

export default function MustConnect({ children }: React.PropsWithChildren<unknown>) {
  const { resolved, error, account } = useWeb3();
  const intl = useIntl();

  if (!resolved) {
    return (
      <>
        <Spinner />
        Loading....
      </>
    );
  }

  if (error) {
    return (
      <Alert variant="filled" severity="error">
        {error.message}
      </Alert>
    );
  }

  if (!account) {
    const connect = intl.formatMessage({
      defaultMessage: "Please connect your wallet.",
      id: "1v/O7j",
    });

    return (
      <Alert variant="filled" severity="warning">
        {connect}
      </Alert>
    );
  }

  return <>{children}</>;
}
