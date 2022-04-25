import styled from "@emotion/styled";
import { faDownload } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@mui/material/Typography";
import Layout from "components/Layout/Layout";
import Head from "next/head";
import Link from "next/link";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 100%;
  padding-top: 30px;
  max-width: 800px;
  margin: 0 auto;

  .head {
    padding: 20px;
  }

  .download {
    font-size: 30px;
    background: #d2d2d2;
    display: inline-flex;
    width: auto;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    color: gray;
    text-decoration: none;
    font-weight: 600;
    padding: 15px 20px;
    font-weight: bold;

    span {
      padding-left: 10px;
      font-size: 22px;
    }
  }

  .body {
    padding: 20px;
  }
`;

export default function FAQ() {
  return (
    <>
      <Head>
        <title>Mage Brotherhood - Lite Paper</title>
      </Head>

      <Layout>
        <Main>
          <div className="head">
            <Typography variant="h3">Lite Paper</Typography>
            <br />
            <Typography variant="body1">
              Here you can find documents briefly describing our ecosystem, more in detail than visualizations on site.
              Please, feel free to visit our <Link href="https://discord.gg/HgPQAHzp3Z">discord</Link> and post
              suggestion, they are more than welcomed.
            </Typography>
          </div>

          <br />

          <div className="body">
            <a className="download" href="/litepaper.pdf" download>
              <FontAwesomeIcon icon={faDownload} />
              <span>PDF LITEPAPER</span>
            </a>
          </div>

          {/* we need to describe the vision of creating standart */}
          {/* we need to explain why metavaerse */}
          {/* we need to explain value of the coin */}
          {/* we need to explain dao */}
          {/* we need to explain no scam */}
        </Main>
      </Layout>
    </>
  );
}
