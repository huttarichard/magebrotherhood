import Document, { Head, Html, Main, NextScript } from "next/document";

class MagebrotherHoodDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="Mage RPG Battle Royale NFT Game" />
          <link rel="icon" href="/favicon.ico" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@200;400;700&family=Bebas+Neue&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MagebrotherHoodDocument;
