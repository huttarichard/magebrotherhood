import { Provider } from "@ethersproject/providers";
import Alert from "@mui/material/Alert";
import useWeb3, { Web3 } from "hooks/useWeb3";
import { Contract, getContract, ICoin, IContract, IStaking } from "lib/web3/contracts";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";

import Spinner from "./Spinner";

export type { ICoin, IStaking };

interface Options {
  displayName?: string;
  readOnly?: boolean;
  contracts?: Contract[];
  wallet?: boolean;
}

type Contracts = {
  [key in Contract]: IContract | null;
};

interface Ctx {
  web3: Web3 | null;
  contracts: Contracts;
}

const Context = createContext<Ctx>({
  web3: null,
  contracts: {
    [Contract.Coin]: null,
    [Contract.Staking]: null,
  },
});

export function useMustWeb3() {
  const { web3 } = useContext(Context);
  return web3;
}

export function useMustContract<T extends IContract>(name: Contract): T {
  const { contracts } = useContext(Context);
  const contract = contracts[name];
  if (!contract) throw new Error("could not resolve contract " + name);
  return contracts[name] as T;
}

export default function mustConnect<P>(Component: FC<P>, opts: Options) {
  const Wrapper: FC<P> = (props: P) => {
    const web3 = useWeb3();
    const intl = useIntl();
    const [resolved, setResolved] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const [contracts, setContracts] = useState<Contracts>({
      [Contract.Coin]: null,
      [Contract.Staking]: null,
    });

    const names = opts.contracts ?? [];

    useEffect(() => {
      if (!web3.resolved) {
        setResolved(false);
        return;
      }

      setResolved(true);

      if (web3.error) {
        setError(web3.error);
        return;
      }

      setError(null);

      contractsResolver(web3, names, contracts)
        .then((contracts) => {
          setContracts(contracts);
        })
        .catch((e) => {
          setError(e);
        })
        .finally(() => {
          setResolved(true);
        });
    }, [web3]);

    if (!resolved) {
      const loading = intl.formatMessage({
        defaultMessage: "Loading...",
        id: "gjBiyj",
      });

      return (
        <>
          <Spinner />
          {loading}
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

    if (opts.wallet && !web3.account) {
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

    return (
      <Context.Provider value={{ contracts, web3 }}>
        <Component {...props} />
      </Context.Provider>
    );
  };

  Wrapper.displayName = Component.displayName ?? opts.displayName;
  return Wrapper;
}

async function contractsResolver(eths: Web3, names: Contract[], contracts: Contracts): Promise<Contracts> {
  const library = eths.library as Provider;

  const promises = Promise.all(names.map((name) => getContract(name, library)));
  const resolved = await promises;

  const objects = names.reduce((acc, name, i) => {
    acc[name] = resolved[i];
    return acc;
  }, contracts);

  const cc = { ...contracts, ...objects };

  names.forEach((e) => {
    if (!cc[e]) throw new Error("could not resolve contract " + e);
  });

  return cc;
}
