import React from "react";
import { Helmet } from "react-helmet";
import { SEO_DATA } from "./data";

export default function MarketSEO() {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{SEO_DATA.market.title}</title>
      <link rel="canonical" href={SEO_DATA.market.canonical} />
      <meta name="description" content={SEO_DATA.market.description} />
    </Helmet>
  );
}
