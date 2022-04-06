import React from "react";
import { Helmet } from "react-helmet";
import { SEO_DATA } from "./data";

export default function RoadMapSEO() {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{SEO_DATA.roadmap.title}</title>
      <link rel="canonical" href={SEO_DATA.roadmap.canonical} />
      <meta name="description" content={SEO_DATA.roadmap.description} />
    </Helmet>
  );
}
