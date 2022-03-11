import connectors from "./connectors";
import * as injected from "./injected";
import * as providers from "./providers";

export type ConnectorKey = keyof typeof connectors;

export function getConnector(connector: ConnectorKey): any {
  return connectors[connector];
}

export { connectors, injected, providers };
