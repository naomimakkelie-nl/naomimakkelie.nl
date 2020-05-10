import { graphql, useStaticQuery } from "gatsby";

export interface SiteMetadata {
  title: string;
  description: string;
}

export const useSiteMetadata = () => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  return siteMetadata as SiteMetadata;
};
