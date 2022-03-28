import { FormattedMessage } from "react-intl";

import Layout from "../components/Layout/Layout";

export default function Account() {
  return (
    <>
      <Layout>
        <h1>
          <FormattedMessage defaultMessage="Account" id="account_page_title" />
        </h1>
      </Layout>
    </>
  );
}
