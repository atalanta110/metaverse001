import React from "react";
import { Helmet } from "react-helmet";
import { SEO_DATA } from "./data";

export default function HomeSEO() {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{SEO_DATA.home.title}</title>
      <link rel="canonical" href={SEO_DATA.home.canonical} />
      <meta name="description" content={SEO_DATA.home.description} />
    </Helmet>
  );
}
