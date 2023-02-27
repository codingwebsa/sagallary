import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="Access-Control-Allow-Origin" content="*" />
      </Head>
      <body className="overflow-x-hidden antialiased text-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
