import Wallet from "components/Wallet/Wallet";

import { PageLayout } from "../components/Layout/Layout";

export default function WalletPage() {
  return (
    <PageLayout
      title="MageBrotherhood - Wallet"
      description="Transfer assets or send your coins. Connect your wallet and get started."
    >
      <Wallet />
    </PageLayout>
  );
}
