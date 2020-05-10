import React from "react";
import Helmet from "react-helmet";
import { useSiteMetadata } from "../hooks/useSiteMetadata";

interface Props {
  title?: string;
}

export const SEO = ({ title }: Props) => {
  const metadata = useSiteMetadata();
  const pageTitle = title ? `${title} | ${metadata.title}` : metadata.title;

  return (
    <Helmet
      htmlAttributes={{ lang: "en" }}
      title={pageTitle}
      meta={[
        { name: `description`, content: metadata.description },
        { property: `og:title`, content: pageTitle },
        { property: `og:description`, content: metadata.description },
        { property: `og:type`, content: `website` },
      ]}
    />
  );
};
