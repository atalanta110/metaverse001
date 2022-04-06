import React from "react";
import { Helmet } from "react-helmet";
import { SEO_DATA } from "./data";

export default function WalletSEO() {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{SEO_DATA.wallet.title}</title>
      <link rel="canonical" href={SEO_DATA.wallet.canonical} />
      <meta name="description" content={SEO_DATA.wallet.description} />
    </Helmet>
  );
}
