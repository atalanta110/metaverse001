import React from "react";
import { Helmet } from "react-helmet";
import { SEO_DATA } from "./data";

export default function MapSEO() {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{SEO_DATA.map.title}</title>
      <link rel="canonical" href={SEO_DATA.map.canonical} />
      <meta name="description" content={SEO_DATA.map.description} />
    </Helmet>
  );
}
